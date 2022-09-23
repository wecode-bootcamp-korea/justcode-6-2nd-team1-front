import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStore from '../../../context/store';
import { OrderRes } from '../../../interface';
import theme from '../../../theme';
import { toppingFromId } from '../../../utils/toppingFromId';

const Line = styled.div`
  height: 2px;
  background-color: #aaaaaa;
  margin: 20px 0;
`;

const StyledPay = styled.div<{ detail: boolean }>`
  padding-bottom: calc(40px + 6vw);

  h4 {
    margin-top: 40px;

    &:first-of-type {
      margin-top: 20px;
    }
  }

  p {
    margin-top: 10px;
  }

  div.upSide {
    padding: 10px;
  }

  div.caution {
    margin-top: 20px;
    p {
      font-size: 4vw;
    }
  }

  div.product {
    display: flex;
    align-items: center;

    div.imgContainer {
      img {
        height: 100px;
      }
    }

    div.text {
      h4 {
        margin: 0;
      }

      p {
        margin: 0;
        margin-top: 20px;
      }
    }
  }

  div.detail {
    background-color: #dddddd;
    height: ${({ detail }) => (detail ? 'calc(10vw + 60px)' : '0')};
    overflow: hidden;
    transition: 0.3s;

    div.container {
      padding: 20px;
    }

    p {
      display: flex;
      justify-content: space-between;
      font-size: 5vw;

      &:first-of-type {
        margin-top: 0;
        margin-bottom: 20px;
      }
    }
  }

  div.receipt {
    margin-top: 30px;
    background-color: #dddddd;
    padding: 10px;

    p {
      display: flex;
      justify-content: space-between;

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
`;

const FixedBtn = styled.button`
  font-size: 6vw;
  padding: 20px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  border: none;
  background-color: ${theme.red};
  color: white;

  &:disabled {
    background-color: #aaaaaa;
  }
`;

const StyledBtn = styled.button<{ detail: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  font-size: 5vw;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #aaaaaa;
  border-radius: 0;
  background-color: white;

  svg {
    rotate: ${({ detail }) => (detail ? '180deg' : '0deg')};
  }
`;

interface PayProps {
  orderRes: OrderRes | undefined;
}

const Pay = ({ orderRes }: PayProps) => {
  const navigate = useNavigate();
  const { isLogin } = useStore();
  const [detail, setDetail] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { token } = useStore();

  useEffect(() => {
    if (!isLogin || !orderRes) {
      navigate('/product');
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const payHandler = async () => {
    if (orderRes) {
      setDisabled(true);
      try {
        // http://localhost:8000/beverages/order/${orderRes.orderData.orderId}
        await axios.patch(`http://localhost:8000/beverages/order/${orderRes.orderData.orderId}`, '', {
          headers: {
            Authorization: token,
          },
        });
        setDisabled(false);
      } catch (error) {
        console.log(error);
        setDisabled(false);
      }
    }
  };

  if (!orderRes) {
    return <></>;
  }
  return (
    <StyledPay detail={detail}>
      <div className='upSide'>
        <h4>주문 정보</h4>
        <Line />
        <p>{orderRes.orderData.userName}님</p>
        <p>{orderRes.orderData.phone_number}</p>
        <h4>주문 매장</h4>
        <Line />
        <p>{orderRes.orderData.shopName}</p>
        <p>{orderRes.orderData.address}</p>
        <h4>주문옵션</h4>
        <Line />
        <p>{orderRes.orderData.take_out ? '테이크 아웃' : '매장'}</p>
        <h4>가격</h4>
        <Line />
        <p>{orderRes.orderData.total_price}</p>

        <div className='caution'>
          <p>제휴사 혜택은 없습니다.</p>
        </div>
        <h4>최종 주문메뉴</h4>
        <Line />
        <div className='product'>
          <div className='imgContainer'>
            <img src={orderRes.orderData.beverage_image} alt={orderRes.orderData.beverage_name} />
          </div>
          <div className='text'>
            <h4>{orderRes.orderData.beverage_name}</h4>
            <p>{orderRes.orderData.total_price}</p>
          </div>
        </div>
        <StyledBtn detail={detail} onClick={() => setDetail(!detail)}>
          옵션 상세 <AiFillCaretDown />
        </StyledBtn>
        <div className='detail'>
          <div className='container'>
            <p>
              <span>
                {orderRes.orderData.cold ? 'ICED' : 'HOT'}/{orderRes.orderData.sugar}% /
                {orderRes.orderData.ice
                  .split('')
                  .map((a, i) => (i === 0 ? a.toLocaleUpperCase() : a))
                  .join('') + ' Ice'}
              </span>
              {orderRes.orderData.price}원
            </p>
            <p>
              <span>
                {orderRes.orderData.toppingData
                  .map(top => top.topping_id)
                  .map(id => toppingFromId(id))
                  .join('/')}
              </span>
              {orderRes.orderData.toppingData.map(top => top.amount).reduce((prev, cur) => prev + cur * 500, 0)}원
            </p>
          </div>
        </div>
      </div>
      <div className='receipt'>
        <p>
          총 주문 금액 <span>{Number(orderRes.orderData.total_price).toLocaleString()} 원</span>
        </p>
        <p>
          총 할인 금액 <span>0 원</span>
        </p>
        <Line />
        <p>
          총 결제 금액<span>{Number(orderRes.orderData.total_price).toLocaleString()} 원</span>
        </p>
      </div>
      <FixedBtn onClick={payHandler} disabled={disabled}>
        결제 및 주문
      </FixedBtn>
    </StyledPay>
  );
};

export default Pay;
