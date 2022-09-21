import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import axios from 'axios';
import addressData from '././addressData.json';
import { BiSearch } from 'react-icons/bi';

const StyledHeader = styled.header`
  display: flex;
  height: 150px;
  flex-direction: column;
  align-items: center;
  background-image: url(${noticeTop});
  background-position: center;
  background-size: cover;
  gap: 20px;
  color: white;
  padding: 30px 0;

  h1 {
    font-size: 8vw;
    font-weight: 500;
  }

  p {
    font-size: 4vw;
  }
`;
const StyledSearch = styled.div`
  div.container {
    background-color: #f3f4f7;
    margin: 10px;
    padding: 10px;



    div.region{
      display: flex;
      justify-content: center;


      div.state {
        display: flex;
        margin-right: 5px;



         select {
           width: 195px;
           height:40px;
           border : none;
           background-color: #ffffff;
      }
    }

      div.city {
        display: flex;
        width: 200px;
        height:40px;

        select {
           width: 100%;
           border : none;
           background-color: #ffffff;
      }
    }
  }

    div.search {
      font-size : 30px;
      text-align: center;

      input{
        width : 350px;
        height: 40px;
        font-size : 15px;
        border: none;
        background-color: #ffffff;
        padding: 10px;
      }


      button {
        width : 50px;
        height: 40px;
        background-color: #ffffff;
        border: none;
        
        
        }
      }
    }
  }
`;

const StyledList = styled.ul`
  margin: 10px;
  padding: 0px 10px;
  background-color: #f1f2f2;

  li {
    border-bottom: 1px solid #666666;
    padding: 20px 0;

    h4 {
      color: #222222;
      font-size: 4vw;
    }

    p {
      font-size: 3vw;
      margin-top: 10px;
      white-space: nowrap;
    }

    &:last-of-type {
      border: none;
    }
  }
`;

const Store = () => {
  const [selectedOption, setSelectedOption] = useState();
  const [addressList, setAddressList] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const [lastLi, setLastLi] = useState<HTMLLIElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption;
  };

  const submitHandler: React.FormEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    if (inputRef.current) {
      setValue(inputRef.current.value);
      inputRef.current.value = '';
      console.log(value);
    }
  };

  const addresses = ['시,도', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '경기도'];

  return (
    <div>
      <StyledHeader>
        <h1>STORE</h1>
        <p>간편하게 공차의 매장을 검색해보세요.</p>
      </StyledHeader>
      <StyledSearch>
        <div className='container'>
          <div className='region'>
            <div className='state'>
              <select onChange={selectChange}>
                <>
                  {addresses.map(address => (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  ))}
                </>
              </select>
            </div>
            <div className='city'>
              <select>
                <option>구/군</option>??
                <option>경기도</option>
                <option>서울</option>
              </select>
            </div>
          </div>
          <div className='search'>
            <form>
              <input
                type='text'
                ref={inputRef}
                className='input'
                placeholder='매장명 또는 주소를 입력해 주세요'
                onChange={e => {
                  setValue(e.target.value);
                }}
              ></input>
              <button onSubmit={submitHandler}>
                <BiSearch />
              </button>
            </form>
          </div>
        </div>
      </StyledSearch>
      <StyledList>
        <>
          {addressData
            .filter(val => {
              if (value == ' ') {
                return val;
              } else if (val.title.toLowerCase().includes(value.toLowerCase())) {
                return val;
              }
            })
            .map((add, i) => (
              <li key={add.id} ref={addressList.length - 1 === i ? setLastLi : null}>
                <h4>{add.title}</h4>
                <p>{add.address}</p>
              </li>
            ))}
        </>
      </StyledList>
    </div>
  );
};

export default Store;
