import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import GlobalStyle from './GlobalStyle';
import Brand from './pages/brand/Brand';
import CartRoutes from './pages/cart/CartRoutes';
import Login from './pages/login/Login';
import Main from './pages/Main';
import NoticePage from './pages/notice/Notice';
import Order from './pages/order/Order';
import Product from './pages/product/Product';
import ProductDetail from './pages/product/ProductDetail';
import Search from './pages/search/Search';
import Signup from './pages/signup/Signup';
import Store from './pages/store/Store';
<<<<<<< HEAD
import Reviews from './pages/product/Reviews';
=======
import History from './pages/history/History';
import useStore from './context/store';
import axios, { AxiosResponse } from 'axios';
import { LoginReq, LoginRes } from './interface';
>>>>>>> main

const App = () => {
  const { login } = useStore();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
      (async () => {
        try {
          const { data } = await axios.post<LoginRes, AxiosResponse<LoginRes>, LoginReq>('http://localhost:8000/users/login', {
            email,
            password,
          });
          login(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

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
        <Route path='/product/detail/*' element={<ProductDetail />} />
        <Route path='/product/detail/:id/*' element={<ProductDetail />} />
<<<<<<< HEAD
        <Route path='/review' element={<Reviews />} />
=======
        <Route path='/history' element={<History />} />
>>>>>>> main

        <Route path='/cart/*' element={<CartRoutes />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
