import styled from "styled-components";

const StyledSignUp = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #eee;
    span {
      color:gray;
      width: 33%;
      padding: 25px;
    }
    .inColor {
      background-color: #af3030;
      color:white;
      border-radius:0 40px 40px 0;
    }
  }
  .nextBtn {
    position:fixed;
    bottom:0px;
    width:100%;
    height:60px;
    font-size: 20px;
    color: black;
    background-color:white;
    border:none;
  }
`;



const Line = styled.div`
  margin: 25px 2px 0 0;
  height: 17px;
  border-right: 1px solid gray;
`;

const AgreeBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
  button {
    margin: 50px 0 10px 0;
    width: 340px;
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
  label {
    padding-left: 8px; 
  }
  .check {
    margin-top: 12px;
  }
`;
const Signup = () => {
  return (
    <StyledSignUp>
      <div className="header">
        <span className="inColor">약관동의</span>
        <span>회원정보</span>
        <Line></Line>
        <span>가입완료</span>
      </div>
      <AgreeBtn>
        <button>전체동의</button>
        <span>선택 동의 사항이 포함되어 있습니다.</span>
        <span>만 14세 이상만 가입 가능합니다.</span>
      </AgreeBtn>
      <CheckList>
        <div className="check">
          <input type="checkbox" />
          <label>공차 멤버십 회원 이용약관 동의 (필수)</label>
        </div>

        <div className="check">
          <input type="checkbox" />
          <label>개인정보 수집 및 이용 동의 (필수)</label>
        </div>

        <div className="check">
          <input type="checkbox" />
          <label>위치기반 서비스 이용약관 동의 (선택)</label>
        </div>

        <div className="check">
          <input type="checkbox" />
          <label>마케팅 수신 동의 (선택)</label>
        </div>
      </CheckList>
      <button className="nextBtn">다음</button>
    </StyledSignUp>
  );
};

export default Signup;
