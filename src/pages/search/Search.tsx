import axios from 'axios';
import { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { StyledHeader, StyledDiv } from '../notice/Notice';
import { StyledList } from '../product/Product';
import { BsChevronDown } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
interface ProductInfo {
  id: number;
  beverage_name: string;
  beverage_image: string;
  price: string;
  description: string;
}

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [product, setProduct] = useState<ProductInfo[]>([]);
  const [option, setOption] = useState('이름');
  const [optionOpen, setOptionOpen] = useState(false);

  useEffect(() => {
    const optionOpenHandler = ({ target }: MouseEvent) => {
      if (target instanceof Element) {
        target.closest('ul.option') ? setOptionOpen(o => !o) : setOptionOpen(false);
      }
    };

    window.addEventListener('click', optionOpenHandler);
    return () => window.removeEventListener('click', optionOpenHandler);
  }, []);

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
      <StyledDiv optionOpen={optionOpen}>
        <div className='container'>
          <ul className='option'>
            <li>
              {option} <BsChevronDown />
            </li>
            <li onClick={() => setOption('이름')}>이름</li>
            <li onClick={() => setOption('내용')}>내용</li>
          </ul>
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
