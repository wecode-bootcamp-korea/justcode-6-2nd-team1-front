import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import orderpage from '../../assets/orderpage.jpeg';
import fivecup from '../../assets/fivecup.png';
import fourcup from '../../assets/fourcup.png';
import sixbox from '../../assets/sixbox.png';
import sweet from '../../assets/sweet.jpg';
import iced from '../../assets/iced.jpg';
import Footer from '../../components/Footer';

const StyledHeader = styled.header`
  display: flex;
  height: 25vh;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 5px 10px 5px;
  background-image: url(${orderpage});
  background-position: center;
  background-size: cover;
  gap: 20px;
  color: white;

  h1 {
    font-size: 8vw;
    font-weight: 500;
    padding-top: 10px;
    margin-top: 10px;
  }
  h2 {
    font-size: 5vw;
    font-weight: 1em;
    line-height: 1.3em;
    padding-top: 10px;
  }
`;

const StyledMiddle = styled.div`
  display: inline-block;
  width: 100%;
  height: 40vh;
  align-items: center;
  background-color: #efeae4;

  div {
    width: 100%;
    padding: 15px;
    text-align: center;
    line-height: 1.7em;

    h4 {
      font-size: 6vw;
      margin-bottom: 20px;
    }
    p {
      font-size: 4vw;
    }
  }

  .fivecup {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const StyledStep = styled.div`
  display: flex;
  width: 100%;
  margin-top: 25%;
  padding: 10px;

  div.step {
    display: inline-block;
    width: 100%;
    height: calc(30%-10px);
    text-align: center;
    line-height: 1.3em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    h3 {
      font-size: 1.4em;
    }
    h1 {
      display: inline-block;
      font-size: 1.6em;
      background-color: gray;
      color: white;
      margin: 10px 0 10px 0;
      padding: 3px 3px 3px 3px;
    }

    img {
      display: inline-block;
      width: 100%;
      max-width: 100%;
      height: 23vh;
      object-fit: contain;
      max-width: 100%;
      height: auto;
    }

    img.lastimg {
      display: flex;
      margin-top: 10px;
    }
    div.sixbox {
      display: inline-block;
      width: 100%;

      img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }
`;

const Order = () => {
  return (
    <div>
      <StyledHeader>
        <h1>HOW TO ORDER</h1>
        <h2>취향에 맞게 토핑, 당도, 얼음량까지 맞춤 주문이 가능합니다.</h2>
      </StyledHeader>
      <StyledMiddle>
        <div>
          <h4>일차가 처음이신가요?</h4>
          <p>일차는 오리지널 티(Tea)와 밀크티, 스무디, 과일믹스 등의 메뉴를 베이스로 5가지 당도와 얼음량, 토핑까지 선택할 수 있어 취향에 따라 커스터마이징하여 주문 가능합니다. 약 600여 가지의 다양한 조합으로 음료를 즐길 수 있습니다.</p>
        </div>
        <img className='fivecup' src={fivecup} />
      </StyledMiddle>
      <StyledStep>
        <div className='step'>
          <h3>step 01</h3>
          <h1>TEA MENU</h1>
          <p> 취향에 맞게 공차의 음료를 고르세요</p>
          <img src={fourcup} />
          <h3>step 02</h3>
          <h1>TOPPINGS</h1>
          <p> 6가지 토핑 중 원하는 토핑을 선택하세요.</p>
          <div className='sixbox'>
            <img src={sixbox} />
          </div>
          <h3>step 03</h3>
          <h1>SWEET & ICE GRADE</h1>
          <p> 당도와 얼음량을 원하시는 만큼 조절하세요.</p>
          <img src={sweet} />
          <img className='lastimg' src={iced} />
        </div>
      </StyledStep>
      <Footer />
    </div>
  );
};

export default Order;
