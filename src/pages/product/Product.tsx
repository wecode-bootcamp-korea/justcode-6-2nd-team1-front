import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useNav from '../../hooks/useNav';
import { CategoryRes, ProductInfo } from '../../interface';
import theme from '../../theme';
import CategotySkeleton from './CategorySkeleton';

const StyledNav = styled.nav<{ mode: number }>`
  width: 100%;
  overflow: hidden;
  background-color: #dddddd;

  ul {
    display: flex;
    width: 240%;

    li {
      width: calc(100% / 8);
      text-align: center;
      padding: 14px 10px;
      font-size: 4vw;
      position: relative;
      white-space: nowrap;

      &:nth-child(${({ mode }) => mode + 1}) {
        color: ${theme.red};
        border-bottom: 2px solid ${theme.red};
      }

      &::after {
        content: '';
        position: absolute;
        right: -0.5px;
        top: calc(50% - 7px);
        height: 14px;
        width: 1px;
        background-color: #666666;
      }
    }
  }
`;

const StyledList = styled.ul`
  padding: 10px 10px;
  margin-bottom: 20px;

  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 10px 0;

    div.imgContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 85px;
      width: 85px;
      border-radius: 50px;
      overflow: hidden;

      img {
        height: 90%;
      }
    }

    div.container {
      h3 {
        margin-bottom: 10px;
        font-size: 5vw;
      }

      h4 {
        font-size: 6vw;
        color: ${theme.red};
      }
    }
  }
`;

const category = ['season', 'combination', 'original', 'milktea', 'jewelry', 'fruit', 'smoothy', 'coffee'];
const categoryName = ['시즌 메뉴', '베스트조합', '오리지널 티', '밀크티', '쥬얼리', '과일 믹스', '스무디', '커피'];

const Product = () => {
  const { ulRef, touchEnd, touchMove, touchStart } = useNav();
  const [mode, setMode] = useState(0);
  const [productList, setProductList] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      // localhost:8000/beverages/category/:id
      const { data } = await axios.get<CategoryRes>(`data/${category[mode]}Data.json`);
      setProductList(data.beverageData);

      setLoading(false);
    })();
  }, [mode]);

  return (
    <>
      <StyledNav mode={mode}>
        <ul //
          ref={ulRef}
          onTouchStart={touchStart}
          onTouchMove={touchMove}
          onTouchEnd={touchEnd}
        >
          {categoryName.map((cate, i) => (
            <li key={cate} onClick={() => setMode(i)}>
              {cate}
            </li>
          ))}
        </ul>
      </StyledNav>
      <StyledList>
        {!loading &&
          !!productList.length &&
          productList.map(productInfo => (
            <li key={productInfo.id} onClick={() => navigate(`/product/detail/${productInfo.id}`)}>
              <div className='imgContainer'>
                <img src={productInfo.beverage_image} alt='음료사진' />
              </div>
              <div className='container'>
                <h3>{productInfo.beverage_name}</h3>
                <h4>{productInfo.price}</h4>
              </div>
            </li>
          ))}
        {loading && <CategotySkeleton />}
      </StyledList>
    </>
  );
};

export default Product;
