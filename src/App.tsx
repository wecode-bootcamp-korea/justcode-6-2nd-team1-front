import { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import useStore from './context/store';
import GlobalStyle from './GlobalStyle';
import Brand from './pages/brand/Brand';
import Cart from './pages/cart/Cart';
import Login from './pages/login/Login';
import Main from './pages/Main';
import NoticePage from './pages/notice/Notice';
import Order from './pages/order/Order';
import Product from './pages/product/Product';
import ProductDetail from './pages/product/ProductDetail';
import Signup from './pages/signup/Signup';
import Store from './pages/store/Store';



const App = () => {
  const [locationInfo, setLocationInfo] = useState<GeolocationPosition>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setLocationInfo);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/store' element={<Store />} />

        <Route path='/order' element={<Order />} />
        <Route path='/notice' element={<NoticePage />} />
        <Route path='/news' element={<NoticePage />} />
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
