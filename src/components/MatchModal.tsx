import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useStore from '../context/store';
import { GetLocationListRes, LocationReq, Store } from '../interface';
import Line from './Line';
import { BsArrowLeftRight } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import Spinner from './Spinner';

const StyledModal = styled.div<{ disabled: boolean }>`
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
    max-height: 50vh;
    background-color: white;
    padding: 14px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      width: 100%;
      padding-bottom: 20px;
      margin-bottom: ${({ disabled }) => (disabled ? '20px' : '0')};
      border-bottom: 1px solid black;
    }

    h3 {
      display: flex;
      gap: 10px;
      width: 100%;
      word-break: keep-all;
      line-height: 1.3;
      text-align: center;
    }

    h4 {
      margin-top: 10px;
      text-align: right;
    }

    ul {
      width: 100%;
      border-radius: 10px;
      overflow-y: scroll;

      li {
        padding: 10px 0;
        width: 100%;
        border-bottom: 1px solid gray;

        &:last-of-type {
          border: none;
        }
      }
    }
  }
`;

const MatchModal = () => {
  const { token, setIsMatch } = useStore();
  const [closestList, setClosestList] = useState<Store[]>();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setDisabled(true);
        setPosition({
          latitude,
          longitude,
        });

        try {
          const {
            data: { closestShops },
          } = await axios.get<GetLocationListRes>(`http://localhost:8000/users/user_location/${latitude}/${longitude}`, {
            headers: {
              Authorization: token,
            },
          });

          setClosestList(closestShops);
          setDisabled(false);
        } catch (error) {
          setError(true);
          setDisabled(false);
        }
      },
      () => {
        setError(true);
      }
    );
  }, []);

  const matchHandler = async (id: number) => {
    if (!disabled) {
      setDisabled(true);

      try {
        const { data } = await axios.patch<Store[], AxiosResponse<Store[]>, LocationReq>(
          'http://localhost:8000/users/user_location',
          {
            id,
            latitude: position.latitude,
            longitude: position.longitude,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setDisabled(false);
        setIsMatch(true, data[0].name);
      } catch (error) {
        setDisabled(false);
        console.log(error);
      }
    }
  };

  return (
    <StyledModal disabled={disabled}>
      <div className='container'>
        <h2>원하는 매장을 스크롤하여 선택하세요.</h2>
        {!error ? (
          closestList && !disabled ? (
            <ul>
              {closestList.map(store => (
                <li key={store.id} onClick={() => matchHandler(store.id)}>
                  <h3>
                    {store.name}
                    <AiOutlineSwapRight />
                  </h3>
                  <h4>{Math.ceil(store.distance * 100000) / 100}m</h4>
                </li>
              ))}
            </ul>
          ) : (
            <Spinner />
          )
        ) : (
          <>
            <h3>
              위치 정보에 동의하지 않았거나 통신에 실패하였습니다.
              <br />
            </h3>
            <h4>동의하신 후 새로고침 해주세요.</h4>
          </>
        )}
      </div>
    </StyledModal>
  );
};

export default MatchModal;
