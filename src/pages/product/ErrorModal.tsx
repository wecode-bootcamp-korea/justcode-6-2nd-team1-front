import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';

const StyledError = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: #00000050;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  div.container {
    width: 90%;
    background-color: white;
    padding: 14px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid lightgray;
      padding-bottom: 10px;
      width: 100%;
    }

    h4 {
      padding: 20px 0;
      text-align: center;
    }

    button {
      padding: 4px 10px;
      border: none;
      border-radius: 20px;
      background-color: #1a0101;
      color: white;
    }
  }
`;

interface ErrorModalProps {
  setErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
  errorModal: boolean;
}

const ErrorModal = ({ errorModal, setErrorModal }: ErrorModalProps) => {
  useEffect(() => {
    console.log('켜짐');
    const closeHandler = ({ target }: MouseEvent) => {
      if (errorModal) {
        if (target instanceof Element && (!target.closest('div.error') || target.closest('svg.closeIcon') || target.closest('button.close')) && target.closest('div.shadow')) {
          setErrorModal(false);
          console.log('꺼짐');
        }
      }
    };

    window.addEventListener('click', closeHandler);

    return () => window.removeEventListener('click', closeHandler);
  }, []);

  return (
    <StyledError className='shadow'>
      <div className='container error'>
        <p>
          알림 <GrClose className='closeIcon' />
        </p>
        <h4>토핑은 최대 2개까지 선택 가능합니다.</h4>
        <button className='close'>확인</button>
      </div>
    </StyledError>
  );
};

export default ErrorModal;
