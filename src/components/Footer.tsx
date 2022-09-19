import styled from "styled-components";
import logo from "../assets/ilcha_logo.png";

const StyledFooter = styled.div`
  div.footer-wrap {
    display: block;
    height: 200px;
    border: 1px solid black;

    div.footer-left {
      display: inline-block;
      width: 20%;
      height: 100%;
      background-color: #575757;
      text-align: center;
      box-sizing: border-box;

      img {
        display: inline-block;
        width: 100%;
      }

      p {
        font-size: 15px;
      }
    }
    div.footer-right {
      display: inline-block;
      width: 80%;
      height: 100%;
      background-color: #f1f2f2;
      text-align: center;
      box-sizing: border-box;

      p {
        line-height: 1.2;
      }
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-wrap">
        <div className="footer-left">
          <img src={logo}></img>
          <p>(C)GONGCHA KOREA CO.,LTD ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-right">
          <p> 회사소개 | 제휴/제안 | 고객센터 | HOT-LINE</p>
          <p> 개인정보처리방침 | 이메일 무단 수집 거부</p>
          <p> 고객센터 02-111-1111</p>
          <p> (운영시간: 오전 9시 30분 ~ 오후 5시 30분 /</p>
          <p> 점심시간: 낮 12시 ~ 오후 1시 / 주말 및 공휴일 휴무)</p>
          <p>
            {" "}
            서울 종로구 종로 47(공평동, 7층) | ㈜일차코리아 대표이사 이일차
          </p>
          <p> 사업자번호 124-11-11111 | 통신판매번호: 2020-서울종로-1111</p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
