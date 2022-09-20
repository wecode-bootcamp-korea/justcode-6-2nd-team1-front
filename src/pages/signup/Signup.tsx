import styled from "styled-components";
import React, { useState } from "react";
import { GiSmartphone } from "react-icons/gi";
import { Navigate, useNavigate } from "react-router-dom";

const StyledSignUp = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  width: 100vw;
  padding-bottom: 90px;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    width: 100vw;
    background-color: #eee;
    font-size: 13px;
    span {
      text-align: center;
      color: gray;
      width: 33vw;
      padding: 25px;
    }
    .inColor {
      background-color: #af3030;
      color: white;
      border-radius: 0 40px 40px 0;
    }
    .fullColor {
      background-color: #af3030;
      color: white;
    }
  }
  .toLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    button {
      margin-top: 50px;
      background-color: #af3030;
      font-size: 20px;
      width: 70vw;
      height: 60px;
      border: 1px solid grey;
      border-radius: 40px;
      color: white;
    }
  }
  .on {
    opacity: 0.6;
  }
`;

const Line = styled.div`
  margin: 25px 2px 0 0;
  height: 17px;
  border-right: 1px solid gray;
  background-color:inherit;
`;

const AgreeBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:90%;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
  button {
    margin: 50px 0 10px 0;
    width: 95%;
    height: 50px;
    background-color: inherit;
    color: black;
    border: 1px solid grey;
    border-radius: 40px;
    font-size:16px;
  }
  span {
    color: grey;
    margin-top: 14px;
    font-size: 12px;
  }
`;

const NextBtn = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  font-size: 20px;
  color: white;
  background-color: #af3030;
  border: none;
`;


const CheckList = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  input[type="checkbox"] {
    margin-right:10px;
  }
`;
const PhonePermission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 10px 0;
  width: 80vw;
  height: 50px;
  background-color: white;
  border:1px solid grey;
  border-radius: 40px;
  button {
    font-size: 16px;
    color: black;
    border: none;
    background-color: inherit;
  }
`;
const SignUpForm = styled.div`
  .head {
    font-size: 17px;
    margin-top: 30px;
    padding-bottom: 20px;
    width: 80vw;
    border-bottom: 2px solid grey;
  }
  form {
    .title {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 4px;
      span {
        color: grey;
        margin-top: 10px;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 60vw;

        input {
          width: 100%;
          height: 40px;
          border-radius: 10px;
        }
        button {
          margin: 5px 0;
          width: 40%;
          height: 40px;
          background-color: grey;
          color: white;
          border: none;
          border-radius: 10px;
        }
        span {
          font-size: 10px;
        }
      }
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [btn, setBtn] = useState(false);
  const [check, setCheck] = useState([0, 0, 0, 0]);

  const onClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      let target = e.target.value;
      console.log(target)
    }
  };
  
  

  if (page === 0) {
    return (
      <StyledSignUp>
        <div className="header">
          <span className="inColor">약관동의</span>
          <span>회원정보</span>
          <Line />
          <span>가입완료</span>
        </div>

        <AgreeBtn>
          <button>전체동의</button>
          <span>선택 동의 사항이 포함되어 있습니다.</span>
          <span>만 14세 이상만 가입 가능합니다.</span>
        </AgreeBtn>
        <CheckList>
          <label>
            
            공차 멤버십 회원 이용약관 동의 (필수)
          </label>

          <label>
            
            개인정보 수집 및 이용 동의 (필수)
          </label>

          <label>
          
            위치기반 서비스 이용약관 동의 (선택)
          </label>

          <label>
            마케팅 수신 동의 (선택)
          </label>
        </CheckList>
        <NextBtn onClick={()=>setPage(1)}>다음</NextBtn>
      </StyledSignUp>
    );
  } else if (page === 1) {
    return (
      <StyledSignUp>
        <div className="header">
          <span className="fullColor">약관동의</span>
          <span className="inColor">회원정보</span>
          <span>가입완료</span>
        </div>

        <PhonePermission>
          <GiSmartphone />
          <button>휴대폰 본인 인증</button>
        </PhonePermission>

        <SignUpForm>
          <div className="head">
            <span>아이디 설정</span>
          </div>
          <form>
            <div className="title">
              <span>이메일</span>
              <div className="content">
                <input />
                <button>중복확인</button>
              </div>
            </div>
            <div className="title">
              <span>비밀번호</span>
              <div className="content">
                <input type="password" />
                <span>
                  비밀번호는 영문, 숫자를 혼합하여 8~20자 이내로 입력하세요.
                </span>
              </div>
            </div>
            <div className="title">
              <span type="password">비밀번호 확인</span>
              <div className="content">
                <input />
              </div>
            </div>
          </form>
        </SignUpForm>
        <SignUpForm>
          <div className="head">
            <span>닉네임 설정</span>
          </div>
          <form>
            <div className="title">
              <span>닉네임</span>
              <div className="content">
                <input />
              </div>
            </div>
          </form>
        </SignUpForm>
        <SignUpForm>
          <div className="head">
            <span>회원 정보</span>
          </div>
          <form>
            <div className="title">
              <span>이름</span>
              <div className="content">
                <input />
              </div>
            </div>
            <div className="title">
              <span>휴대폰 번호</span>
              <div className="content">
                <input />
              </div>
            </div>
          </form>
        </SignUpForm>
        <NextBtn onClick={() => setPage(2)}>다음</NextBtn>
      </StyledSignUp>
    );
  } else if (page === 2) {
    return (
      <StyledSignUp>
        <div className="header">
          <span className="fullColor">약관동의</span>
          <span className="fullColor">회원정보</span>
          <span className="fullColor">가입완료</span>
        </div>
        <div className="toLogin">
          <span>가입이 완료되었습니다!</span>
          <button onClick={()=>navigate('/login')}>로그인 화면으로 가기</button>
        </div>  
      </StyledSignUp>
    )
    
  }
};

export default Signup;
