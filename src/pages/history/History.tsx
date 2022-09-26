import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ErrorModal from '../../components/ErrorModal';
import Line from '../../components/Line';
import Spinner from '../../components/Spinner';
import useStore from '../../context/store';
import { OrderHistory } from '../../interface';
import theme from '../../theme';
import { stateFromId } from '../../utils/stateFromId';

const StyleHistory = styled.div`
  padding: 10px;

  h4 {
    font-size: 6vw;
  }

  div.upSide {
    display: flex;
    align-items: center;
  }

  div.option {
    margin-top: 20px;
    padding: 10px;
    background-color: ${theme.grey};

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
  const [modal, setModal] = useState(false);
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
        setModal(true);
      }
    })();
  }, []);

  return (
    <>
      {modal && <ErrorModal errorMessage='불러오는데 실패하였습니다.' errorModal={modal} setErrorModal={setModal} />}
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
                    <span>{Number(history.total_price).toLocaleString()}원</span>
                  </p>
                  <p></p>
                </div>
              </li>
            ))}
          </ul>
        </StyleHistory>
      ) : (
        !modal && <Spinner fixed={true} />
      )}
    </>
  );
};

export default History;
