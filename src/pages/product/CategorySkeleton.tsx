import styled from 'styled-components';

const StyledSk = styled.div`
  div.container {
    display: flex;
    align-items: center;
    margin-top: 20px;

    div.img {
      height: 60px;
      width: 60px;
      border-radius: 40px;
      background-color: #bbbbbb;
      margin: 0 10px;
    }

    div.textContainer {
      display: flex;
      flex-direction: column;

      p.name {
        width: 50vw;
        height: 5vw;
        background-color: #bbbbbb;
        margin-bottom: 10px;
      }

      p.price {
        width: 30vw;
        height: 5vw;
        background-color: #bbbbbb;
      }
    }
  }
`;

const CategotySkeleton = () => (
  <StyledSk>
    <div className='container'>
      <div className='img' />
      <div className='textContainer'>
        <p className='name' />
        <p className='price' />
      </div>
    </div>
    <div className='container'>
      <div className='img' />
      <div className='textContainer'>
        <p className='name' />
        <p className='price' />
      </div>
    </div>
    <div className='container'>
      <div className='img' />
      <div className='textContainer'>
        <p className='name' />
        <p className='price' />
      </div>
    </div>
    <div className='container'>
      <div className='img' />
      <div className='textContainer'>
        <p className='name' />
        <p className='price' />
      </div>
    </div>
  </StyledSk>
);

export default CategotySkeleton;
