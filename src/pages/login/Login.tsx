import styled from "styled-components";
import logo from '../../assets/ilcha_logo_reverse.png'
import { BsPerson } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import theme from "../../theme";
import axios from "axios";
import { useState } from "react";

type User = {
  token: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState('');
  const signUpHandler: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (email.includes('@') &&password.length >= 8) {
      setDisabled(true);
      try {
        const {
          data: { token },
        } = await axios.post<User>('http://localhost:8000/users/login', {
          email,
          password,
        });
        setUser(token);
        localStorage.setItem("token", token);
        setDisabled(false);
        navigate('/');
        console.log('login check');
      } catch (error) {
        setDisabled(false);
        alert('이메일 혹은 비밀번호가 맞지않습니다.');
      }
    } else alert('이메일 혹은 비밀번호가 맞지않습니다.');
  }
  return (
    <StyledLogin>
      <div className='logoBox'>
        <img src={logo} alt='logo'></img>
      </div>
      <form onSubmit={signUpHandler}>
        <div className='inputBox'>
          <BsPerson className='icon' size='24px' />
          <input type='text' placeholder='이메일' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='inputBox'>
          <FiLock className='icon' size='23px' />
          <input type='password' placeholder='비밀번호' onChange={e => setPassword(e.target.value)} />
        </div>

        <button disabled={disabled}>{disabled ? '로그인 중' : '로그인'}</button>
        
      </form>
      <div className='signUp'>
        <Link to='/signup'>회원가입</Link>
        <Line />
        <Link to='/findId'>아이디 찾기</Link>
        <Line />
        <Link to='/findPw'>비밀번호 찾기</Link>
      </div>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  button {
    border: none;
    background-color: inherit;
    &:disabled {
      opacity:0.6;
    }
  }

  div.signUp {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
    width: 100%;
    background: ${theme.red};
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
      align-items: center;
      width: 90%;
      height: 45px;
      margin: 5px;
      border: 2px solid #d9d2d2;
      border-radius: 5px;
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
      margin: 10px;
    }
    button {
      height: 45px;
      width: 90%;
      margin-top: 10px;
      background-color: ${theme.red};
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
