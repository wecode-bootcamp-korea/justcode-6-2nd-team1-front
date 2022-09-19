import styled from "styled-components";
import logo from '../../assets/ilcha_logo_reverse.png'
import { BsPerson } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";


const StyledLogin = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  button {
    border: none;
    background-color: inherit;
  }

  div.signUp {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    button {
      font-size: 13px;
      padding: 0 12px;
    }
    a {
      font-size: 13px;
      padding: 0 12px;
      text-decoration: none;
      color: black;
    }
  }

  div.logoBox {
    display: flex;
    justify-content: center;
    background: #af3030;
    padding: 70px 0;
    img {
      width: 200px;
    }
  }

  .icon {
    color: gray;
    position: absolute;
    margin-top: 14px;
    left: 43px;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    width: 100%;
    input {
      position: relative;
      font-size: 15px;
      margin: 5px 0;
      padding-left: 35px;
      height: 45px;
      width: 320px;
      border: 2px solid #d9d2d2;
    }
    button {
      height: 45px;
      width: 90%;
      margin-top: 10px;
      background-color: #af3030;
      color: white;
      font-size: 20px;
      border: none;
      border-radius: 50px;
    }
  }
`;

const Line = styled.div`
  height: 13px;
  border-right: 1px solid gray;
`;

const Login = () => {
  return (
    <StyledLogin>
      <div className="logoBox">
        <img src={logo} alt="logo"></img>
      </div>
      <form>
        <div>
          <input type="text" placeholder="이메일"></input>
          <BsPerson className="icon" size="24px" />
        </div>
        <div>
          <input type="password" placeholder="비밀번호"></input>
          <FiLock className="icon" size="23px" />
        </div>

        <button>로그인</button>
      </form>
      <div className="signUp">
        <Link to="/signup">회원가입</Link>
        <Line></Line>
        <Link to="/findId">아이디 찾기</Link>
        <Line></Line>
        <Link to="/findPw">비밀번호 찾기</Link>
      </div>
    </StyledLogin>
  );
};

export default Login;
