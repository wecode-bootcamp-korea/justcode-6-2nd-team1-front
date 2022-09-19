import styled from 'styled-components';
import { HiMenuAlt3 } from 'react-icons/hi';
import logo from '../assets/ilcha_logo.png';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
  height: 70px;
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100%;
    transform: translateX(-20px);
  }
`;

const Nav = () => {
  return (
    <StyledNav>
      <img src={logo} alt='ilcha logo' />
      <HiMenuAlt3 size={40} />
    </StyledNav>
  );
};

export default Nav;
