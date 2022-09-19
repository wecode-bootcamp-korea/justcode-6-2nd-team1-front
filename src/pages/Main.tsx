import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import 슬라이드1 from "../assets/main_slide/슬라이드1.jpg";
import 슬라이드2 from "../assets/main_slide/슬라이드2.jpeg";

const Container = styled.div`
  background: white;
  height: 129px;
`;
const SlideImage = styled.img`
  width: 100%;
`;
const Div = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;
const Dots = styled.div`
  width: 125px;
  height: 100px;
`;

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Div>
        <BsChevronRight />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <BsChevronLeft />
      </DivPre>
    ),
    appendDots: (dots: any) => (
      <div
        style={{
          width: "100%",
          border: "1px solid gray",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };
  return (
    <>
      <div>
        <Container>
          <Slider {...settings}>
            <div>
              <SlideImage src={슬라이드1} />
            </div>
            <div>
              <SlideImage src={슬라이드2} />
            </div>
          </Slider>
        </Container>
      </div>
    </>
  );
};

export default Main;
