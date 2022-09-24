import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';
import ErrorModal from '../../components/ErrorModal';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { CartItem, GetCartRes } from '../../interface';
import CartList from './CartList';

const StyledCart = styled.div`
  padding: 10px;

  h4 {
    font-size: 6vw;
  }

  div.select {
    display: flex;
    justify-content: space-between;

    div.btnContainer {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        border: 1px solid gray;
        border-radius: 4px;
        background: white;
        padding: 2px 8px;
        font-size: 4vw;
      }
    }
  }

  ul {
    border-top: 1px solid gray;
    margin-top: 20px;
  }
`;

const Cart = () => {
  const { token } = useStore();
  const [cartList, setCartList] = useState<CartItem[]>();
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);

  // errorModal을 전역으로 관리하면 더 좋을듯

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // http://localhost:8000/beverages/cart
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
        setErrorModal(true);
      }
    })();
  }, []);

  return (
    <>
      {errorModal && <ErrorModal errorMessage='로그인을 먼저 해주세요.' errorModal={errorModal} setErrorModal={setErrorModal} />}
      {loading && <Spinner fixed={true} />}
      {!loading && cartList && (
        <StyledCart>
          <div className='select'>
            <h4>음료({cartList.length})</h4>
            <div className='btnContainer'>
              <AiFillCheckCircle size='5vw' />
              <h2>전체선택</h2>
              <button>선택삭제</button>
            </div>
          </div>
          <ul>
            {cartList.map(cartItem => (
              <CartList key={cartItem.orderId} cartItem={cartItem} />
            ))}
          </ul>
        </StyledCart>
      )}
    </>
  );
};

export default Cart;
