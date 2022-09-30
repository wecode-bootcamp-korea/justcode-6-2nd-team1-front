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
import ProductDetailRoutes from './pages/product/ProductDetailRoutes';
import Search from './pages/search/Search';
import Signup from './pages/signup/Signup';
import Store from './pages/store/Store';
import History from './pages/history/History';
import useStore from './context/store';
import RedirectHandler from './components/login/RedirectHandler';
import MatchModal from './components/MatchModal';
import AskStore from './pages/store/AskStore';

const App = () => {
  const { isLogin, isMatch } = useStore();

  const [search, setSearch] = useState('');

  return (
    <>
      <GlobalStyle />
      <Nav setSearch={setSearch} />
      {isLogin && !isMatch && <MatchModal />}
      <Routes>
        <Route path='/' element={<Main search={search} setSearch={setSearch} />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/store' element={<Store search={search} setSearch={setSearch} />} />
        <Route path='/askstore' element={<AskStore />} />

        <Route path='/order' element={<Order />} />
        <Route path='/notice' element={<NoticePage />} />
        <Route path='/news' element={<NoticePage />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/detail/*' element={<ProductDetailRoutes />} />
        <Route path='/product/detail/:id/*' element={<ProductDetailRoutes />} />
        <Route path='/history' element={<History />} />

        <Route path='/cart/*' element={<CartRoutes />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/kakaologin' element={<RedirectHandler />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
