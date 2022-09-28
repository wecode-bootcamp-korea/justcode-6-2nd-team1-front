import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import useOption from '../../hooks/useOption';
import { CreateReviewReq, CreateReviewRes, Review, ReviewRes } from '../../interface';
import { ImStarFull } from 'react-icons/im';
import theme from '../../theme';
import useStore from '../../context/store';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal';
import Spinner from '../../components/Spinner';

const Container = styled.div`
  width: 100%;
  background-color: #e4dcd2;
  padding: 10px 10px 130px 10px;

  div.title {
    width: 22%;
    margin-bottom: 10px;

    h1 {
      color: ${theme.red};
      font-size: 6vw;
      font-weight: 700;
    }
  }

  div.list {
    width: 100%;
    margin-bottom: 10px;

    li {
      padding: 10px 0;
      line-height: 4vh;
      list-style: none;
      border-bottom: 1px solid gray;

      span.score {
        font-size: 4vw;
      }

      span.nickname {
        font-size: 5vw;
      }
      span.content {
        font-size: 4vw;
      }
      span.date {
        display: block;
        font-size: 3vw;
        text-align: right;
      }

      form {
        display: flex;
        justify-content: flex-end;
      }

      button.deleteButton {
        background-color: transparent;
        color: gray;
        font-size: 4vw;
        text-align: right;
        border: none;
      }
    }
  }

  div.inputContainer {
    width: 100%;
    display: flex;
    flex-direction: column;

    span {
      font-size: 4vw;
      margin-bottom: 10px;
    }

    div.box {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.reviewInput {
      display: inline-block;
      width: 100%;
      align-items: center;

      input {
        width: 100%;
        border: none;
        font-size: 6vw;
        padding: 10px;
      }

      button {
        width: 100%;
        border: none;
        font-size: 6vw;
        margin: 0;
        padding: 10px;
        background-color: ${theme.red};
        color: white;

        &:disabled {
          background-color: gray;
        }
      }
    }
  }

  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  div.inputBox {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  svg {
    color: gray;
    cursor: pointer;
    margin-bottom: 10px;

    &.clicked {
      color: ${theme.red};
    }
  }
`;

const Reviews = () => {
  const { token } = useStore();
  const { id } = useParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [startScore, setStarScore] = useState<number>(0);
  const [reviewList, setReviewList] = useState<Review[]>();
  const [errorModal, setErrorModal] = useState(false);
  const [message, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);

        setReviewList(reviewRes.reviewData);
      } catch (error) {
        console.log(error);
        setErrorModal(true);
      }
    })();
  }, []);

  const createReviewHandler = async () => {
    if (!id || !inputValue) return;

    try {
      setDisabled(true);
      await axios.post<CreateReviewRes, AxiosResponse<CreateReviewRes>, CreateReviewReq>(
        `http://localhost:8000/beverages/review/${id}`,
        {
          content: inputValue,
          score: startScore + 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);
      setReviewList(reviewRes.reviewData);
      setInputValue('');
      inputRef.current && (inputRef.current.value = '');

      setDisabled(false);
    } catch (error) {
      setErrorModal(true);
      console.log(error);
      setDisabled(false);
      setErrorMessage('구매한 사람만 등록할 수 있습니다.');
      setInputValue('');
      inputRef.current && (inputRef.current.value = '');
    }
  };

  const removeReviewHandler = async (review_id: number) => {
    setDisabled(true);
    try {
      await axios.delete(`http://localhost:8000/beverages/review/${review_id}`, {
        headers: {
          Authorization: token,
        },
      });
      const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);
      setReviewList(reviewRes.reviewData);
      setDisabled(false);
    } catch (error) {
      setErrorModal(true);
      setErrorMessage('실패.');
      console.log(error);
      setDisabled(false);
    }
  };

  return (
    <>
      {errorModal && <ErrorModal errorMessage={message} errorModal={errorModal} setErrorModal={setErrorModal} />}
      <Container>
        <div className='title'>
          <h1>리뷰</h1>
        </div>
        <div className='list'>
          {reviewList?.map(data => {
            return (
              <li key={data.id}>
                <span className='nickname'>{data.nickname || '익명'} </span>
                <span className='score'>{data.score}점</span>
                <div>
                  <span className='content'>{data.content}&nbsp;</span>
                </div>
                <span className='date'>{data.created_at || '2022-01-01'}</span>
                <form onSubmit={e => e.preventDefault()}>
                  <button className='deleteButton' onClick={() => removeReviewHandler(data.id)} disabled={disabled}>
                    {disabled ? <Spinner /> : '삭제'}
                  </button>
                </form>
              </li>
            );
          })}
        </div>
        <div className='inputContainer'>
          <span>별점 및 리뷰를 입력해주세요.</span>
          <div className='box'>
            <Stars>
              {[...Array(5).keys()].map(num => (
                <ImStarFull key={num} onClick={() => setStarScore(num)} className={startScore >= num ? 'clicked' : ''} size='5vw' />
              ))}
            </Stars>
          </div>
          <div className='reviewInput'>
            <form onSubmit={e => e.preventDefault()}>
              <div className='inputBox'>
                <input type='text' placeholder='리뷰를 입력하세요' onChange={e => setInputValue(e.target.value)} ref={inputRef} />
                <button onClick={createReviewHandler} disabled={disabled}>
                  {disabled ? <Spinner /> : '확인'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Reviews;
