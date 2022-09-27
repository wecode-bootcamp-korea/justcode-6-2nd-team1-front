import styled from 'styled-components';
import logo from '../../assets/ilcha_logo_reverse.png';

import { BsPerson } from 'react-icons/bs';
import { FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../../theme';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import useStore from '../../context/store';
import { LoginReq, LoginRes, User } from '../../interface';
import ErrorModal from '../../components/ErrorModal';
import KaKaoLogin from '../../components/login/KakaoButton';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { login, isLogin } = useStore();
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    isLogin && navigate('/');
  }, [isLogin]);

  const signUpHandler: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (email.includes('@') && password.length >= 8) {
      setDisabled(true);
      try {
        const { data } = await axios.post<LoginRes, AxiosResponse<LoginRes>, LoginReq>('http://localhost:8000/users/login', {
          email,
          password,
        });
        login(data);
        setDisabled(false);

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      } catch (error) {
        setDisabled(false);
        setErrorModal(true);
      }
    } else setErrorModal(true);
  };

  return (
    <>
      {errorModal && <ErrorModal errorMessage='이메일 혹은 비밀번호가 맞지않습니다.' errorModal={errorModal} setErrorModal={setErrorModal} />}
      <StyledLogin>
        <div className='logoBox'>
          <img src={logo} alt='logo' />
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
          <button className='loginBtn' disabled={disabled}>
            {disabled ? '로그인 중' : '로그인'}
          </button>
          <KaKaoLogin />
        </form>
        <div className='signUp'>
          <Link to='/signup'>회원가입</Link>
          <Line />
          <Link to='/findId'>아이디 찾기</Link>
          <Line />
          <Link to='/findPw'>비밀번호 찾기</Link>
        </div>
      </StyledLogin>
    </>
  );
};

export default Login;

const StyledLogin = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  button {
    background-color: inherit;
    border: none;
    &:disabled {
      opacity: 0.6;
    }
  }

  div.signUp {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      padding: 0 12px;
      font-size: 13px;
    }
    a {
      padding: 0 12px;
      text-decoration: none;
      font-size: 13px;
      color: black;
    }
  }

  div.logoBox {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 50px 0 40px 0;
    background: ${theme.red};
    img {
      width: 70%;
    }
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
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
      width: 80%;
      margin: 5px 0;
      border: none;
      font-size: 16px;
    }
    .icon {
      margin: 10px;
      color: gray;
    }
    .loginBtn {
      height: 45px;
      width: 90%;
      margin-top: 10px;
      background-color: ${theme.red};
      border: none;
      border-radius: 50px;
      font-size: 20px;
      color: white;
    }
  }
`;

const Line = styled.div`
  height: 13px;
  border-right: 1px solid gray;
`;
