import styled from 'styled-components';
import { ProductOption } from '../../interface';
import theme from '../../theme';
import { sugarToRatio } from '../../utils/sugarToRatio';

export const StyledDiv = styled.div<{ opt: ProductOption }>`
  padding: 10px;

  div.upSide {
    display: flex;
    align-items: center;
    padding-bottom: 30px;

    div.imgContainer {
      display: flex;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin-left: 10px;

      img {
        height: 100%;
      }
    }

    div.container {
      margin-left: 10px;

      h3 {
        margin-bottom: 10px;
        font-size: 6vw;
      }

      p {
        color: ${theme.red};
        font-size: 6vw;
      }

      div.iceContainer {
        display: flex;
        gap: 5px;

        button {
          font-size: 5vw;
          margin-top: 20px;
          padding: 4px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          border-radius: 20px;
          background-color: white;
          transition: 0.2s;
          width: 20vw;

          &.ice {
            border: 1px solid #345beb;
            background-color: ${({ opt }) => (opt.isIce ? '#345beb' : '#ffffff')};
            color: ${({ opt }) => (opt.isIce ? '#ffffff' : '#345beb')};
          }

          &.hot {
            border: 1px solid ${theme.red};
            background-color: ${({ opt }) => (opt.isIce ? '#ffffff' : theme.red)};
            color: ${({ opt }) => (opt.isIce ? theme.red : '#ffffff')};
          }
        }
      }
    }
  }

  div.downSide {
    border-top: 2px solid #dddddd;
    padding-top: 20px;
    padding-bottom: 90px;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      &.add {
        padding-bottom: 60px;
        border-bottom: 1px solid #aaaaaa;
        margin-bottom: 20px;
      }

      &.des {
        display: block;

        p {
          margin-top: 20px;
          line-height: 1.3;

          &.desName {
            font-weight: 500;
          }

          &.desc {
            font-size: 5vw;
            color: gray;
          }

          &.pay {
            padding-left: 10px;
            line-height: 1.3;
            word-break: keep-all;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              left: 0;
              top: 2.6vw;
              height: 1px;
              width: 6px;
              background-color: black;
            }
          }
        }

        div.nutritionContainer {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 0px 0px;
          grid-template-areas:
            '. .'
            '. .'
            '. .'
            '. .'
            '. .'
            '. .';
          margin-top: 20px;
          border-right: 1px solid #dddddd;
          border-bottom: 1px solid #dddddd;

          p {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-left: 1px solid #dddddd;
            border-top: 1px solid #dddddd;

            &.name {
              background-color: #aaaaaa;
            }
          }
        }
      }

      p {
        font-size: 6vw;
      }

      div.amountContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(40vw + 10px);

        p.amount {
          color: ${theme.red};
        }
      }

      div.takeoutContainer {
        display: flex;
        gap: 10px;

        button {
          border: 2px solid #aaaaaa;
          border-radius: 30px;
          padding: 2px 0px;
          font-size: 5vw;
          background-color: white;
          color: #aaaaaa;
          font-weight: 500;
          transition: 0.2s;
          width: 20vw;

          &:nth-child(${({ opt }) => (opt.isTakeout ? '2' : '1')}) {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }

      div.sizeContainer {
        display: flex;
        gap: 10px;

        button {
          border: 2px solid #aaaaaa;
          border-radius: 30px;
          padding: 2px 0px;
          font-size: 5vw;
          background-color: white;
          color: #aaaaaa;
          font-weight: 500;
          transition: 0.2s;
          width: 20vw;

          &:nth-child(${({ opt }) => (opt.isJumbo ? '2' : '1')}) {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }

      div.sugarContainer {
        width: 70%;

        div.ratioContainer {
          display: flex;
          justify-content: space-between;
          width: 100%;

          p {
            font-size: 4vw;
          }
        }

        div.bar {
          display: flex;
          justify-content: space-between;
          width: calc(100% - 3vw);
          margin-top: 10px;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            bottom: calc(2.5vw - 1px);
            width: 100%;
            height: 2px;
            background-color: #dddddd;
          }

          button {
            border: none;
            border-radius: 20px;
            background-color: #dddddd;
            width: 5vw;
            height: 5vw;
            position: relative;
            transition: 0.2s;

            &:nth-child(${({ opt }) => sugarToRatio(opt.sugar)}) {
              background-color: ${theme.red};
            }
          }
        }
      }

      div.iceContainer {
        display: flex;
        justify-content: space-between;
        width: 72vw;

        button {
          font-size: 4.5vw;
          padding: 2px 6px;
          border: 2px solid #aaaaaa;
          border-radius: 20px;
          background-color: white;
          color: #aaaaaa;
          transition: 0.2s;

          &.select {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }
    }
  }
`;

export const StyledModal = styled.div<{ addPage: boolean; opt: ProductOption }>`
  position: fixed;
  z-index: 4;
  top: 20vw;
  padding: 10px 10px 0 10px;
  left: 100%;
  width: 100%;
  height: calc(100vh - 20vw);
  overflow-y: scroll;
  background-color: white;
  transform: translateX(${({ addPage }) => (addPage ? '-100%' : '0')});
  transition: 0.3s;
  filter: drop-shadow(0px 0px 10px ${({ addPage }) => (addPage ? '#00000030' : '#00000000')});

  div.container {
    position: relative;

    div.imgContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
      border-bottom: 2px solid lightgray;
      padding-bottom: 30px;

      img {
        height: 120px;
      }

      h4 {
        margin-top: 20px;
        font-size: 5vw;
      }

      p {
        margin-top: 10px;
        color: ${theme.red};
        font-size: 6vw;
      }
    }

    div.optionContainer {
      padding: 30px 0;

      h3 {
        margin-bottom: 20px;
        font-size: 4vw;
      }

      p {
        font-size: 4vw;
      }
    }

    div.caution {
      border-top: 1px solid #aaaaaa;
      padding-top: 50px;
      padding-bottom: 70px;
      position: relative;

      p {
        font-size: 4vw;
        margin-bottom: 10px;
      }
    }

    div.btnContainer {
      position: absolute;
      bottom: 0;
      left: -10px;
      width: calc(100% + 20px);

      button {
        width: 50%;
        border: none;
        color: white;
        font-size: 6vw;
        padding: 10px;

        &:nth-child(1) {
          background-color: #aaaaaa;
        }

        &:nth-child(2) {
          background-color: ${theme.red};
        }
      }
    }
  }
`;

export const StyledBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  div.cartBtnContainer {
    background-color: #aaaaaa;
    padding: 2px 4px;

    button {
      background-color: white;
      color: black;
      border-radius: 4px;

      &:disabled {
        background-color: #aaaaaa;
        color: gray;
      }
    }
  }

  button {
    width: 100%;
    border: none;
    background-color: ${theme.red};
    padding: 15px;
    color: white;
    font-size: 6vw;
    height: calc(8vw + 30px);

    &:disabled {
      background-color: #aaaaaa;
    }
  }
`;
