import { GrClose } from 'react-icons/gr';
import { RiEmotionSadLine } from 'react-icons/ri';
import styled from 'styled-components';
import theme from '../theme';
import Spinner from './Spinner';

const StyledModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000050;
  left: 0;
  top: 0;
  z-index: 30;

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
      word-break: keep-all;
      line-height: 1.3;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    h5 {
      margin-top: 20px;
    }

    div.btnContainer {
      width: 100%;

      button {
        padding: 0 10px;
        border: none;
        width: 100%;
        height: calc(8vw + 20px);
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;

        &:first-of-type {
          margin-bottom: 10px;
        }

        &:last-of-type {
          border: 1px solid ${theme.red};
          background-color: ${theme.red};
          color: white;
        }

        &:disabled {
          background-color: gray;
          border: gray;
        }
      }
    }
  }
`;

interface CancelModalProps {
  setCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  cancelHandler: () => Promise<void>;
  disabled: boolean;
  cancelItem: {
    id: number;
    name: string;
  };
}

const CancelModal = ({ setCancelModal, cancelHandler, disabled, cancelItem }: CancelModalProps) => {
  return (
    <StyledModal>
      <div className='container'>
        <p>
          알림 <GrClose className='closeIcon' />
        </p>
        <h5>{cancelItem.name}</h5>
        <h4>
          정말로 취소하시겠습니까? <RiEmotionSadLine />
        </h4>

        <div className='btnContainer'>
          <button className='cancel' onClick={cancelHandler} disabled={disabled}>
            {disabled ? <Spinner /> : '취소할래요'}
          </button>
          <button className='noCancel' onClick={() => setCancelModal(false)} disabled={disabled}>
            {disabled ? <Spinner /> : '다시 생각해볼게요!'}
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default CancelModal;
