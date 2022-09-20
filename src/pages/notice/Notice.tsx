import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import { BiSearch } from 'react-icons/bi';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${noticeTop});
  background-position: center;
  background-size: cover;
  gap: 20px;
  color: white;
  padding: 30px 0;

  h2 {
    font-size: 8vw;
    font-weight: 500;
  }

  p {
    font-size: 4vw;
  }
`;

const StyledNav = styled.nav<{ isNotice: boolean }>`
  display: flex;
  width: calc(100% - 20px);
  background-color: #983b43;
  margin: 0 auto;
  padding: 10px 0;
  transform: translateY(-50%);
  position: relative;

  a {
    display: block;
    width: 50%;
    text-align: center;
    color: #c9898e;
    font-size: 4vw;

    &:nth-child(${({ isNotice }) => (isNotice ? '1' : '2')}) {
      color: white;
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 1px);
    top: calc(50% - 2vw);
    width: 2px;
    height: 4vw;
    background-color: #c9898e;
  }
`;

const StyledDiv = styled.div<{ optionOpen: boolean }>`
  padding: 10px;

  div.container {
    display: flex;
    justify-content: space-between;
    background-color: #f3f4f7;
    height: calc(4vw + 40px);
    padding: 10px;

    ul.option {
      width: calc(30% - 10px);
      height: calc((4vw + 20px) * ${({ optionOpen }) => (optionOpen ? '3' : '1')});
      transition: 0.3s;
      background-color: white;
      overflow: hidden;

      li {
        font-size: 4vw;
        height: calc(4vw + 20px);
        padding: 10px;
        font-weight: 300;
      }
    }

    div.inputContainer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70%;
      height: 100%;
      background-color: white;
      padding: 0 10px;

      input {
        display: block;
        width: 100%;
        border: none;

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const Notice = () => {
  const { pathname } = useLocation();
  const [isNotice, setIsNotice] = useState(pathname === '/notice');
  const [optionOpen, setOptionOpen] = useState(false);

  useEffect(() => {
    setIsNotice(pathname === '/notice');
  }, [pathname]);

  useEffect(() => {
    const optionOpenHandler = ({ target }: MouseEvent) => {};

    window.addEventListener('click', optionOpenHandler);
    return () => window.removeEventListener('click', optionOpenHandler);
  }, []);

  return (
    <>
      <StyledHeader>
        <h2>NEWS</h2>
        <p>공차의 다양한 소식을 확인해 보새요.</p>
      </StyledHeader>
      <StyledNav isNotice={isNotice}>
        <Link to='/notice'>공지사항</Link>
        <Link to='/news'>보도자료</Link>
      </StyledNav>
      <StyledDiv optionOpen={optionOpen}>
        <div className='container'>
          <ul className='option'>
            <li>전체</li>
            <li>내용</li>
            <li>날짜</li>
          </ul>
          <div className='inputContainer'>
            <input type='text' name='' id='' />
            <BiSearch />
          </div>
        </div>
      </StyledDiv>
    </>
  );
};

export default Notice;
