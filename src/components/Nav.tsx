import styled from 'styled-components';
import { HiMenu, HiMenuAlt3 } from 'react-icons/hi';
import logo from '../assets/ilcha_logo.png';
import facebook from '../assets/sns/facebook.png';
import insta from '../assets/sns/insta.png';
import kakao from '../assets/sns/kakao.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineShoppingCart } from 'react-icons/ai';
import theme from '../theme';
import { BiHistory, BiSearch } from 'react-icons/bi';
import useStore from '../context/store';

const StyledHeader = styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  background-color: white;
  width: 100%;
  height: 20vw;
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100%;
    transform: translateX(-5vw);
  }

  div.iconContainer {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const StyledDiv = styled.div<{ menu: boolean }>`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, ${({ menu }) => (menu ? 0.7 : 0)});
  visibility: ${({ menu }) => (menu ? 'visible' : 'hidden')};
  transition: 0.3s;
  width: 100%;
  height: 100%;
`;

const StyledNav = styled.nav<{ menu: boolean }>`
  position: fixed;
  z-index: 20;
  left: 100%;
  top: 0;
  height: 100%;
  overflow-y: auto;
  width: 70vw;
  background-color: #ffffff;
  transform: translateX(${({ menu }) => (menu ? '-100%' : '0%')});
  transition: 0.3s;

  div.nav-top {
    background-color: ${theme.red};
    height: 20vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 6vw;
    padding: 0 10px;

    h2 {
      color: white;
      font-weight: bold;
    }

    & > div {
      display: flex;
      gap: 10px;
    }
  }

  ul.nav-main {
    & > li {
      height: calc(6vw + 30px);
      overflow: hidden;
      background-color: #ffffff;
      transition: 0.3s;
      color: #000000;
      border-bottom: 1px solid lightgray;
      svg {
        rotate: 0;
        transition: 0.3s;
      }

      &.on {
        height: calc(18vw + 90px);
        background-color: #392e2c;

        h3 {
          color: white;
        }

        svg {
          rotate: 45deg;
        }
      }

      h3 {
        font-size: 6vw;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      ul.inner-menu {
        background-color: #efeae4;

        & > li {
          font-size: 6vw;
          padding: 15px 10px;
          border-bottom: 1px solid lightgray;

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
`;

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { isLogin, logout } = useStore();

  const closeHandler: React.MouseEventHandler<HTMLDivElement> = e => {
    if (e.target instanceof HTMLElement) {
      setMenu(false);
    }
  };

  const pageTransition = (url: string) => {
    navigate(url);
    setMenu(false);
  };

  const toggleHandler: React.MouseEventHandler<HTMLElement> = e => {
    if (e.target instanceof HTMLElement && !e.target.closest('ul.inner-menu')) {
      e.currentTarget.classList.toggle('on');
    }
  };

  const logoutHandler = () => {
    logout();
    navigate('/login');
    setMenu(false);
  };

  return (
    <>
      <StyledHeader>
        <img src={logo} alt='ilcha logo' onClick={() => pageTransition('/')} />
        <div className='iconContainer'>
          <BiSearch size='10vw' onClick={() => navigate('/search')} />
          <HiMenu size='10vw' onClick={() => setMenu(!menu)} />
        </div>
      </StyledHeader>
      <StyledDiv menu={menu} onClick={closeHandler} />
      <StyledNav menu={menu} className='menu'>
        <div className='nav-top'>
          {isLogin ? <h2 onClick={logoutHandler}>로그아웃</h2> : <h2 onClick={() => pageTransition('/login')}>로그인</h2>}

          <div>
            <AiOutlineShoppingCart color='white' size='10vw' onClick={() => pageTransition('/cart')} />
            <BiHistory color='white' size='10vw' onClick={() => pageTransition('/history')} />
          </div>
        </div>
        <ul className='nav-main'>
          <li onClick={toggleHandler}>
            <h3>
              Brand <AiOutlinePlus />
            </h3>
            <ul className='inner-menu'>
              <li onClick={() => pageTransition('/brand')}>브랜드 소개</li>
              <li>공차의 약속</li>
            </ul>
          </li>
          <li onClick={toggleHandler}>
            <h3>
              Menu <AiOutlinePlus />
            </h3>
            <ul className='inner-menu'>
              <li onClick={() => pageTransition('/order')}>주문방법</li>
              <li onClick={() => pageTransition('/product')}>음료</li>
            </ul>
          </li>
          <li onClick={toggleHandler}>
            <h3>
              Store <AiOutlinePlus />
            </h3>
            <ul className='inner-menu'>
              <li onClick={() => pageTransition('/store')}>매장 찾기</li>
              <li>가맹점 개설 문의</li>
            </ul>
          </li>
          <li onClick={() => pageTransition('/notice')}>
            <h3>공지사항</h3>
          </li>
        </ul>
      </StyledNav>
    </>
  );
};

export default Nav;
