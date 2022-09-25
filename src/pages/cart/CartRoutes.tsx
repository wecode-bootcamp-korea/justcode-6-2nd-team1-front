import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiOutlineCheck } from 'react-icons/ai';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ErrorModal from '../../components/ErrorModal';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { CartItem, CartOrderRes, GetCartRes, OrderData } from '../../interface';
import theme from '../../theme';
import Cart from './Cart';
import CartList from './CartList';
import CartOrder from './CartOrder';

const CartRoutes = () => {
  const { token } = useStore();
  const [cartList, setCartList] = useState<CartItem[]>();
  const [loading, setLoading] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [selectList, setSelectList] = useState<number[]>([]);
  const [disabled, setDisalbed] = useState(false);
  const [order, setOrder] = useState<OrderData>();
  const navigate = useNavigate();

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
        setSelectList(cartData.map(cartItem => cartItem.orderId));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErrorModal(true);
      }
    })();
  }, []);

  const allCheckHandler = () => {
    if (cartList) {
      if (cartList.every(cartItem => selectList.includes(cartItem.orderId))) {
        setSelectList([]);
      } else {
        setSelectList(cartList.map(cartItem => cartItem.orderId));
      }
    }
  };

  const orderHandler = async () => {
    setDisalbed(true);

    try {
      const { data } = await axios.get<CartOrderRes>('http://localhost:8000/beverages/cartOrder', {
        headers: {
          Authorization: token,
        },
      });

      setOrder(data.orderData);
      navigate('/cart/order');
      setDisalbed(false);
    } catch (error) {
      console.log(error);

      setErrorModal(true);
      setDisalbed(false);
    }
  };

  return (
    <>
      {errorModal && <ErrorModal errorMessage='로그인을 먼저 해주세요.' errorModal={errorModal} setErrorModal={setErrorModal} />}
      {loading && <Spinner fixed={true} />}
      {!loading && cartList && (
        <Routes>
          <Route
            path=''
            element={
              <Cart //
                allCheckHandler={allCheckHandler}
                cartList={cartList}
                disabled={disabled}
                orderHandler={orderHandler}
                selectList={selectList}
                setSelectList={setSelectList}
              />
            }
          />
          <Route
            path='/order'
            element={
              <CartOrder //
                order={order}
                selectList={selectList}
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

export default CartRoutes;
