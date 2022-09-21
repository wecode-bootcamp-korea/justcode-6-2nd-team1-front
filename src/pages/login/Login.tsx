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
    margin:20px;
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
    width:100vw;
    background: #af3030;
    padding: 50px 0 40px 0;
    img {
      width: 70%;
    }
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
    width: 100%;
    .inputBox {
      display: flex;
      align-items:center;
      width: 90vw;
      height: 45px;
      margin:5px;
      border: 2px solid #d9d2d2;
      border-radius:5px;
      background-color: white;
    }
    input {
      font-size: 16px;
      margin: 5px 0;
      width: 80%;
      border: none;
    }
    .icon {
      color: gray;
      margin:10px;
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
        <div className="inputBox">
          <BsPerson className="icon" size="24px" />
          <input type="text" placeholder="이메일"></input>
        </div>
        <div className="inputBox">
          <FiLock className="icon" size="23px" />
          <input type="password" placeholder="비밀번호"></input>
        </div>

        <button>로그인</button>
      </form>
      <div className="signUp">
        <Link to="/signup">회원가입</Link>
        <Line />
        <Link to="/findId">아이디 찾기</Link>
        <Line />
        <Link to="/findPw">비밀번호 찾기</Link>
      </div>
    </StyledLogin>
  );
};

export default Login;
