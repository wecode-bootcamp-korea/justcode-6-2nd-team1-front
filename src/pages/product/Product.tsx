import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #dddddd;

  ul {
    display: flex;
    width: 240%;

    li {
      padding: 10px 20px;
    }
  }
`;

const Product = () => {
  return (
    <StyledContainer>
      <ul>
        <li>시즌 메뉴</li>
        <li>베스트 콤비네이션</li>
        <li>오리지널 티</li>
        <li>밀크티</li>
        <li>쥬얼리</li>
        <li>과일믹스</li>
        <li>스무디</li>
        <li>커피</li>
      </ul>
    </StyledContainer>
  );
};

export default Product;
