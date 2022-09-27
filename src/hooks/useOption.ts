import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../context/store';
import { AddCartReq, AddCartRes, AmountOption, OrderReq, ProductDetailInfo, ProductOption } from '../interface';
import { toppingToId } from '../utils/toppingFromId';

const useOption = () => {
  const { id } = useParams();
  const { token, isLogin } = useStore();
  const [loading, setLoading] = useState(false);
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
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalOption, setTotalOption] = useState(0);
  const [cartDisabled, setCartDisabled] = useState(false);
  const [info, setInfo] = useState<ProductDetailInfo>();

  useEffect(() => {
    let total = 0;

    for (const number of Object.values(option.additionalOption)) {
      total += number;
    }

    setTotalOption(total);
  }, [option]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        // http://localhost:8000/beverages/detail/${id}
        const { data } = await axios.get<ProductDetailInfo>(`http://localhost:8000/beverages/detail/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        setInfo(data);
        setLoading(false);
      } catch (error) {
        setErrorMessage('로그인을 먼저 해주세요.');
        setErrorModal(true);
        setLoading(false);
      }
    })();
  }, []);

  const minusHandler = () => {
    if (option.amount > 1) {
      setOption({ ...option, amount: option.amount - 1 });
    }
  };

  const additinalOption: AmountOption[] = [
    {
      name: '펄',
      price: '500원',
      amount: option.additionalOption.pearl,
      minusHandler() {
        if (option.additionalOption.pearl > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, pearl: prev.additionalOption.pearl - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, pearl: prev.additionalOption.pearl + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
    {
      name: '화이트펄',
      price: '500원',
      amount: option.additionalOption.whitePearl,
      minusHandler() {
        if (option.additionalOption.whitePearl > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, whitePearl: prev.additionalOption.whitePearl - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, whitePearl: prev.additionalOption.whitePearl + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
    {
      name: '알로에',
      price: '500원',
      amount: option.additionalOption.aloe,
      minusHandler() {
        if (option.additionalOption.aloe > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, aloe: prev.additionalOption.aloe - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, aloe: prev.additionalOption.aloe + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
    {
      name: '코코넛',
      price: '500원',
      amount: option.additionalOption.coconut,
      minusHandler() {
        if (option.additionalOption.coconut > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, coconut: prev.additionalOption.coconut - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, coconut: prev.additionalOption.coconut + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
    {
      name: '밀크폼',
      price: '500원',
      amount: option.additionalOption.milkform,
      minusHandler() {
        if (option.additionalOption.milkform > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, milkform: prev.additionalOption.milkform - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, milkform: prev.additionalOption.milkform + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
    {
      name: '치즈폼',
      price: '500원',
      amount: option.additionalOption.cheeseform,
      minusHandler() {
        if (option.additionalOption.cheeseform > 0) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, cheeseform: prev.additionalOption.cheeseform - 1 } }));
        }
      },
      plusHandler() {
        if (totalOption < 2) {
          setOption(prev => ({ ...prev, additionalOption: { ...prev.additionalOption, cheeseform: prev.additionalOption.cheeseform + 1 } }));
        } else {
          setErrorModal(true);
          setErrorMessage('토핑은 최대 2개까지 선택 가능합니다.');
        }
      },
    },
  ];

  const addCartHandler = async () => {
    if (info) {
      setCartDisabled(true);
      const toppingData = [];

      for (const [key, value] of Object.entries(option.additionalOption)) {
        if (value) {
          toppingData.push({
            id: toppingToId(key),
            amount: value,
          });
        }
      }

      const req: OrderReq = {
        amount: option.amount,
        cold: option.isIce ? 1 : 0,
        ice: option.iceSize,
        sugar: option.sugar,
        takeOut: option.isTakeout ? 1 : 0,
        toppings: toppingData,
        totalPrice: (Number(info.detailData.price) + 500 * totalOption) * option.amount,
      };

      try {
        // http://localhost:8000/beverages/cart/${id}
        await axios.post<AddCartRes, AxiosResponse<AddCartRes>, AddCartReq>(`http://localhost:8000/beverages/cart/${id}`, req, {
          headers: {
            Authorization: token,
          },
        });
        setCartDisabled(false);
        setErrorModal(true);
        setErrorMessage('장바구니 추가 완료!');
      } catch (error) {
        console.log(error);
        setCartDisabled(false);
        setErrorModal(true);
        setErrorMessage('장바구니 추가 실패!');
      }
    }
  };

  return {
    id,
    loading,
    setLoading,
    option,
    setOption,
    errorModal,
    setErrorModal,
    errorMessage,
    setErrorMessage,
    totalOption,
    setTotalOption,
    cartDisabled,
    setCartDisabled,
    info,
    setInfo,
    additinalOption,
    addCartHandler,
    isLogin,
    minusHandler,
    token,
  };
};

export default useOption;
