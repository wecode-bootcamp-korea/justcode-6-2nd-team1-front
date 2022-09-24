import styled from 'styled-components';
import { SignUpForm } from '../../pages/signup/Signup';
import { NextBtn } from '../../pages/signup/Signup';
import { AgreeListProps } from '../../interface';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const SignForm = ({ setPage }: AgreeListProps) => {
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCondition, setPasswordCondition] = useState(true);
  const [passwordTwice, setPasswordTwice] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [btn, setBtn] = useState(true);

  type Email = '0' | '1';

  type SignUp = {
    email: string;
    password: string;
    nickname: string;
    name: string;
    phoneNumber: string;
  };

  interface SignUpReq {
    email: string;
    password: string;
    nickname: string;
    name: string;
    phoneNumber: string;
  }

  const duplicateEmail: React.MouseEventHandler<HTMLButtonElement> = async e => {
    // 이메일 중복검사
    e.preventDefault();
    try {
      const { data } = await axios.get<Email>(`http://localhost:8000/users/userCheck?email=${email}`);
      if (data === '1') {
        alert('사용 가능한 이메일 입니다');
        setEmailCheck(true);
      } else {
        alert('사용중인 이메일 입니다');
      }
    } catch (error) {
      console.log(error);
      setEmailCheck(false);
    }
  };

  useEffect(() => {
    // 유효성 검사
    if (password.length > 7) {
      setPasswordCondition(true);
      if (passwordCheck && emailCheck && nickname.length > 1 && name.length > 1 && phoneNumber.length > 9) {
        setBtn(false);
        console.log('login Condition checked');
      } else setBtn(true);
    } else {
      setPasswordCondition(false);
    }
  }, [password, nickname, name, phoneNumber, emailCheck]);

  useEffect(() => {
    // 비밀번호 확인 input
    password === passwordTwice ? setPasswordCheck(true) : setPasswordCheck(false);
  }, [passwordTwice]);

  // 통신해보고 점검하기
  // 이메일 중복체크 후 다시 이메일 수정했을 때 검사하도록 하는 버튼
  // useEffect(() => {
  //   if (email !== emailState) {
  //     setEmailCheck(false);
  //   } else {
  //     setEmailCheck(true);
  //   }
  // }, [email, emailState]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    // 기입한 정보 보내기
    try {
      await axios.post<SignUp, AxiosResponse<SignUp>, SignUpReq>('http://localhost:8000/users/signup', {
        email,
        password,
        nickname,
        name,
        phoneNumber,
      });
      // 가입완료 화면으로 넘어가게하는 state
      setEmailState(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyedForm onSubmit={submitHandler}>
      <SignUpForm>
        <div className='head'>
          <span>아이디 설정</span>
        </div>
        <div>
          <div className='title'>
            <span>이메일</span>
            <div className='content'>
              <input type='email' onChange={e => setEmail(e.target.value)} />
              <span className={`button ${emailCheck ? '' : 'btnCheck'}`} onClick={duplicateEmail}>
                중복확인
              </span>
            </div>
          </div>
          <div className='title'>
            <span>비밀번호</span>
            <div className='content'>
              <input
                type='password'
                onChange={e => setPassword(e.target.value)} //
                name='password'
              />
              <span className={passwordCondition ? '' : 'failColor'}>
                비밀번호는 영문, 숫자를 혼합하여 8~20자
                <br /> 이내로 입력하세요.
              </span>
            </div>
          </div>
          <div className='title'>
            <span>
              비밀번호 <br />
              확인
            </span>
            <div className='content'>
              <input
                className={!passwordCheck ? 'border' : ''}
                type='password' //
                onChange={e => setPasswordTwice(e.target.value)}
              />
              {passwordCheck ? '' : <p>입력한 비밀번호와 다릅니다!</p>}
            </div>
          </div>
        </div>
      </SignUpForm>
      <SignUpForm>
        <div className='head'>
          <span>닉네임 설정</span>
        </div>
        <div>
          <div className='title'>
            <span>닉네임</span>
            <div className='content'>
              <input type='text' onChange={e => setNickname(e.target.value)} />
            </div>
          </div>
        </div>
      </SignUpForm>
      <SignUpForm>
        <div className='head'>
          <span>회원 정보</span>
        </div>
        <div>
          <div className='title'>
            <span>이름</span>
            <div className='content'>
              <input type='text' onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div className='title'>
            <span>휴대폰 번호</span>
            <div className='content'>
              <input type='number' onChange={e => setPhoneNumber(e.target.value)} />
            </div>
          </div>
        </div>
      </SignUpForm>
      <NextBtn //
        // disabled={btn ? true : false}
        onClick={() => setPage(2)}
      >
        다음
      </NextBtn>
    </StyedForm>
  );
};

export default SignForm;

const StyedForm = styled.form`
  width: 100vw;
  div {
    padding: 0 10px;
  }
`;
