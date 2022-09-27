import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StyledHeader, StyledDiv } from '../notice/Notice';
import { StyledList } from '../product/Product';
import { BiSearch } from 'react-icons/bi';
import { SearchInfo, ProductInfo } from '../../interface';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [product, setProduct] = useState<ProductInfo[]>([]);

  const searchHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (inputRef.current) {
      setValue(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<SearchInfo[]>(`http://localhost:8000/search?keyword=${value}`);
      if (value) {
        const list = data.filter(search => {
          return search.description.includes(value);
        });
        setProduct(list);
      } else {
        setProduct(data);
      }
    })();
  }, [value]);

  return (
    <StyledSearch>
      <StyledHeader>
        <h1>메뉴검색</h1>
        <p>일차의 다양한 메뉴를 검색해보세요.</p>
      </StyledHeader>
      <StyledDiv center='true'>
        <div className='container'>
          <form onSubmit={searchHandler}>
            <input type='text' ref={inputRef} placeholder='검색어를 입력해주세요.' />
            <BiSearch />
          </form>
        </div>
      </StyledDiv>
      <StyledList>
        {product.map(info => (
          <li key={info.id}>
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
    </StyledSearch>
  );
};

export default Search;

const StyledSearch = styled.div``;
