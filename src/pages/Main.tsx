import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import slide_1 from '../assets/main_slide/슬라이드1.jpg';
import slide_2 from '../assets/main_slide/슬라이드2.jpeg';
import slide_3 from '../assets/main_slide/슬라이드3.jpg';
import slide_4 from '../assets/main_slide/슬라이드4.jpeg';
import slide_5 from '../assets/main_slide/슬라이드5.jpeg';
import Search from '../components/Search';
import Footer from '../components/Footer';

const Container = styled.div`
  background: white;
  height: 100%;
`;
const SlideImage = styled.img`
  width: 100%;
`;
const Div = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 16px;
  z-index: 2;
  text-align: right;
  line-height: 50px;
`;
const DivPre = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 16px;
  z-index: 2;
  text-align: left;
  line-height: 50px;
`;

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
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
          width: '100%',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='box'>
          <ul>
            <div className='on'>
              <div className='column'>{dots}</div>
            </div>
          </ul>
        </div>
      </div>
    ),
  };
  return (
    <>
      <div>
        <Container>
          <Slider {...settings}>
            <div>
              <SlideImage alt='slide_1' src={slide_1} />
            </div>
            <div>
              <SlideImage alt='slide_2' src={slide_2} />
            </div>
            <div>
              <SlideImage alt='slide_3' src={slide_3} />
            </div>
            <div>
              <SlideImage alt='slide_4' src={slide_4} />
            </div>
            <div>
              <SlideImage alt='slide_5' src={slide_5} />
            </div>
          </Slider>
          <Search></Search>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Main;
