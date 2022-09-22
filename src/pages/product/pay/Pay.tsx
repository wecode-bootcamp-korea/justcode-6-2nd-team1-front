import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStore from '../../../context/store';
import { OrderRes } from '../../../interface';

const Line = styled.div`
  height: 2px;
  background-color: #aaaaaa;
  margin: 20px 0;
`;

const StyledPay = styled.div`
  padding: 10px 10px;

  h4 {
    margin-top: 40px;
  }

  p {
    margin-top: 10px;
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
`;

interface PayProps {
  orderRes: OrderRes | undefined;
}

const Pay = ({ orderRes }: PayProps) => {
  const navigate = useNavigate();
  const { isLogin } = useStore();

  useEffect(() => {
    if (!isLogin || !orderRes) {
      navigate('/login');
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  if (!orderRes) {
    return <></>;
  }

  return (
    <StyledPay>
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
    </StyledPay>
  );
};

export default Pay;
