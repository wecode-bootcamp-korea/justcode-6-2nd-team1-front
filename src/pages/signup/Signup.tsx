import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiSmartphone } from "react-icons/gi";

import SignForm from "../../components/Signup/SignForm";
import AgreeList from "../../components/Signup/AgreeList";
import theme from "../../theme";

const Signup = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  if (page === 0) {
    return (
      <StyledSignUp>
        <div className="header">
          <span className="inColor">약관동의</span>
          <span>회원정보</span>
          <Line />
          <span>가입완료</span>
        </div>
        <AgreeList setPage={ setPage } />
      </StyledSignUp>
    );
  } else if (page === 1) {
    return (
      <StyledSignUp>
        <div className="header">
          <span className="fullColor">약관동의</span>
          <span className={page <= 1?'inColor':''}>회원정보</span>
          <span>가입완료</span>
        </div>

        <PhonePermission>
          <GiSmartphone />
          <button>휴대폰 본인 인증</button>
        </PhonePermission>

        <SignForm />
        
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
  } else {
    return <></>
  }
};

export default Signup;


const StyledSignUp = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  width: 100%;
  padding-bottom: 90px;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #eee;
    font-size: 13px;
    span {
      text-align: center;
      color: gray;
      width: 33%;
      padding: 25px;
    }
    .inColor {
      background-color: ${theme.red};
      color: white;
      border-radius: 0 40px 40px 0;
    }
    .fullColor {
      background-color: ${theme.red};
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
      background-color: ${theme.red};
      font-size: 20px;
      width: 70%;
      height: 60px;
      border-radius: 40px;
      border: none;
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
`;

export const AgreeBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:90%;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
  .checked {
    background-color:${theme.red};
    border:none;
    color:white;
  }
  button {
    margin: 50px 0 10px 0;
    width: 95%;
    height: 50px;
    background-color: inherit;
    color: black;
    border: 1px solid ${theme.grey};
    border-radius: 40px;
    font-size:16px;

  }
  span {
    color: grey;
    margin-top: 14px;
    font-size: 12px;
  }
`;

export const NextBtn = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  font-size: 20px;
  color: white;
  background-color: ${theme.red};
  border: none;
  &:disabled {
    opacity:0.6;
  }
`;

export const CheckList = styled.form`
  display: flex;
  width:90vw;
  flex-direction: column;
  align-items:flex-start;
  margin-top: 25px;
  input[type="checkbox"] {
    margin-right:10px;
  }
  span {
    margin-top:20px;
    display:flex;
    align-items:center;
    font-size: 14px;
  }
  .checkIcon {
    margin-right:4px;
    font-size:13px;
  }
`;

export const SignUpForm = styled.div`
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
        color: ${theme.grey};
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
          border:1px solid ${theme.grey};
        }
        button {
          margin: 5px 0;
          width: 40%;
          height: 40px;
          background-color: ${theme.grey};
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

const PhonePermission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0 10px 0;
  width: 80vw;
  height: 50px;
  background-color: white;
  border:1px solid ${theme.grey};
  border-radius: 40px;
  button {
    font-size: 16px;
    color: black;
    border: none;
    background-color: inherit;
  }
`;