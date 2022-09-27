import styled from 'styled-components';
import { Beverage } from '../../interface';
import theme from '../../theme';
import { toppingFromId } from '../../utils/toppingFromId';

const StyledList = styled.li`
  div.upSide {
    display: flex;
    align-items: center;

    div.imgContainer {
      padding: 10px;

      img {
        height: 20vw;
      }
    }

    p {
      color: ${theme.red};
    }
  }

  div.option {
    background-color: ${theme.grey};
    padding: 20px;

    p {
      display: flex;
      justify-content: space-between;
      font-size: 5vw;

      &:first-of-type {
        margin-top: 0;
      }
    }
  }
`;

interface OrderListProps {
  beverageData: Beverage;
}

const OrderList = ({ beverageData }: OrderListProps) => {
  return (
    <StyledList>
      <div className='upSide'>
        <div className='imgContainer'>
          <img src={beverageData.beverage_image} alt={beverageData.beverage_name} />
        </div>
        <div className='text'>
          <h5>{beverageData.beverage_name}</h5>
          <p>{((Number(beverageData.price) + beverageData.toppingData.reduce((prev, cur) => prev + cur.amount, 0) * 500) * beverageData.amount).toLocaleString()}원</p>
        </div>
      </div>
      <div className='option'>
        <p>
          <span>
            {beverageData.cold ? 'ICED' : 'HOT'}/{beverageData.sugar}% /
            {beverageData.ice
              .split('')
              .map((a, i) => (i === 0 ? a.toLocaleUpperCase() : a))
              .join('') + ' Ice'}
          </span>
          {Number(beverageData.price).toLocaleString()}원
        </p>
        {!!beverageData.toppingData.filter(data => data.amount).length && (
          <p>
            <span>
              {beverageData.toppingData
                .filter(data => data.amount)
                .map(top => top.topping_id)
                .map(id => toppingFromId(id))
                .join('/')}
            </span>
            {beverageData.toppingData
              .map(top => top.amount)
              .reduce((prev, cur) => prev + cur * 500, 0)
              .toLocaleString()}
            원
          </p>
        )}
        <p>
          <span>개수</span>
          {beverageData.amount}개
        </p>
      </div>
    </StyledList>
  );
};

export default OrderList;
