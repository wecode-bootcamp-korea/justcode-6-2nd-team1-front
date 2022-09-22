import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiFillMinusCircle, AiFillPlusCircle, AiFillRightCircle, AiOutlineLeft } from 'react-icons/ai';
import styled from 'styled-components';
import { ProductDetailInfo, ProductOption } from '../../interface';
import theme from '../../theme';
import Amount from './Amount';
import { GrClose } from 'react-icons/gr';
import ErrorModal from './ErrorModal';

const sugarRatio = {
  0: 1,
  30: 2,
  50: 3,
  70: 4,
  100: 5,
};

const StyledDiv = styled.div<{ opt: ProductOption }>`
  padding: 10px;

  div.upSide {
    display: flex;
    align-items: center;
    padding-bottom: 30px;

    div.imgContainer {
      display: flex;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin-left: 10px;

      img {
        height: 100%;
      }
    }

    div.container {
      margin-left: 10px;

      h3 {
        margin-bottom: 10px;
        font-size: 6vw;
      }

      p {
        color: ${theme.red};
        font-size: 6vw;
      }

      div.iceContainer {
        display: flex;
        gap: 5px;

        button {
          font-size: 5vw;
          margin-top: 20px;
          padding: 4px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          border-radius: 20px;
          background-color: white;
          transition: 0.2s;
          width: 20vw;

          &.ice {
            border: 1px solid #345beb;
            background-color: ${({ opt }) => (opt.isIce ? '#345beb' : '#ffffff')};
            color: ${({ opt }) => (opt.isIce ? '#ffffff' : '#345beb')};
          }

          &.hot {
            border: 1px solid ${theme.red};
            background-color: ${({ opt }) => (opt.isIce ? '#ffffff' : theme.red)};
            color: ${({ opt }) => (opt.isIce ? theme.red : '#ffffff')};
          }
        }
      }
    }
  }

  div.downSide {
    border-top: 2px solid #dddddd;
    padding-top: 20px;
    padding-bottom: 90px;

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;

      &.add {
        padding-bottom: 60px;
        border-bottom: 1px solid #aaaaaa;
        margin-bottom: 20px;
      }

      &.des {
        display: block;

        p {
          margin-top: 20px;

          &.desName {
            font-weight: 500;
          }

          &.desc {
            font-size: 5vw;
            color: gray;
          }

          &.pay {
            padding-left: 10px;
            line-height: 1.3;
            word-break: keep-all;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              left: 0;
              top: 2.6vw;
              height: 1px;
              width: 6px;
              background-color: black;
            }
          }
        }

        div.nutritionContainer {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 0px 0px;
          grid-template-areas:
            '. .'
            '. .'
            '. .'
            '. .'
            '. .'
            '. .';
          margin-top: 20px;
          border-right: 1px solid #dddddd;
          border-bottom: 1px solid #dddddd;

          p {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-left: 1px solid #dddddd;
            border-top: 1px solid #dddddd;

            &.name {
              background-color: #aaaaaa;
            }
          }
        }
      }

      p {
        font-size: 6vw;
      }

      div.amountContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(40vw + 10px);

        p.amount {
          color: ${theme.red};
        }
      }

      div.takeoutContainer {
        display: flex;
        gap: 10px;

        button {
          border: 2px solid #aaaaaa;
          border-radius: 30px;
          padding: 2px 0px;
          font-size: 5vw;
          background-color: white;
          color: #aaaaaa;
          font-weight: 500;
          transition: 0.2s;
          width: 20vw;

          &:nth-child(${({ opt }) => (opt.isTakeout ? '2' : '1')}) {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }

      div.sizeContainer {
        display: flex;
        gap: 10px;

        button {
          border: 2px solid #aaaaaa;
          border-radius: 30px;
          padding: 2px 0px;
          font-size: 5vw;
          background-color: white;
          color: #aaaaaa;
          font-weight: 500;
          transition: 0.2s;
          width: 20vw;

          &:nth-child(${({ opt }) => (opt.isJumbo ? '2' : '1')}) {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }

      div.sugarContainer {
        width: 70%;

        div.ratioContainer {
          display: flex;
          justify-content: space-between;
          width: 100%;

          p {
            font-size: 4vw;
          }
        }

        div.bar {
          display: flex;
          justify-content: space-between;
          width: calc(100% - 3vw);
          margin-top: 10px;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            bottom: calc(2.5vw - 1px);
            width: 100%;
            height: 2px;
            background-color: #dddddd;
          }

          button {
            border: none;
            border-radius: 20px;
            background-color: #dddddd;
            width: 5vw;
            height: 5vw;
            position: relative;
            transition: 0.2s;

            &:nth-child(${({ opt }) => sugarRatio[opt.sugar]}) {
              background-color: ${theme.red};
            }
          }
        }
      }

      div.iceContainer {
        display: flex;
        justify-content: space-between;
        width: 72vw;

        button {
          font-size: 4.5vw;
          padding: 2px 6px;
          border: 2px solid #aaaaaa;
          border-radius: 20px;
          background-color: white;
          color: #aaaaaa;
          transition: 0.2s;

          &.select {
            border: 2px solid ${theme.red};
            color: ${theme.red};
          }
        }
      }
    }
  }
`;

const StyledModal = styled.div<{ addPage: boolean; opt: ProductOption }>`
  position: fixed;
  z-index: 4;
  top: 20vw;
  padding: 10px 10px 0 10px;
  left: 100%;
  width: 100%;
  height: calc(100vh - 20vw);
  overflow-y: scroll;
  background-color: white;
  transform: translateX(${({ addPage }) => (addPage ? '-100%' : '0')});
  transition: 0.3s;
  filter: drop-shadow(0px 0px 10px ${({ addPage }) => (addPage ? '#00000030' : '#00000000')});

  div.container {
    position: relative;

    div.imgContainer {
      display: flex;
      align-items: center;
      flex-direction: column;
      border-bottom: 2px solid lightgray;
      padding-bottom: 30px;

      img {
        height: 120px;
      }

      h4 {
        margin-top: 20px;
        font-size: 5vw;
      }

      p {
        margin-top: 10px;
        color: ${theme.red};
        font-size: 6vw;
      }
    }

    div.optionContainer {
      padding: 30px 0;

      h3 {
        margin-bottom: 20px;
      }
    }

    div.caution {
      border-top: 1px solid #aaaaaa;
      padding-top: 50px;
      padding-bottom: 70px;
      position: relative;

      p {
        font-size: 4vw;
        margin-bottom: 10px;
      }
    }

    div.btnContainer {
      position: absolute;
      bottom: 0;
      left: -10px;
      width: calc(100% + 20px);

      button {
        width: 50%;
        border: none;
        color: white;
        font-size: 6vw;
        padding: 10px;

        &:nth-child(1) {
          background-color: #aaaaaa;
        }

        &:nth-child(2) {
          background-color: ${theme.red};
        }
      }
    }
  }
`;

const StyledBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  div.cartBtnContainer {
    background-color: #aaaaaa;
    padding: 2px 4px;

    button {
      background-color: white;
      color: black;
      border-radius: 4px;
    }
  }

  button {
    width: 100%;
    border: none;
    background-color: ${theme.red};
    padding: 10px;
    color: white;
  }
`;

const ProductDetail = () => {
  const [info, setInfo] = useState<ProductDetailInfo>();
  const [loading, setLoading] = useState(false);
  const [addPage, setAddPage] = useState(false);
  const [totalOption, setTotalOption] = useState(0);
  const [errorModal, setErrorModal] = useState(false);
  const [option, setOption] = useState<ProductOption>({
    isIce: true,
    amount: 1,
    isTakeout: false,
    isJumbo: false,
    sugar: 0,
    iceSize: 'regular',
    additionalOption: {
      aloe: 0,
      cheeseform: 0,
      coconut: 0,
      milkform: 0,
      pearl: 0,
      whitePearl: 0,
    },
  });

  const orderHandler = async () => {
    const transOption = {
      amount: 2,
      cold: 1,
      totalPrice: 10600,
      takeOut: 1,
      sugar: 30,
      ice: 'less',
      toppings: [
        {
          id: 1,
          amount: 1,
        },
        {
          id: 2,
          amount: 1,
        },
      ],
    };
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get<ProductDetailInfo>('/data/detail1.json');
      setInfo(data);

      setLoading(false);
    })();
  }, []);

  const minusHandler = () => {
    if (option.amount > 1) {
      setOption({ ...option, amount: option.amount - 1 });
    }
  };

  const pearlMinusHandler = () => {
    if (option.additionalOption.pearl > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, pearl: prev.additionalOption.pearl - 1 } }));
    }
  };

  const pearlPlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, pearl: prev.additionalOption.pearl + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  const whitePearlMinusHandler = () => {
    if (option.additionalOption.whitePearl > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, whitePearl: prev.additionalOption.whitePearl - 1 } }));
    }
  };

  const whitePearlPlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, whitePearl: prev.additionalOption.whitePearl + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  const aloeMinusHandler = () => {
    if (option.additionalOption.aloe > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, aloe: prev.additionalOption.aloe - 1 } }));
    }
  };

  const aloePlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, aloe: prev.additionalOption.aloe + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  const coconutMinusHandler = () => {
    if (option.additionalOption.coconut > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, coconut: prev.additionalOption.coconut - 1 } }));
    }
  };

  const coconutPlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, coconut: prev.additionalOption.coconut + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  const milkformMinusHandler = () => {
    if (option.additionalOption.milkform > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, milkform: prev.additionalOption.milkform - 1 } }));
    }
  };

  const milkformPlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, milkform: prev.additionalOption.milkform + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  const cheeseformMinusHandler = () => {
    if (option.additionalOption.cheeseform > 0) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, cheeseform: prev.additionalOption.cheeseform - 1 } }));
    }
  };

  const cheeseformPlusHandler = () => {
    if (totalOption < 2) {
      setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, cheeseform: prev.additionalOption.cheeseform + 1 } }));
    } else {
      setErrorModal(true);
    }
  };

  useEffect(() => {
    let total = 0;

    for (const [key, number] of Object.entries(option.additionalOption)) {
      total += number;
    }

    setTotalOption(total);
  }, [option]);

  if (loading || !info) {
    return <>로딩중</>;
  } else {
    return (
      <>
        {errorModal && <ErrorModal errorModal={errorModal} setErrorModal={setErrorModal} />}
        <StyledModal addPage={addPage} opt={option}>
          <div className='container'>
            <AiOutlineLeft size='10vw' onClick={() => setAddPage(false)} />
            <div className='imgContainer'>
              <img src={info.detailData.imageURL} alt={info.detailData.beverageName} />
              <h4>{info.detailData.beverageName}</h4>
              <p>{info.detailData.price}</p>
            </div>
            <div className='optionContainer'>
              <h3>토핑(Toppings)</h3>
              <Amount //
                name='펄'
                price='500원'
                amount={option.additionalOption.pearl}
                minusHandler={pearlMinusHandler}
                plusHandler={pearlPlusHandler}
              />
              <Amount //
                name='화이트펄'
                price='500원'
                amount={option.additionalOption.whitePearl}
                minusHandler={whitePearlMinusHandler}
                plusHandler={whitePearlPlusHandler}
              />
              <Amount //
                name='알로에'
                price='500원'
                amount={option.additionalOption.aloe}
                minusHandler={aloeMinusHandler}
                plusHandler={aloePlusHandler}
              />
              <Amount //
                name='코코넛'
                price='500원'
                amount={option.additionalOption.coconut}
                minusHandler={coconutMinusHandler}
                plusHandler={coconutPlusHandler}
              />
              <Amount //
                name='밀크폼'
                price='500원'
                amount={option.additionalOption.milkform}
                minusHandler={milkformMinusHandler}
                plusHandler={milkformPlusHandler}
              />
              <Amount //
                name='치즈폼'
                price='500원'
                amount={option.additionalOption.cheeseform}
                minusHandler={cheeseformMinusHandler}
                plusHandler={cheeseformPlusHandler}
              />
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
              <p>{info.detailData.price}</p>
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
            <button>장바구니</button>
          </div>
          <button onClick={orderHandler}>바로 주문</button>
        </StyledBtnContainer>
      </>
    );
  }
};

export default ProductDetail;
