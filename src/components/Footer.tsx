import styled from "styled-components";
import logo from "../assets/ilcha_logo.png";

import { FaPhoneAlt } from "react-icons/fa";

const StyledFooter = styled.div`
  div.footer-wrap {
    display: block;
    height: 190px;

    div.footer-left {
      display: inline-block;
      width: 20%;
      height: 100%;
      background-color: #575757;
      text-align: center;
      box-sizing: border-box;
      float: left;
      padding: 15px;

      img {
        display: inline-block;
        width: 100%;
      }

      p {
        vertical-align: top;
        font-size: 12px;
        color: #b5b4b4;
        margin-top: 15px;
        line-height: 1.3;
      }
    }
    div.footer-right {
      display: inline-block;
      width: 80%;
      height: 100%;
      color: #666666;
      background-color: #f1f2f2;
      text-align: left;
      box-sizing: border-box;
      float: right;
      vertical-align: middle;
      padding: 15px;

      p.first-right {
        font-size: 14px;
        line-height: 1.4;
        color: #444444;
      }
      p.middle-right {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      p.bottom-right {
        font-size: 12px;
        line-height: 1.3;
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
          <p>(C)ILCHA KOREA CO.,LTD ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-right">
          <p className="first-right">
            회사소개 &nbsp;| &nbsp; 제휴/제안 &nbsp; | &nbsp; 고객센터 &nbsp;|
            &nbsp; HOT-LINE
          </p>
          <p className="first-right">
            {" "}
            개인정보처리방침 &nbsp; | &nbsp; 이메일 무단 수집 거부
          </p>
          <p className="middle-right">
            고객센터 <FaPhoneAlt />
            &nbsp; 02-111-1111
          </p>
          <p className="bottom-right">
            (운영시간: 오전 9시 30분 ~ 오후 5시 30분 /
          </p>
          <p className="bottom-right">
            점심시간: 낮 12시 ~ 오후 1시 / 주말 및 공휴일 휴무)
          </p>
          <p className="bottom-right">&nbsp;</p>
          <p className="bottom-right">
            서울 종로구 종로 47(공평동, 7층) | ㈜일차코리아 대표이사 이일차
          </p>
          <p className="bottom-right">
            사업자번호 124-11-11111 | 통신판매번호: 2020-서울종로-1111
          </p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
