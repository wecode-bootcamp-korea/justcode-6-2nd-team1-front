import { useState } from 'react';
import styled from 'styled-components';
import { CartItem, GetCartRes } from '../../interface';
import theme from '../../theme';
import { toppingFromId } from '../../utils/toppingFromId';
import Amount from '../../components/Amount';
import axios from 'axios';
import ErrorModal from '../../components/ErrorModal';
import { AiOutlineCheck } from 'react-icons/ai';

const StyledList = styled.li<{ checked: boolean }>`
  margin-bottom: 20px;

  div.upSide {
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    div.imgContainer {
      display: flex;
      justify-content: center;
      padding: 10px;
      position: relative;

      img {
        height: 30vw;
      }

      svg {
        position: absolute;
        left: 4vw;
        bottom: 3vw;
        padding: 1vw;
        border: 1px solid gray;
        border-radius: 50%;
        background-color: ${({ checked }) => (checked ? 'gray' : 'white')};
        color: white;
      }
    }

    div.textContainer {
      h4 {
        margin-bottom: 20px;
        font-size: 5vw;
      }

      p {
        font-size: 5vw;
        color: ${theme.red};
      }
    }
  }

  div.downSide {
    background-color: ${theme.grey};
    padding: 20px;
    border-bottom: 1px solid gray;
    margin-bottom: 20px;

    div.option {
      display: flex;
      justify-content: space-between;
      font-size: 4vw;
    }

    div.topping {
      margin-top: 20px;
    }
  }
`;

interface CartItemProps {
  cartItem: CartItem;
  setSelectList: React.Dispatch<React.SetStateAction<number[]>>;
  selectList: number[];
  token: string;
  setCartList: React.Dispatch<React.SetStateAction<CartItem[] | undefined>>;
}

const CartList = ({ cartItem, setSelectList, selectList, token, setCartList }: CartItemProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const minusHandler = async () => {
    if (!loading && cartItem.orderAmount > 1) {
      setLoading(true);
      try {
        await axios.patch(`http://localhost:8000/beverages/cart/${cartItem.orderId}/${cartItem.orderAmount - 1}/${(Number(cartItem.price) + 500 * cartItem.toppingData.reduce((prev, cur) => prev + cur.amount, 0)) * (cartItem.orderAmount - 1)}`, '', {
          headers: {
            Authorization: token,
          },
        });

        const {
          data: { cartData },
        } = await axios.get<GetCartRes>(`http://localhost:8000/beverages/cart`, {
          headers: {
            Authorization: token,
          },
        });

        setCartList(cartData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  const plusHandler = async () => {
    if (!loading) {
      setLoading(true);
      try {
        await axios.patch(`http://localhost:8000/beverages/cart/${cartItem.orderId}/${cartItem.orderAmount + 1}/${(Number(cartItem.price) + 500 * cartItem.toppingData.reduce((prev, cur) => prev + cur.amount, 0)) * (cartItem.orderAmount + 1)}`, '', {
          headers: {
            Authorization: token,
          },
        });

        const {
          data: { cartData },
        } = await axios.get<GetCartRes>(`http://localhost:8000/beverages/cart`, {
          headers: {
            Authorization: token,
          },
        });

        setCartList(cartData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  const selectHandler = () => {
    setSelectList(prev => {
      if (prev.includes(cartItem.orderId)) {
        return prev.filter(e => e !== cartItem.orderId);
      } else {
        return [...prev, cartItem.orderId];
      }
    });
  };

  return (
    <>
      {error && <ErrorModal errorMessage='통신에 실패하였습니다.' errorModal={error} setErrorModal={setError} />}
      <StyledList checked={selectList.includes(cartItem.orderId)}>
        <div className='upSide'>
          <div className='imgContainer' onClick={selectHandler}>
            <img src={cartItem.beverage_image} alt='' />
            <AiOutlineCheck size='6vw' />
          </div>
          <div className='textContainer'>
            <h4>{cartItem.beverage_name}</h4>
            <p>{((Number(cartItem.price) + 500 * cartItem.toppingData.reduce((prev, cur) => prev + cur.amount, 0)) * cartItem.orderAmount).toLocaleString()}원</p>
          </div>
        </div>
        <div className='downSide'>
          <div className='option'>
            <p>
              {cartItem.cold ? 'ICE' : 'HOT'}/{cartItem.sugar}%/
              {cartItem.ice
                .split('')
                .map((a, i) => (i === 0 ? a.toLocaleUpperCase() : a))
                .join('') + ' Ice'}
            </p>
            <p>{Number(cartItem.price).toLocaleString()}원</p>
          </div>
          {!!cartItem.toppingData.filter(e => e.amount).length && (
            <div className='option topping'>
              <p>
                {cartItem.toppingData
                  .filter(data => data.amount)
                  .map(topping => {
                    if (topping.amount > 1) {
                      return `${toppingFromId(topping.topping_id)} ${topping.amount}개`;
                    } else {
                      return toppingFromId(topping.topping_id);
                    }
                  })
                  .join('/')}
              </p>
              <p>{(cartItem.toppingData.reduce((prev, cur) => prev + cur.amount, 0) * 500).toLocaleString()}원</p>
            </div>
          )}
        </div>
        <Amount //
          amount={cartItem.orderAmount}
          name='수량'
          minusHandler={minusHandler}
          plusHandler={plusHandler}
          color={loading ? '#aaaaaa' : theme.red}
        />
      </StyledList>
    </>
  );
};

export default CartList;
