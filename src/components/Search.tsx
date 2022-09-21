import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import combi from '../assets/combination.jpeg';
import order from '../assets/order.jpeg';

const StyledStore = styled.div`
  display :block;
  heigth: 30vh;
  background-color : #f5f4f2;
  text-align: center;
  margin-top: 30px;
  padding-top : 20px;
  padding-bottom : 20px;

    search_wrap{
      width: 240px;

    }

    h3 {
      font-size: 20px;
      padding-bottom: 20px;
    }

    p {
     color: #666666;
     font-size : 20px;
     margin-bottom:10px;
    }
    
    input {
      width: 70%;
      height: 40px;
      margin-bottom:10px;
      padding :10px;
      outline: none;
      border : none;
    }
    button {
      font-size: 15px;
      width: 70%;
      height: 40px;
      background : #3b3230;
      color: white;
      border : none;
    }
  }
  }
`;
const StyledCombi = styled.div`
  img {
    width: 100%;
  }
`;

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('./product');
  };
  const goToOrder = () => {
    navigate('./order');
  };
  const inputHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (inputRef.current) {
      console.log(e.target);
      alert('매장명을 입력해주세요');
    }
  };

  return (
    <div>
      <StyledStore>
        <div className='search_wrap'>
          <h3>매장검색</h3>
          <p className='speed'>공차 매장을 쉽고 빠르게 찾아보세요</p>
          <form onSubmit={inputHandler}>
            <input type='text' ref={inputRef} placeholder='매장명 또는 주소를 입력하세요' />
            <div>
              <button> 매장 검색하기 </button>
            </div>
          </form>
        </div>
      </StyledStore>
      <StyledCombi>
        <img onClick={goToProduct} src={combi}></img>
        <img onClick={goToOrder} src={order}></img>
      </StyledCombi>
    </div>
  );
};
export default Search;
