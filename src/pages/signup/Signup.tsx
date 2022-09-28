import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiSmartphone } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import SignForm from '../../components/signup/SignForm';
import AgreeList from '../../components/signup/AgreeList';
import Header from '../../components/signup/header';
import theme from '../../theme';
import { StyledModal } from '../product/pay/Pay';

const Signup = () => {
  const [modal, setModal] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const closeHandler: React.MouseEventHandler<HTMLDivElement> = ({ target }) => {
    if (target instanceof Element && target.closest('div.modalShadow')) {
      if (target.closest('button.close') || target.closest('svg.close')) {
        setModal(false);
      } else if (!target.closest('div.container')) {
        setModal(false);
      }
    }
  };
  if (page === 0) {
    return (
      <StyledSignUp>
        <Header page={page} />
        <AgreeList setPage={setPage} />
      </StyledSignUp>
    );
  } else if (page === 1) {
    return (
      <StyledSignUp>
        <Header page={page} />
        <PhonePermission>
          <GiSmartphone />
          <button>휴대폰 본인 인증</button>
        </PhonePermission>
        <SignForm setPage={setPage} />
      </StyledSignUp>
    );
  } else if (page === 2) {
    return (
      <StyledSignUp>
        <Header page={page} />
        <div className='toLogin'>
          <span>회원가입이 완료되었습니다!</span>
          <button onClick={() => navigate('/login')}>로그인 화면으로 가기</button>
        </div>
        {modal && (
          <StyledModal onClick={closeHandler} className='modalShadow'>
            <div className='container'>
              <p>
                알림 <GrClose className='close' />
              </p>
              <h4>
                회원가입 기념 30,000 포인트가
                <br /> 지급되었습니다!
              </h4>
              <button className='close'>확인</button>
            </div>
          </StyledModal>
        )}
      </StyledSignUp>
    );
  } else {
    return <></>;
  }
};

export default Signup;

//styled.Components

const StyledSignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 90px;
  font-family: 'Noto Sans KR', sans-serif;
  .header {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #eee;
    font-size: 13px;
    span {
      width: 33%;
      padding: 25px;
      text-align: center;
      color: gray;
    }
    .inColor {
      background-color: ${theme.red};
      border-radius: 0 40px 40px 0;
      color: white;
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
      width: 110%;
      height: 60px;
      margin-top: 50px;
      background-color: ${theme.red};
      border-radius: 40px;
      border: none;
      font-size: 20px;
      color: white;
    }
    span {
      margin: 5px 0;
    }
  }
  .on {
    opacity: 0.6;
  }
`;

// const Line = styled.div`
//   height: 17px;
//   margin: 25px 2px 0 0;
//   border-right: 1px solid gray;
// `;

export const AgreeBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
  .checked {
    background-color: ${theme.red};
    border: none;
    color: white;
  }
  button {
    width: 95%;
    height: 50px;
    margin: 50px 0 10px 0;
    background-color: inherit;
    border: 1px solid ${theme.grey};
    border-radius: 40px;
    font-size: 16px;
    color: black;
  }
  span {
    margin-top: 14px;
    color: grey;
    font-size: 12px;
  }
`;

export const NextBtn = styled.button`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background-color: ${theme.red};
  border: none;
  font-size: 20px;
  color: white;
  &:disabled {
    background-color: ${theme.grey};
    color: grey;
  }
`;

export const CheckList = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  margin-top: 25px;
  input[type='checkbox'] {
    margin-right: 10px;
  }
  span {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
  }
  .checkIcon {
    margin-right: 4px;
    font-size: 13px;
  }
`;

export const SignUpDiv = styled.div`
  .head {
    width: 95%;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid grey;
    font-size: 17px;
  }

  div {
    .title {
      display: flex;
      justify-content: space-between;
      width: 90vw;
      margin-top: 10px;
      padding: 0 2px;
      font-size: 12px;
      span {
        margin-top: 10px;
        color: grey;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 60vw;
        .btnCheck {
          background-color: ${theme.red};
          color: white;
        }
        .failColor {
          color: #a71e1eed;
        }
        .border {
          border: 3px solid #a71e1eed;
        }
        input {
          width: 90%;
          height: 40px;
          margin-left: 5px;
          border-radius: 10px;
          border: 1px solid grey;
        }
        .button {
          margin: 5px 0 5px 5px;
          width: 40%;
          height: 40px;
          background-color: grey;
          border: none;
          border-radius: 10px;
          line-height: 40px;
          text-align: center;
          color: white;
        }
        p {
          margin: 5px 0 5px 5px;
          color: #a71e1eed;
        }

        span {
          margin-left: 10px;
          width: 90%;
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
  width: 80vw;
  height: 50px;
  margin: 50px 0 10px 0;
  background-color: white;
  border: 1px solid ${theme.grey};
  border-radius: 40px;
  button {
    background-color: inherit;
    border: none;
    font-size: 16px;
    color: black;
  }
`;
