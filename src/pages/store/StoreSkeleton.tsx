import styled from 'styled-components';

const StyledSk = styled.div`
  div.container {
    display: flex;
    align-items: center;
    margin-top: 20px;

    div.textContainer {
      display: flex;
      flex-direction: column;
      margin-left: 30px;

      p.name {
        width: 30vw;
        height: 5vw;
        background-color: #bbbbbb;
        margin-bottom: 10px;
      }

      p.address {
        width: 70vw;
        height: 5vw;
        background-color: #bbbbbb;
        margin-bottom: 20px;
      }
    }
  }
`;

const StoreSckelelton = () => {
  return (
    <>
      <StyledSk>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
        <div className='container'>
          <div className='textContainer'>
            <p className='name'></p>
            <p className='address'></p>
          </div>
        </div>
      </StyledSk>
    </>
  );
};

export default StoreSckelelton;
