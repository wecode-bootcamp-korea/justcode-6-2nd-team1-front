import { ImSpinner2 } from 'react-icons/im';
import styled, { keyframes } from 'styled-components';

const Spin = keyframes`
0% {
  rotate: 0deg;
}

100% {
  rotate: 360deg
}
`;

const StyledSpinner = styled.div<{ fixed: boolean | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8vw;

  ${({ fixed }) => (fixed ? 'position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: #00000050; z-index: 25' : '')};

  svg {
    animation: ${Spin} infinite 0.5s;
    font-size: 8vw;
  }
`;

interface SpinnerProps {
  fixed?: boolean;
}

const Spinner = ({ fixed }: SpinnerProps) => (
  <StyledSpinner fixed={fixed}>
    <ImSpinner2 />
  </StyledSpinner>
);

export default Spinner;
