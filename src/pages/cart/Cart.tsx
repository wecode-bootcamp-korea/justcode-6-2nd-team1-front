import { AiOutlineCheck } from 'react-icons/ai';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';
import { CartItem } from '../../interface';
import theme from '../../theme';
import CartList from './CartList';

const StyledCart = styled.div<{ allChecked: boolean }>`
  padding: 10px 10px calc(6vw + 100px) 10px;

  h4 {
    font-size: 6vw;

    &.total {
      padding: 20px 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid gray;

      span {
        color: ${theme.red};
      }
    }
  }

  div.select {
    display: flex;
    justify-content: space-between;

    div.btnContainer {
      display: flex;
      align-items: center;
      gap: 10px;

      button {
        border: 1px solid gray;
        border-radius: 4px;
        background: white;
        padding: 2px 8px;
        font-size: 4vw;
      }

      svg {
        border: 1px solid gray;
        border-radius: 50%;
        padding: 1vw;
        background-color: ${({ allChecked }) => (allChecked ? 'gray' : 'white')};
        color: white;
      }
    }
  }

  ul {
    border-top: 1px solid gray;
    margin-top: 20px;
  }
`;

const StyledBtn = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(8vw + 20px);
  background-color: ${theme.red};
  color: white;
  font-size: 6vw;
  border: none;
  padding: 10px;

  &:disabled {
    background-color: #aaaaaa;
  }
`;

interface CartProps {
  cartList: CartItem[];
  selectList: number[];
  allCheckHandler: () => void;
  orderHandler: () => void;
  disabled: boolean;
  setSelectList: React.Dispatch<React.SetStateAction<number[]>>;
}

const Cart = ({ cartList, selectList, allCheckHandler, disabled, orderHandler, setSelectList }: CartProps) => {
  return (
    <>
      <StyledCart allChecked={cartList.every(cartItem => selectList.includes(cartItem.orderId))}>
        <div className='select'>
          <h4>음료({cartList.length})</h4>
          <div className='btnContainer' onClick={allCheckHandler}>
            <AiOutlineCheck size='5vw' />
            <h2>전체선택</h2>
          </div>
        </div>
        <ul>
          {cartList.map(cartItem => (
            <CartList key={cartItem.orderId} cartItem={cartItem} setSelectList={setSelectList} selectList={selectList} />
          ))}
        </ul>
        <h4 className='total'>
          최종 결제 금액
          <span>
            {cartList //
              .filter(cartItem => selectList.includes(cartItem.orderId))
              .reduce((prev, cur) => prev + (Number(cur.price) + cur.toppingData.reduce((a, top) => a + top.amount, 0) * 500) * cur.orderAmount, 0)
              .toLocaleString()}
            원
          </span>
        </h4>
      </StyledCart>
      <StyledBtn disabled={disabled} onClick={orderHandler}>
        {disabled ? <Spinner /> : '주문하기'}
      </StyledBtn>
    </>
  );
};
export default Cart;
