import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CancelModal from '../../components/CancelModal';
import ErrorModal from '../../components/ErrorModal';
import Line from '../../components/Line';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { OrderHistory } from '../../interface';
import theme from '../../theme';
import { stateFromId } from '../../utils/stateFromId';
import { toppingFromId } from '../../utils/toppingFromId';

const StyleHistory = styled.div`
  padding: 10px;

  h4 {
    font-size: 6vw;
  }

  div.upSide {
    display: flex;
    align-items: center;
    width: 100%;
  }

  div.option {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    background-color: ${theme.grey};
    border-bottom: 1px solid gray;

    p {
      display: flex;
      justify-content: space-between;
      color: black;

      span {
        color: ${theme.red};
      }
    }
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
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    padding-bottom: 10px;

    h5 {
      margin-bottom: 10px;
    }

    p {
      color: ${theme.red};
      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    h6 {
      margin-top: 10px;
      font-size: 5vw;
    }

    button {
      border: none;
      color: gray;
      background-color: white;
      margin-top: 10px;
    }
  }
`;

const History = () => {
  const { token } = useStore();
  const [errorModal, setErrorModal] = useState(false);
  const [historyList, setHistoryList] = useState<OrderHistory[]>();
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelItem, setCancelItem] = useState({
    id: 0,
    name: '',
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<OrderHistory[]>('http://localhost:8000/users/orderList', {
          headers: {
            Authorization: token,
          },
        });

        setHistoryList(data.reverse());
      } catch (error) {
        setErrorModal(true);
      }
    })();
  }, []);

  const cancelHandler = async () => {
    setDisabled(true);

    try {
      await axios.patch(
        `http://localhost:8000/beverages/order_cancel`,
        {
          id: cancelItem.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { data } = await axios.get<OrderHistory[]>('http://localhost:8000/users/orderList', {
        headers: {
          Authorization: token,
        },
      });

      setCancelModal(false);
      setHistoryList(data.reverse());
      setDisabled(false);
    } catch (error) {
      console.log(error);
      setCancelModal(false);
      setErrorModal(true);
      setDisabled(false);
    }
  };

  return (
    <>
      {cancelModal && <CancelModal setCancelModal={setCancelModal} cancelHandler={cancelHandler} disabled={disabled} cancelItem={cancelItem} />}
      {errorModal && <ErrorModal errorMessage='로그인을 확인해주세요.' errorModal={errorModal} setErrorModal={setErrorModal} />}
      {historyList ? (
        <StyleHistory>
          <h4>주문 내역</h4>
          <Line />
          <ul>
            {historyList.map(history => (
              <li key={history.orderId}>
                <div className='upSide'>
                  <div className='imgContainer'>
                    <img src={history.beverage_image} alt={history.beverage_name} />
                  </div>

                  <div className='text'>
                    <h5>{history.beverage_name}</h5>
                    <p>{Number(history.total_price).toLocaleString()}원</p>
                    <h6>{stateFromId(history.order_status_id)}</h6>
                  </div>
                </div>
                <div className='option'>
                  <p>
                    {history.cold ? 'ICE' : 'HOT'}/{history.sugar}%/
                    {history.ice
                      .split('')
                      .map((a, i) => (i === 0 ? a.toLocaleUpperCase() : a))
                      .join('') + ' Ice'}
                    <span>{(Number(history.total_price) - history.toppings.reduce((prev, cur) => prev + cur.amount * 500, 0)).toLocaleString()}원</span>
                  </p>
                  {!!history.toppings.length && (
                    <p>
                      {history.toppings.map(top => `${toppingFromId(top.topping_id)}${top.amount > 1 ? `${top.amount}개` : ''}`).join('/')}
                      <span>{history.toppings.reduce((prev, cur) => prev + cur.amount * 500, 0).toLocaleString()}원</span>
                    </p>
                  )}
                </div>
                {history.order_status_id !== 4 && (
                  <button
                    onClick={() => {
                      setCancelModal(true);
                      setCancelItem({
                        id: history.orderId,
                        name: history.beverage_name,
                      });
                    }}
                  >
                    주문 취소
                  </button>
                )}
              </li>
            ))}
          </ul>
        </StyleHistory>
      ) : (
        !errorModal && <Spinner fixed={true} />
      )}
    </>
  );
};

export default History;
