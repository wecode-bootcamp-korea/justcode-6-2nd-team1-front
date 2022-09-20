import styled from "styled-components";
import React, { useState } from "react";
import { GiSmartphone } from "react-icons/gi";

const StyledSignUp = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  width:100vw;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    width: 100vw;
    background-color: #eee;
    font-size:13px;
    span {
      text-align:center;
      color: gray;
      width:33vw;
      padding: 25px;
    }
    .inColor {
      background-color: #af3030;
      color: white;
      border-radius: 0 40px 40px 0;
    }
    .fullColor {
      background-color: #af3030;
      color:white;
    }
  }
  .nextBtn {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 60px;
    font-size: 20px;
    color: black;
    background-color: white;
    border: none;
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
    background-color: white;
    color: black;
    border: none;
    border-radius: 40px;
    font-size:16px;
  }
  span {
    color: grey;
    margin-top: 14px;
    font-size: 12px;
  }
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
  border-radius: 40px;
  button {
    font-size: 16px;
    color: black;
    border: none;
    background-color: inherit;
  }
`;
const Signup = () => {
  const [page, setPage] = useState(0);
  const [btn, setBtn] = useState(true);
  const [check, setCheck] = useState([0, 0, 0, 0]);

  const onClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      let target = e.target.value;
      console.log(target)
    }
  };
  function allBtn() {
    setCheck([1, 1, 1, 1]);
    btn ? setBtn(false) : setBtn(true);
  }
  
  

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
          <button onClick={allBtn}>전체동의</button>
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
        <button
          className={`nextBtn ${btn && "on"}`}
          onClick={() => setPage(1)}
        >
          다음
        </button>
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
      </StyledSignUp>
    );
  }
};

export default Signup;
