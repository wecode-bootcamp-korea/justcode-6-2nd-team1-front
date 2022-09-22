import styled  from "styled-components";


interface HeaderProps {
  page:number
}
const Header = ({ page }:HeaderProps) => {
  return (
    <div className='header'>
      <span className={page < 1 ? 'inColor' : 'fullColor'}>약관동의</span>
      <span className={page >= 2 ? 'fullColor':'inColor'}>회원정보</span>
      {page === 0 && <Line />}
      <span className={page === 2 && 'fullColor'}>가입완료</span>
    </div>
  );
}
export default Header;

const Line = styled.div`
  margin: 25px 2px 0 0;
  height: 17px;
  border-right: 1px solid gray;
`;