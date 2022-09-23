import React, { useState, useEffect, useRef, PropsWithChildren } from 'react';
import styled from 'styled-components';
import theme from '../../theme';
import Location from './Location';
import { Storetype } from './Store';

const StyledModal = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;

  div.modal {
    position: absolute;
    width: 85%;
    height: 500px;
    background-color: ${theme.red};
    left: 50%;
    top: 50%;
    padding: 15px;
    transform: translate(-50%, -50%);
    z-index: 100;

    div.name {
      margin: 10px;
      img {
        width: 65px;
      }

      span.title {
        color: white;
        font-size: 25px;
        margin-left: 10px;
      }
      button {
        width: 30px;
        height: 30px;
        color: white;
        background-color: transparent;
        float: right;
        margin-top: 0;
        border: none;

        span {
          font-size: 20px;
        }
      }
    }
    div.map {
      height: 200px;
      background-color: gray;
      margin: 10px;
    }
    table.adress {
      display: flexbox;
      height: 200px;
      background-color: white;
      margin: 10px;
      border-collapse: separate;
      border-spacing: 0 20px;

      tr {
        height: 30px;

        th {
          width: 20%;
          font-size: 13px;
          font-weight: bold;
          margin-right: 10px;
          line-height: 30px;
        }

        td {
          width: 80%;

          margin-right: 10px;
          padding: 10px;
          font-size: 12px;
        }
      }
    }
  }
`;

interface ModalDefaultType {
  onClickModal: (a: { id: number; title: string; address: string; states: string }) => void;
  addressList: Storetype[];
  title: string;
  address: string;
  states: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ onClickModal, setModal, addressList, states, title, address }: ModalDefaultType) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <StyledModal>
      <div className='container'>
        <div className='modal'>
          <div className='name'>
            <img src='http://www.gong-cha.co.kr/view/m/images/common/icon_new_p.png' />

            <span className='title'>{title}</span>
            <button onClick={() => setModal(false)}>
              <span>X</span>
            </button>
          </div>
          <div className='map'>
            <Location />
          </div>
          <table className='adress'>
            <thead>
              <tr>
                <th>지역</th>
                <td>{states}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>주소</th>
                <td>{address}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>영업시간</th>
                <td>7:00~23:00 / 마이티오더 운영 시간: 08:00~22:00</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
