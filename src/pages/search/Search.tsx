import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledHeader, StyledDiv } from '../notice/Notice';
import { StyledList } from '../product/Product';
import { BiSearch } from 'react-icons/bi';
import { SearchInfo, ProductInfo } from '../../interface';
import { useNavigate } from 'react-router-dom';
import CategotySkeleton from '../product/CategorySkeleton';
import theme from '../../theme';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [product, setProduct] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmpty, setSearchEmpty] = useState(false);
  const timeId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLoading(true);

    (async () => {
      const { data } = await axios.get<SearchInfo[]>(`http://localhost:8000/beverages/search?keyword=${value}`);
      if (value) {
        const list = data.filter(search => {
          return search.beverage_name.includes(value);
        });
        if (list.length) {
          setProduct(list);
          setSearchEmpty(false);
        } else {
          setSearchEmpty(true);
          setProduct([]);
        }
      } else {
        setProduct(data);
        setSearchEmpty(false);
      }
      setLoading(false);
    })();
  }, [value]);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    clearTimeout(timeId.current);
    timeId.current = setTimeout(() => {
      setValue(target.value);
    }, 500);
  };
  return (
    <StyledSearch>
      <StyledHeader>
        <h1>메뉴검색</h1>
        <p>일차의 다양한 메뉴를 검색해보세요.</p>
      </StyledHeader>
      <StyledDiv center='true'>
        <div className='container'>
          <form onSubmit={e => e.preventDefault()}>
            <input type='text' ref={inputRef} placeholder='검색어를 입력해주세요.' onChange={changeHandler} />
            <BiSearch />
          </form>
        </div>
      </StyledDiv>
      {loading ? (
        <CategotySkeleton />
      ) : (
        <StyledList>
          {searchEmpty && (
            <SearchResult>
              <h4>검색 결과가 없습니다 !</h4>
              <br />
              <h3>다른 이름으로 검색해주세요</h3>
            </SearchResult>
          )}
          {product.map(info => (
            <li key={info.id} onClick={() => navigate(`/product/detail/${info.id}`)}>
              <div className='imgContainer'>
                <img src={info['beverage_image']} alt='productImage' />
              </div>
              <div className='container'>
                <h3>{info['beverage_name']}</h3>
                <h4>{Number(info.price).toLocaleString()}원</h4>
              </div>
            </li>
          ))}
        </StyledList>
      )}
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div``;

const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  h3 {
    margin-bottom: 10px;
    font-size: 5vw;
  }

  h4 {
    font-size: 6vw;
    color: ${theme.red};
  }
`;
