import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductDetailInfo } from '../../interface';

const StyledMenu = styled.div``;

const ProductDetail = () => {
  const [info, setInfo] = useState<ProductDetailInfo>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get<ProductDetailInfo>('/data/detail1.json');
      setInfo(data);

      setLoading(false);
    })();
  }, []);

  if (loading || !info) {
    return <>로딩중</>;
  } else {
    return <StyledMenu>{info.detailData.beverageName}</StyledMenu>;
  }
};

export default ProductDetail;
