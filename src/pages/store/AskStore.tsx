import storeimg from '../../assets/storeimg.jpeg';
import styled from 'styled-components';
import theme from '../../theme';
import Footer from '../../components/Footer';

const StyledWrap = styled.div`
  margin: 0;
  padding-bottom: 10px;
  height: 100%;
  min-height: 100%;
  position: relative;
`;
const StyledHeader = styled.header`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  background-image: url(${storeimg});
  background-position: center;
  background-size: cover;
  gap: 20px;
  color: white;
  padding: 30px 0;

  div {
    position: absolute;
    width: 85%;
    height: 30vh;
    background-color: ${theme.red};
    opacity: 0.8;
    margin-top: 140px;
    padding: 20px;
    line-height: 1.7em;

    h1 {
      display: block;
      font-size: 7.5vw;
      font-weight: 500;
      text-align: center;
      margin: 10px 0 10px 0;
    }

    h2 {
      padding: 10px;
      font-size: 4vw;
    }
  }
`;

const StyledMiddle = styled.div`
  display: block;
  height: 20vh;
  margin-top: 5vh;

  div.cost_wrap {
    display: inline-block;
    width: 100%;
    height: 20vh;
    align-items: center;
    text-align: center;
    line-height: 5vh;
    vertical-align: middle;
    padding: 20px 0;

    h2 {
      font-size: 3vh;
    }

    p {
      color: gray;
      font-size: 2.5vh;
    }
    button {
      font-size: 0.9em;
      width: 20vw;
      height: 8vw;
      background-color: white;
      outline: none;
      box-shadow: none;
      border: 0.5px solid gray;
    }
    div.four_wrap {
      display: inline-flex;
      height: 50vh;
      flex-flow: row wrap;
      margin-top: 5vh;
    }

    div.squarebox {
      width: 50%;
      height: 50%;
      padding: 10px;
      line-height: 1.4em;
      overflow: inherit;
    }
    div.gray {
      background-color: #f5f4f2;
    }
    div.brown {
      background-color: #efeae4;
    }

    h2 {
      font-size: 1.2em;
      margin: 15px 10px 10px 10px;
    }
    p {
      font-size: 0.8em;
      margin: 10px;
    }
  }
`;

const AskStore = () => {
  return (
    <div>
      <StyledWrap>
        <StyledHeader>
          <div>
            <h1>공들여 맛있는 차, 일차</h1>
            <h2>프리미엄 잎 차를 고르고 공차만의 까다로운 노하우로 우리고 다양하고 새로운 맛을 더해 한 잔의 완벽한 공차를 바칩니다.</h2>
          </div>
        </StyledHeader>
        <StyledMiddle>
          <div className='cost_wrap'>
            <h2>일차 개설비용</h2>
            <p>일차 가맹점 개설비용을 안내 드립니다.</p>
            <button
              onClick={() => {
                alert('준비중입니다.');
              }}
            >
              개설비용
            </button>
            <div className='four_wrap'>
              <div className='squarebox gray '>
                <h2>가맹점 개설 조건 및 절차 안내</h2>
                <p>일차만의 프랜차이즈 운영 노하우로 안정된 창업을 이루세요.</p>
              </div>
              <div className='squarebox brown'>
                <h2>가맹점 상담신청</h2>
                <p>가맹점 상담 신청을 하시면 더 자세한 안내를 받을 수 있습니다.</p>
              </div>
              <div className='squarebox brown'>
                <h2>인테리어</h2>
                <p>여유있는 차 문화를 선도하기 위해 머무르는 공간까지 세심하게 배려한 인테리어로 고객에게 편안함을 제공합니다.</p>
              </div>
              <div className='squarebox gray'>
                <h2>일차 경쟁력</h2>
                <p>가맹점과 본사가 상생할 수 있도록 지속적으로 성공 창업을 지원합니다.</p>
              </div>
            </div>
          </div>
        </StyledMiddle>
      </StyledWrap>
    </div>
  );
};

export default AskStore;
