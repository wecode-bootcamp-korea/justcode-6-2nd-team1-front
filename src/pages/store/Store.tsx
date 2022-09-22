import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import axios from 'axios';
import addressData from '././addressData.json';
import { BiSearch } from 'react-icons/bi';
import Modal from './Modal';

export type Storetype = {
  id: number;
  title: string;
  address: string;
};

// export interface Storetype {
//   id: number;
//   title: string;
//   address: string;
// }

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

    div.search {
      font-size: 30px;
      text-align: center;

      input {
        width: 70%;
        height: 40px;
        font-size: 15px;
        border: none;
        background-color: #ffffff;
        padding: 10px;
      }

      button {
        width: 50px;
        height: 40px;
        background-color: #ffffff;
        border: none;
      }
    }
  }
`;

const StyledList = styled.ul`
  margin: 10px;
  padding: 0px 10px;
  background-color: #f1f2f2;
  // background: 'http://www.gong-cha.co.kr/view/m/images/common/store_list_arr.png';

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
  const [addressList, setAddressList] = useState<Storetype[]>(addressData);
  const [address, setAddress] = useState<string>('');
  const [value, setValue] = useState('');
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickModal = useCallback(
    (add: { id: number; title: string; address: string }) => {
      setModal(!modal);
      setTitle(add.title);
      setAddress(add.address);
    },
    [modal]
  );

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
          <div className='search'>
            <form>
              <input type='text' ref={inputRef} placeholder='매장명을 검색해 주세요'></input>
              <button onClick={submitHandler}>
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
              <li onClick={() => onClickModal(add)} key={add.id}>
                <h4>{add.title}</h4>
                <p>{add.address}</p>
              </li>
            ))}
          {modal && <Modal setModal={setModal} title={title} address={address} addressList={addressList} onClickModal={onClickModal}></Modal>}
        </>
      </StyledList>
    </div>
  );
};

export default Store;
