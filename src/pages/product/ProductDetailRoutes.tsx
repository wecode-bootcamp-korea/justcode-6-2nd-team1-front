import { useState } from 'react';
import { OrderRes } from '../../interface';
import { Route, Routes } from 'react-router-dom';
import Pay from './pay/Pay';
import ProductDetail from './ProductDetail';

const ProductDetailRoutes = () => {
  const [orderRes, setOrderRes] = useState<OrderRes>();
  return (
    <Routes>
      <Route path='' element={<ProductDetail setOrderRes={setOrderRes} />} />
      <Route path='/pay' element={<Pay orderRes={orderRes} />} />
    </Routes>
  );
};

export default ProductDetailRoutes;
