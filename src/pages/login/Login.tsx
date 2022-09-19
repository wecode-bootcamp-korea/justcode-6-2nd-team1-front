import styled from "styled-components";
import logo from '../../assets/ilcha_logo_reverse.png'
import { IoPersonOutline } from "react-icons/io";
const Login = () => {
  return (
    <StyledLogin>
      <div className="logoBox">
        <img src={logo}></img>
      </div>
      <form>
        <input type="text" placeholder="이메일"></input>
        <IoPersonOutline size="24" />
        <input type="password" placeholder="비밀번호"></input>
        <button>로그인</button>
      </form>
      <div className="signUp">
        <button>회원가입</button>
        <Line></Line>
        <button>아이디 찾기</button>
        <Line></Line>
        <button>비밀번호 찾기</button>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  button {
    border: none;
    background-color: inherit;
  }

  div.signUp {
    margin-top:20px;
    display:flex;
    justify-content:center;
    button {
      font-size: 13px;
      padding: 0 12px;
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

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    input {
      margin: 5px 0;
      padding-left: 30px;
      height: 45px;
      width: 90%;
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

export default Login;
