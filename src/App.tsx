import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import GlobalStyle from './GlobalStyle';
import Brand from './pages/brand/Brand';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Main from './pages/Main';
import Order from './pages/order/Order';
import Product from './pages/product/Product';
import ProductDetail from './pages/product/ProductDetail';
import Signup from './pages/signup/Signup';
import Store from './pages/store/Store';

interface User {
  nickname: string;
  token: string;
  userPosition: {
    latitude: number;
    longitude: number;
  };
}

const App = () => {
  const [userInfo, setUserInfo] = useState<User>({
    nickname: '',
    token: '',
    userPosition: {
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserInfo({
        ...userInfo,
        userPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/store' element={<Store userInfo={userInfo} />} />

        <Route path='/order' element={<Order />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/detail' element={<ProductDetail />} />
        <Route path='/product/detail/:id' element={<ProductDetail />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
