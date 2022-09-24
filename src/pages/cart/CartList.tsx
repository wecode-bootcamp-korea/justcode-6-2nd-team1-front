import { useState } from 'react';
import styled from 'styled-components';
import { CartItem } from '../../interface';
import theme from '../../theme';
import { toppingFromId } from '../../utils/toppingFromId';
import Amount from '../../components/Amount';
import axios from 'axios';
import ErrorModal from '../../components/ErrorModal';

const StyledList = styled.li`
  margin-bottom: 20px;

  div.upSide {
    display: flex;
    align-items: center;

    div.imgContainer {
      display: flex;
      justify-content: center;
      padding: 10px;
      aspect-ratio: 1 / 1;
      height: 100px;

      img {
        height: 80px;
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
}

const CartList = ({ cartItem }: CartItemProps) => {
  const [amount, setAmount] = useState(cartItem.orderAmount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const minusHandler = async () => {
    if (!loading && amount > 1) {
      setLoading(true);
      try {
        await axios.patch(`http://localhost:8000/beverages/cart/${cartItem.orderId}/${cartItem.orderAmount - 1}`);
        setAmount(cartItem.orderAmount - 1);
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
        await axios.patch(`http://localhost:8000/beverages/cart/${cartItem.orderId}/${cartItem.orderAmount + 1}`);
        setAmount(cartItem.orderAmount + 1);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <>
      {error && <ErrorModal errorMessage='통신에 실패하였습니다.' errorModal={error} setErrorModal={setError} />}
      <StyledList>
        <div className='upSide'>
          <div className='imgContainer'>
            <img src={cartItem.beverage_image} alt='' />
          </div>
          <div className='textContainer'>
            <h4>{cartItem.beverage_name}</h4>
            <p>{((Number(cartItem.price) + 500 * cartItem.toppingData.length) * cartItem.orderAmount).toLocaleString()}원</p>
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
          {!!cartItem.toppingData.length && (
            <div className='option topping'>
              <p>{cartItem.toppingData.map(topping => toppingFromId(topping.topping_id)).join('/')}</p>
              <p>{(cartItem.toppingData.length * 500).toLocaleString()}원</p>
            </div>
          )}
        </div>
        <Amount //
          amount={amount}
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
