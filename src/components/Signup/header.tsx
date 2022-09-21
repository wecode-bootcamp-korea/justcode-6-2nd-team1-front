import styled  from "styled-components";

const Header = ({ inColor,fullColor }) => {
  return (
    <div className="header">
      <span className={inColor}>약관동의</span>
      <span className={fullColor}>회원정보</span>
        <Line />
      <span>가입완료</span>
    </div>
  )
}
export default Header;

const Line = styled.div`
  margin: 25px 2px 0 0;
  height: 17px;
  border-right: 1px solid gray;
`;