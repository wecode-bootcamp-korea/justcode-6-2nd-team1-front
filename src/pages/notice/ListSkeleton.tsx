import styled from 'styled-components';

const StyledSkeleton = styled.li`
  div.date {
    width: 100px;
    height: 4vw;
    background-color: lightgray;
  }

  div.title {
    margin-top: 10px;
    width: 50vw;
    height: 5vw;
    background-color: lightgray;
  }
`;

const ListSkeleton = () => (
  <>
    <StyledSkeleton>
      <div className='date' />
      <div className='title' />
    </StyledSkeleton>
    <StyledSkeleton>
      <div className='date' />
      <div className='title' />
    </StyledSkeleton>
    <StyledSkeleton>
      <div className='date' />
      <div className='title' />
    </StyledSkeleton>
    <StyledSkeleton>
      <div className='date' />
      <div className='title' />
    </StyledSkeleton>
  </>
);

export default ListSkeleton;
