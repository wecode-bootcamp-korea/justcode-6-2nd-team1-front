import { SignUpForm } from '../../pages/signup/Signup';
import { NextBtn } from '../../pages/signup/Signup';
import { AgreeListProps } from '../../interface';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SignForm = ({ setPage }: AgreeListProps) => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTwice, setPasswordTwice] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [btn, setBtn] = useState(true);

  type Email = {
    message: string;
  };

  const duplicateEmail: React.MouseEventHandler<HTMLButtonElement> = () => {
    // 이메일 중복검사
    async () => {
      try {
        const res = await axios.get<Email>(`localhost:8000/users/signup?email=${email}`);
        if (res === '1') {
          setEmailCheck(true);
        }
      } catch (error) {
        console.log(error);
        setEmailCheck(false);
      }
    };
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    async () => {
      try {
        await axios.post('localhost:8000/users/signup', {
          email,
          password,
          nickname,
          name,
          phoneNumber,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    if (passwordCheck && nickname.length > 1 && name.length > 1 && phoneNumber.length > 9) {
      setBtn(false);
    } else setBtn(true);
  }, [password, nickname, name, phoneNumber]);

  useEffect(() => {
    password === passwordTwice ? setPasswordCheck(true) : setPasswordCheck(false);
  }, [passwordTwice]);

  useEffect(() => {}, [emailCheck]);

  return (
    <>
      <SignUpForm onSubmit={submitHandler}>
        <div className='head'>
          <span>아이디 설정</span>
        </div>
        <div>
          <div className='title'>
            <span>이메일</span>
            <div className='content'>
              <input type='email' onChange={e => setEmail(e.target.value)} />
              <button onClick={duplicateEmail}>중복확인</button>
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
              <span>비밀번호는 영문, 숫자를 혼합하여 8~20자 이내로 입력하세요.</span>
            </div>
          </div>
          <div className='title'>
            <span>비밀번호 확인</span>
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
      <NextBtn disabled={btn ? true : false} onClick={() => setPage(2)}>
        다음
      </NextBtn>
    </>
  );
};

export default SignForm;
