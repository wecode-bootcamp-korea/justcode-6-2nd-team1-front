import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import axios from 'axios';
// import addressData from '././addressData.json';
import { BiSearch } from 'react-icons/bi';
import Modal from './Modal';
import { StyledHeader } from '../notice/Notice';

export interface Storetype {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

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
  const [addressList, setAddressList] = useState<Storetype[]>([]);
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const addresses = ['시,도', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '경기도'];
  // const { data } = await axios.get<Storetype>(`localhost:8000/shops`);
  // const { data } = await axios.get<Storetype>('./data/addressData.json');

  const text = location.state.text;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Storetype[]>('http://localhost:8000/shops');
        setAddressList(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onClickModal = useCallback(
    (add: { id: number; name: string; address: string; latitude: number; longitude: number }) => {
      setModal(!modal);
      setName(add.name);
      setAddress(add.address);
      setLatitude(add.latitude);
      setLongitude(add.longitude);
    },
    [modal]
  );

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    setAddressList(addressList);
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
          {addressList
            .filter(val => {
              if (selectedOption == '시,도') {
                return val;
              }
              if (val.address.slice(0, 2).includes(selectedOption.slice(0, 2))) {
                return val;
              }
            })
            .filter(val => {
              if (value == ' ') {
                return val;
              }
              if (val.name.toLowerCase().includes(value.toLowerCase())) {
                return val;
              }
            })
            .map((add, i) => (
              <li onClick={() => onClickModal(add)} key={add.id}>
                <h4>{add.name}</h4>
                <p>{add.address}</p>
              </li>
            ))}
          {modal && <Modal latitude={latitude} longitude={longitude} setModal={setModal} name={name} address={address} addressList={addressList} onClickModal={onClickModal}></Modal>}
        </>
      </StyledList>
    </div>
  );
};

export default Store;
