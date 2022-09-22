import { SignUpForm } from "../../pages/signup/Signup";
import axios from "axios";
import { useEffect, useState } from "react";
const SignForm = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  console.log(email)
  const duplicateEmail: React.MouseEventHandler<HTMLButtonElement> = e => {
    // 이메일 중복검사 함수

  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
      nickname: { value: nickname },
      name: { value: name },
      phone: {value:phone}
    } = e.target;

    console.log(email);
  };

  useEffect(() => {
    console.log(pw.length);
  }, [pw])
  
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
              <input type='email' name='email' />
              <button onClick={duplicateEmail}>중복확인</button>
            </div>
          </div>
          <div className='title' >
            <span>비밀번호</span>
            <div className='content'>
              <input type='password' onChange={e => setPw(e.target.value)} name='password' />
              <span>비밀번호는 영문, 숫자를 혼합하여 8~20자 이내로 입력하세요.</span>
            </div>
          </div>
          <div className='title'>
            <span>비밀번호 확인</span>
            <div className='content'>
              <input type='password' />
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
              <input type='text' name='nickname' />
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
              <input type='text' name='name' />
            </div>
          </div>
          <div className='title'>
            <span>휴대폰 번호</span>
            <div className='content'>
              <input type='text' name='phone' />
            </div>
          </div>
        </div>
      </SignUpForm>
    </>
  );
}

export default SignForm;