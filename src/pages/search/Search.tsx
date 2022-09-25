import axios from 'axios';
import { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { StyledHeader, StyledDiv } from '../notice/Notice';
import { StyledList } from '../product/Product';

interface ProductInfo {
  id: number;
  beverageName: string;
  imageURL: string;
  price: string;
}

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
      const { data } = await axios.get('data/search/search.json');
      setProduct(data);
      console.log(product);
    })();
  }, [value]);

  return (
    <StyledSearch>
      <StyledHeader>
        <h1>메뉴검색</h1>
        <p>일차의 다양한 메뉴를 검색해보세요.</p>
      </StyledHeader>
      <StyledDiv>
        <div className='container'>
          <form onSubmit={searchHandler}>
            <input type='text' ref={inputRef} placeholder='검색' />
          </form>
        </div>
      </StyledDiv>
      <StyledList>
        {product.map(info => (
          <li key={info.id}>
            <div className='imgContainer'>
              <img src={info.imageURL} alt='productImage' />
            </div>
            <div className='container'>
              <h3>{info.beverageName}</h3>
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
