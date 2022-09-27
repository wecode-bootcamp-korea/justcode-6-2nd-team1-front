import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import axios from 'axios';
import addressData from '././addressData.json';
import { BiSearch } from 'react-icons/bi';
import Modal from './Modal';
import { StyledHeader } from '../notice/Notice';

export type Storetype = {
  id: number;
  title: string;
  address: string;
  states: string;
  lat: number;
  lng: number;
};

const StyledSearch = styled.div`
  div.container {
    background-color: #f3f4f7;
    margin: 10px;
    padding: 10px;

    div.search {
      display: flex;
      text-align: center;
      margin: 5px;
      font-size: 30px;
      border: none;

      select {
        display: flex;
        width: 25%;
        height: 40px;
        border: none;
      }

      form {
        display: flex;
        width: 80%;
        input {
          display: flex;
          width: 85%;
          height: 40px;
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
      margin-top: 10px;
    }

    p {
      font-size: 3vw;
      margin-top: 10px;
      white-space: nowrap;
      white-space: normal;
    }

    &:last-of-type {
      border: none;
    }
  }
`;

const Store = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [addressList, setAddressList] = useState<Storetype[]>(addressData);
  const [address, setAddress] = useState<string>('');
  const [states, setStates] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setlng] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addresses = ['시,도', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '경기도'];

  const onClickModal = useCallback(
    (add: { id: number; title: string; address: string; states: string; lat: number; lng: number }) => {
      setModal(!modal);
      setTitle(add.title);
      setAddress(add.address);
      setStates(add.states);
      setLat(add.lat);
      setlng(add.lng);
    },
    [modal]
  );

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setAddressList(addressData);
    console.log(selectedOption.slice(0, 2));
  };

  const submitHandler: React.FormEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    if (inputRef.current) {
      setValue(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <StyledHeader>
        <h1>STORE</h1>
        <p>간편하게 공차의 매장을 검색해보세요.</p>
      </StyledHeader>
      <StyledSearch>
        <div className='container'>
          <div className='search'>
            <select onChange={selectChange} value={selectedOption}>
              {addresses.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
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
              if (selectedOption == '시,도') {
                return val;
              }
              if (val.states.toLowerCase().includes(selectedOption.toLowerCase())) {
                return val;
              }
            })
            .filter(val => {
              if (value == ' ') {
                return val;
              }
              if (val.title.toLowerCase().includes(value.toLowerCase())) {
                return val;
              }
            })
            .map((add, i) => (
              <li onClick={() => onClickModal(add)} key={add.id}>
                <p>{add.states}</p>
                <h4>{add.title}</h4>
                <p>{add.address}</p>
              </li>
            ))}
          {modal && <Modal lat={lat} lng={lng} states={states} setModal={setModal} title={title} address={address} addressList={addressList} onClickModal={onClickModal}></Modal>}
        </>
      </StyledList>
    </div>
  );
};

export default Store;
