import styled from 'styled-components';
import kakaoLogo from '../../assets/social_login/kakao.png';

const KaKaoLogin = () => {
  const RESTAPIKey = '95b40d30bfea9add60abe22405519b58';
  const RedirectURI = 'http://localhost:3000/kakaologin';
  const KaKaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${RESTAPIKey}&redirect_uri=${RedirectURI}&response_type=code`;
  return (
    <StyledKakaoLogin href={KaKaoAuthURL}>
      <img src={kakaoLogo} />
      <span className='kakaoBtn'>카카오톡 로그인</span>
    </StyledKakaoLogin>
  );
};

export default KaKaoLogin;

const StyledKakaoLogin = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 45px;
  margin-top: 5px;
  background-color: #fee500;
  border-radius: 50px;
  img {
    position: absolute;
    left: 10px;
    width: 50px;
  }
  .kakaoBtn {
    font-size: 16px;
    color: #000000;
  }
`;
