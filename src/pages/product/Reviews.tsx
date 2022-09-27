import styled from 'styled-components';
import mockreview from '../../../public/data/mockreviews.json';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useReducer, useState } from 'react';
import useOption from '../../hooks/useOption';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { AddCartReq, AddCartRes, AmountOption, CreateReviewReq, CreateReviewRes, OrderReq, OrderRes, ProductDetailInfo, ProductOption, Review, ReviewRes } from '../../interface';
import { ImStarFull } from 'react-icons/im';
import theme from '../../theme';

const Container = styled.div`
  width: 100%;
  background-color: #e4dcd2;
  padding: 10px 10px 130px 10px;

  div.title {
    width: 22%;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;

    h1 {
      font-size: 6vw;
    }
  }

  div.list {
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    li {
      line-height: 4vh;

      form {
        display: inline-block;
      }
      span.score {
        font-size: 4vw;
      }

      span.nickname {
        font-size: 5vw;
      }
      span.content {
        font-size: 4vw;
        margin-left: 20px;
      }
      span.date {
        font-size: 3vw;
      }

      button.deleteButton {
        font-size: 4vw;
        margin-left: 10px;
        border: none;
      }
    }
  }

  div.inputContainer {
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;

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
      width: 90%;
      align-items: center;

      input {
        width: 80%;
        height: 6vh;
        border: none;
      }

      button {
        color: white;
        width: 20%;
        height: 6vh;
        border: none;
        background-color: ${theme.red};
      }
    }
  }
`;

const Stars = styled.div`
  display: flex;
  width: 30%;
  margin-top: 10px;
  align-items: center;

  & svg {
    width: 40%;
    height: 40%;
    color: gray;
    cursor: pointer;
    margin-bottom: 10px;
  }

  :hover svg {
    color: ${theme.red};
  }
  & svg:hover ~ svg {
    color: gray;
  }
  &svg:focus {
    color: ${theme.red};
  }
  &svg:checked ~ svg {
    color: ${theme.red};
  }
`;

const Reviews = () => {
  const { addCartHandler, additinalOption, cartDisabled, errorMessage, errorModal, id, info, isLogin, loading, minusHandler, option, setErrorMessage, setErrorModal, setOption, totalOption, token } = useOption();
  const [inputValue, setInputValue] = useState<string>('');
  const [startScore, setStarScore] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [starColor, setStarcolor] = useState<string>('gray');
  const [reviewList, setReviewList] = useState<Review[]>();
  const [clicked, setClicked] = useState<boolean[]>([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  //별클릭에 따라 점수 구현
  const handleStarClick = (index: any) => {
    const clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setStarcolor('red');
  };
  //리뷰 get
  useEffect(() => {
    (async () => {
      try {
        const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);
        // const { data: reviewRes } = await axios.get<ReviewRes>('./data/mockreviews.json');
        setReviewList(reviewRes.reviewData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  //리뷰 post
  // const createReviewHandler = (e: any) => {
  //   e.preventDefault();
  //   const score = clicked.filter(Boolean).length;
  //   const body = {
  //     id,
  //     inputValue,
  //     score,
  //   };
  //   console.log(body);
  //   fetch('./data/mockreviews.json', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: token,
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       loader();
  //     });
  //   setInputValue('');
  //   sendStar();

  // const copyreviewList = [...reviewList];
  // copyreviewList.push(inputValue);
  // setReviewList(copyreviewList);
  // setInputValue('');

  //리뷰 포스트
  const createReviewHandler = async (e: any) => {
    if (!id || !inputValue) return;
    e.preventDefault();
    const score = clicked.filter(Boolean).length;
    const newComment = {
      id: Number(id),
      nickname: nickname,
      score: score,
      content: inputValue,
      created_at: new Date().toLocaleString(),
    };

    await axios.post<CreateReviewRes, AxiosResponse<CreateReviewRes>, CreateReviewReq>(
      // './data/mockreviews.json',
      `http://localhost:8000/beverages/review/${id}`,
      {
        content: inputValue,
        score: score,
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
  };

  const handleInput = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  //리뷰 get
  // const loader = () => {
  //   fetch('./data/mockreviews.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       setReviewList(data.reviewData);
  //       console.log(reviewList);
  //     });
  // };

  // useEffect(() => {
  //   loader();
  // }, []);

  //리뷰 삭제
  const removeReviewHandler = async (review_id: number) => {
    await axios.delete(`http://localhost:8000/beverages/review/${review_id}`, {
      // await axios.delete('./data/mockreviews.json', {
      headers: {
        Authorization: token,
      },
    });
    const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);

    setReviewList(reviewRes.reviewData);
    console.log(reviewRes.reviewData);
  };

  return (
    <Container>
      <div className='title'>
        <h1>REVIEW</h1>
      </div>
      <div className='list'>
        {reviewList?.map(data => {
          return (
            <li key={data.id}>
              <span className='nickname'>
                {data.nickname || '익명'}
                :&nbsp;
              </span>
              <span className='score'>{data.score}점</span>
              <form
                onSubmit={e => {
                  e.preventDefault();
                }}
              >
                <button
                  className='deleteButton'
                  onClick={e => {
                    removeReviewHandler(data.id);
                  }}
                >
                  {' '}
                  삭제
                </button>
              </form>
              <div>
                <span className='content'>{data.content}&nbsp;</span>
                <span className='date'>{data.created_at || '2022-01-01'}</span>
              </div>
            </li>
          );
        })}
      </div>
      <div className='inputContainer'>
        <span>별점 및 리뷰를 입력해주세요.</span>
        <div className='box'>
          <Stars>
            {array.map(el => {
              return <ImStarFull key={el} onClick={() => handleStarClick(el)} />;
            })}
          </Stars>
        </div>
        <div className='reviewInput'>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input type='text' value={inputValue} placeholder='리뷰를 입력하세요' onChange={handleInput}></input>
            <button onClick={createReviewHandler}>확인</button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Reviews;
