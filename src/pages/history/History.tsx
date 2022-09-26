import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Line from '../../components/Line';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { OrderHistory } from '../../interface';
import theme from '../../theme';

const StyleHistory = styled.div`
  padding: 10px;

  h4 {
    font-size: 6vw;
  }

  div.imgContainer {
    aspect-ratio: 1 / 1;
    height: 30vw;
    display: flex;
    justify-content: center;

    img {
      height: 30vw;
    }
  }

  div.text {
    width: calc(100% - 30vw);
  }

  li {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;

    h5 {
      margin-bottom: 10px;
    }

    p {
      color: ${theme.red};
    }

    h6 {
      margin-top: 10px;
      font-size: 5vw;
    }
  }
`;

const History = () => {
  const { token } = useStore();
  const [historyList, setHistoryList] = useState<OrderHistory[]>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<OrderHistory[]>('http://localhost:8000/users/orderList', {
          headers: {
            Authorization: token,
          },
        });

        setHistoryList(data);
      } catch (error) {
        setHistoryList([
          {
            orderId: 87,
            beverage_name: '조선향米 쌀 밀크티 + 펄',
            beverage_image: 'https://www.gong-cha.co.kr/uploads/product/20220825/lcd4UXN97L6hbafW_20220825.jpg',
            amount: 1,
            total_price: '5300',
            order_status_id: 3,
            cold: 0,
            sugar: 30,
            ice: 'less',
            toppings: [
              {
                amount: 1,
                topping_id: 3,
              },
              {
                amount: 2,
                topping_id: 5,
              },
            ],
          },
          {
            orderId: 88,
            beverage_name: '조선향米 달콤 구수 스무디',
            beverage_image: 'https://www.gong-cha.co.kr/uploads/product/20220825/Nb2Bu3MrWzG79OFf_20220825.jpg',
            amount: 1,
            total_price: '5300',
            order_status_id: 3,
            cold: 0,
            sugar: 30,
            ice: 'less',
            toppings: [],
          },
        ]);
      }
    })();
  }, []);

  return (
    <>
      {historyList ? (
        <StyleHistory>
          <h4>주문 내역</h4>
          <Line />
          <ul>
            {historyList.map(history => (
              <li key={history.orderId}>
                <div className='imgContainer'>
                  <img src={history.beverage_image} alt={history.beverage_name} />
                </div>

                <div className='text'>
                  <h5>{history.beverage_name}</h5>
                  <p>{Number(history.total_price).toLocaleString()}원</p>
                  <h6>{history.order_status_id}</h6>
                </div>
              </li>
            ))}
          </ul>
        </StyleHistory>
      ) : (
        <Spinner fixed={true} />
      )}
    </>
  );
};

export default History;
