import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle, AiFillRightCircle, AiOutlineLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { AddCartReq, AddCartRes, AmountOption, CreateReviewReq, CreateReviewRes, OrderReq, OrderRes, ProductDetailInfo, ProductOption, Review, ReviewRes } from '../../interface';
import theme from '../../theme';
import Amount from './Amount';
import ErrorModal from '../../components/ErrorModal';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Pay from './pay/Pay';
import { sugarToRatio } from '../../utils/sugarToRatio';
import Spinner from '../../components/Spinner';
import useOption from '../../hooks/useOption';
import { StyledModal, StyledDiv, StyledBtnContainer } from './ProductDetailStyle';

const ProductDetail = () => {
  const { addCartHandler, additinalOption, cartDisabled, errorMessage, errorModal, id, info, isLogin, loading, minusHandler, option, setErrorMessage, setErrorModal, setOption, totalOption, token } = useOption();
  const [addPage, setAddPage] = useState(false);
  const navigate = useNavigate();

  const [orderRes, setOrderRes] = useState<OrderRes>();
  const [disabled, setDisabled] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [reviewList, setReviewList] = useState<Review[]>();

  const createReviewHandler = async () => {
    await axios.post<CreateReviewRes, AxiosResponse<CreateReviewRes>, CreateReviewReq>(
      `http://localhost:8000/beverages/review/${id}`,
      {
        content: inputValue,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  };

  const removeReviewHandler = async (review_id: number) => {
    await axios.delete(`http://localhost:8000/beverages/review/${review_id}`, {
      headers: {
        Authorization: token,
      },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: reviewRes } = await axios.get<ReviewRes>(`http://localhost:8000/beverages/review/${id}`);
        setReviewList(reviewRes.reviewData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const payHandler = async () => {
    if (info) {
      if (isLogin) {
        setDisabled(true);
        try {
          const req: OrderReq = {
            amount: option.amount,
            cold: option.isIce ? 1 : 0,
            ice: option.iceSize,
            sugar: option.sugar,
            takeOut: option.isTakeout ? 1 : 0,
            toppings: [
              {
                id: 3,
                amount: option.additionalOption.aloe,
              },
              {
                id: 6,
                amount: option.additionalOption.cheeseform,
              },
              {
                id: 4,
                amount: option.additionalOption.coconut,
              },
              {
                id: 5,
                amount: option.additionalOption.milkform,
              },
              {
                id: 1,
                amount: option.additionalOption.pearl,
              },
              {
                id: 2,
                amount: option.additionalOption.whitePearl,
              },
            ],
            totalPrice: (Number(info.detailData.price) + 500 * totalOption) * option.amount,
          };

          const { data } = await axios.post<OrderRes, AxiosResponse<OrderRes>, OrderReq>(`http://localhost:8000/beverages/order/${id}`, req, {
            headers: {
              Authorization: token,
            },
          });

          setOrderRes(data);
          navigate('./pay');
          setDisabled(false);
        } catch (error) {
          console.log(error);

          setErrorModal(true);
          setErrorMessage('인증 또는 통신에 실패하였습니다.');
          setDisabled(false);
        }
      } else {
        setErrorModal(true);
        setErrorMessage('로그인을 먼저 해주세요.');
      }
    }
  };

  if (loading || !info) {
    return (
      <>
        {errorModal && <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} errorMessage={errorMessage} />}
        <Spinner fixed={true} />
      </>
    );
  } else {
    return (
      <Routes>
        <Route
          path=''
          element={
            <>
              {errorModal && <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} errorMessage={errorMessage} />}
              <StyledModal addPage={addPage} opt={option}>
                <div className='container'>
                  <AiOutlineLeft size='10vw' onClick={() => setAddPage(false)} />
                  <div className='imgContainer'>
                    <img src={info.detailData.imageURL} alt={info.detailData.beverageName} />
                    <h4>{info.detailData.beverageName}</h4>
                    <p>{(Number(info.detailData.price) + totalOption * 500).toLocaleString()}</p>
                  </div>
                  <div className='optionContainer'>
                    <h3>토핑(Toppings)</h3>
                    {additinalOption.map(op => (
                      <Amount //
                        amount={op.amount}
                        name={op.name}
                        price={op.price}
                        minusHandler={op.minusHandler}
                        plusHandler={op.plusHandler}
                        key={op.name}
                      />
                    ))}
                  </div>
                  <div className='caution'>
                    <p>- 토핑은 최대 2종류, 2개까지 선택 가능합니다.</p>
                    <p>- 쥬얼리토핑 추가는 매장에서 가능합니다.</p>
                  </div>
                  <div className='btnContainer'>
                    <button
                      onClick={() =>
                        setOption({
                          ...option,
                          additionalOption: {
                            aloe: 0,
                            cheeseform: 0,
                            coconut: 0,
                            milkform: 0,
                            pearl: 0,
                            whitePearl: 0,
                          },
                        })
                      }
                    >
                      옵션 초기화
                    </button>
                    <button onClick={() => setAddPage(false)}>확인</button>
                  </div>
                </div>
              </StyledModal>
              <StyledDiv opt={option}>
                <div className='upSide'>
                  <div className='imgContainer'>
                    <img src={info.detailData.imageURL} alt={info.detailData.beverageName} />
                  </div>

                  <div className='container'>
                    <h3>{info.detailData.beverageName}</h3>
                    <p>{((Number(info.detailData.price) + totalOption * 500) * option.amount).toLocaleString()}원</p>
                    <div className='iceContainer'>
                      <button className='ice' onClick={() => setOption({ ...option, isIce: true })}>
                        ICED
                      </button>
                      <button className='hot' onClick={() => setOption({ ...option, isIce: false })}>
                        HOT
                      </button>
                    </div>
                  </div>
                </div>
                <div className='downSide'>
                  <div className='amount'>
                    <p>수량</p>
                    <div className='amountContainer'>
                      <AiFillMinusCircle
                        size='8vw'
                        color='#dddddd' //
                        onClick={minusHandler}
                      />
                      <p className='amount'>{option.amount}</p>
                      <AiFillPlusCircle
                        size='8vw'
                        color='#dddddd' //
                        onClick={() => setOption({ ...option, amount: option.amount + 1 })}
                      />
                    </div>
                  </div>
                  <div className='takeout'>
                    <p>테이크아웃</p>
                    <div className='takeoutContainer'>
                      <button onClick={() => setOption({ ...option, isTakeout: false })}>매장</button>
                      <button onClick={() => setOption({ ...option, isTakeout: true })}>포장</button>
                    </div>
                  </div>
                  <div className='size'>
                    <p>사이즈</p>
                    <div className='sizeContainer'>
                      <button onClick={() => setOption({ ...option, isJumbo: false })}>Large</button>
                      <button onClick={() => setOption({ ...option, isJumbo: true })}>Jumbo</button>
                    </div>
                  </div>
                  <div className='sugar'>
                    <p>당도</p>
                    <div className='sugarContainer'>
                      <div className='ratioContainer'>
                        <p>0%</p>
                        <p>30%</p>
                        <p>50%</p>
                        <p>70%</p>
                        <p>100%</p>
                      </div>
                      <div className='bar'>
                        <button onClick={() => setOption({ ...option, sugar: 0 })} />
                        <button onClick={() => setOption({ ...option, sugar: 30 })} />
                        <button onClick={() => setOption({ ...option, sugar: 50 })} />
                        <button onClick={() => setOption({ ...option, sugar: 70 })} />
                        <button onClick={() => setOption({ ...option, sugar: 100 })} />
                      </div>
                    </div>
                  </div>
                  <div className='ice'>
                    <p>얼음</p>
                    <div className='iceContainer'>
                      <button //
                        className={option.iceSize === 'less' ? 'select' : ''}
                        onClick={() => setOption({ ...option, iceSize: 'less' })}
                      >
                        Less Ice
                      </button>
                      <button //
                        className={option.iceSize === 'regular' ? 'select' : ''}
                        onClick={() => setOption({ ...option, iceSize: 'regular' })}
                      >
                        Regular Ice
                      </button>
                      <button //
                        className={option.iceSize === 'full' ? 'select' : ''}
                        onClick={() => setOption({ ...option, iceSize: 'full' })}
                      >
                        Full Ice
                      </button>
                    </div>
                  </div>
                  <div className='add'>
                    <p>추가옵션</p>
                    <AiFillRightCircle size='8vw' color='#aaaaaa' onClick={() => setAddPage(true)} />
                  </div>
                  <div className='des'>
                    <p className='desName'>결제 안내</p>
                    <p className='desc pay'>공차 MyTea 오더 구매 시 멤버십 적립만 가능하며, 제휴 혜택은 적용이 불가합니다.</p>
                    <p className='desc pay'>제휴혜택을 받길 원하실 경우 매장을 방문해 주세요.</p>
                    <p className='desName'>상품설명</p>
                    <p className='desc'>{info.detailData.description}</p>
                    <p className='desName'>영양정보</p>
                    <div className='nutritionContainer'>
                      <p className='name'>나트륨(mg)</p>
                      <p>{info.detailData.nutrition_data.sodium}</p>
                      <p className='name'>단백질(g)</p>
                      <p>{info.detailData.nutrition_data.protein}</p>
                      <p className='name'>당류(g)</p>
                      <p>{info.detailData.nutrition_data.sugar}</p>
                      <p className='name'>열량(kcal)</p>
                      <p>{info.detailData.nutrition_data.kcal}</p>
                      <p className='name'>카페인(mg)</p>
                      <p>{info.detailData.nutrition_data.caffein}</p>
                      <p className='name'>포화지방(g)</p>
                      <p>{info.detailData.nutrition_data.fat}</p>
                    </div>
                  </div>
                </div>
              </StyledDiv>
              <StyledBtnContainer>
                <div className='cartBtnContainer'>
                  <button onClick={addCartHandler} disabled={cartDisabled}>
                    {cartDisabled ? <Spinner /> : '장바구니'}
                  </button>
                </div>
                <button onClick={payHandler} disabled={disabled}>
                  {disabled ? <Spinner /> : '바로주문'}
                </button>
              </StyledBtnContainer>
            </>
          }
        />
        <Route path='/pay' element={<Pay orderRes={orderRes} />} />
      </Routes>
    );
  }
};

export default ProductDetail;
