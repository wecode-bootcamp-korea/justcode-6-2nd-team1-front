import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { CartItem, CartOrderRes, CartPayReq, CartRemoveReq, CartRemoveRes, GetCartRes, OrderData } from '../../interface';
import Cart from './Cart';
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
  const [message, setMessage] = useState('');

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
        setMessage('로그인을 확인해주세요.');
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
      const { data } = await axios.post<CartOrderRes, AxiosResponse<CartOrderRes>, CartPayReq>(
        'http://localhost:8000/beverages/cartOrder',
        selectList.map(id => ({ id })),
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setOrder(data.orderData);
      navigate('/cart/order');
      setDisalbed(false);
    } catch (error) {
      console.log(error);

      setErrorModal(true);
      setMessage('장바구니가 비어있습니다.');
      setDisalbed(false);
    }
  };

  const removeSelectHandler = async () => {
    try {
      setDisalbed(true);
      await axios.post<CartRemoveRes, AxiosResponse<CartRemoveRes>, CartRemoveReq>(
        'http://localhost:8000/beverages/delete_cart',
        {
          id: selectList,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const {
        data: { cartData },
      } = await axios.get<GetCartRes>(`http://localhost:8000/beverages/cart`, {
        headers: {
          Authorization: token,
        },
      });

      setCartList(cartData);
      setSelectList([]);
      setDisalbed(false);
    } catch (error) {
      console.log(error);
      setErrorModal(true);
      setDisalbed(false);
    }
  };

  return (
    <>
      {errorModal && <ErrorModal errorMessage={message} errorModal={errorModal} setErrorModal={setErrorModal} />}
      {loading && <Spinner fixed={true} />}
      {!loading && cartList && (
        <Routes>
          <Route
            path=''
            element={
              <Cart //
                allCheckHandler={allCheckHandler}
                cartList={cartList}
                setCartList={setCartList}
                disabled={disabled}
                orderHandler={orderHandler}
                selectList={selectList}
                setSelectList={setSelectList}
                removeSelectHandler={removeSelectHandler}
              />
            }
          />
          <Route path='/order' element={<CartOrder order={order} selectList={selectList} />} />
        </Routes>
      )}
    </>
  );
};

export default CartRoutes;
