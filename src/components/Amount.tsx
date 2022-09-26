import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import styled from 'styled-components';

const StyledAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  div.textContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;
  }

  div.amountContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 48%;
  }
`;

interface AmountProps {
  name: string;
  price?: string;
  amount: number;
  minusHandler: () => void;
  plusHandler: () => void;
  color?: string;
}

const Amount = ({ amount, name, price, minusHandler, plusHandler, color }: AmountProps) => {
  return (
    <StyledAmount>
      <div className='textContainer'>
        <p>{name}</p>
        {!!price && <p>{price}</p>}
      </div>
      <div className='amountContainer'>
        <AiFillLeftCircle
          size='10vw' //
          color={color ? color : '#aaaaaa'}
          onClick={minusHandler}
        />
        <p>{amount}</p>
        <AiFillRightCircle //
          size='10vw'
          color={color ? color : '#aaaaaa'}
          onClick={plusHandler}
        />
      </div>
    </StyledAmount>
  );
};
export default Amount;
