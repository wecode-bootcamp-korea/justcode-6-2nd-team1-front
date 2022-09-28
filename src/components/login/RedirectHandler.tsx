import Spinner from '../Spinner';
import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import useStore from '../../context/store';
import { useNavigate } from 'react-router-dom';
import { KakaoReq, KakaoRes, KakaoPostReq } from '../../interface';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const { login, isLogin } = useStore();
  let codeURL = new URL(window.location.href).searchParams.get('code');
  const RESTAPIKey = '95b40d30bfea9add60abe22405519b58';

  const getToken = async () => {
    const { data: kakaoData } = await axios.post<KakaoPostReq>(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${RESTAPIKey}&redirect_uri=http://localhost:3000/kakaologin&code=${codeURL}`, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const { data } = await axios.post<KakaoRes, AxiosResponse<KakaoRes>, KakaoReq>('http://localhost:8000/kakaologin', {
      token: kakaoData.access_token,
    });
    console.log('kakaodata', kakaoData);
    console.log('data', data);
    login(data);
    navigate('/'); //포인트 지급 모달 넣을지 정해야함
  };

  useEffect(() => {
    isLogin && navigate('/');
  }, [isLogin]);

  useEffect(() => {
    if (codeURL) getToken();
  }, []);

  return <Spinner />;
};

export default RedirectHandler;
