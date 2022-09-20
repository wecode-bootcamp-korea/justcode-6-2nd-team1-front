import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav<{ mode: number }>`
  width: 100%;
  overflow: hidden;
  background-color: #dddddd;

  ul {
    display: flex;
    width: 266%;

    li {
      width: fit-content;
      text-align: center;
      padding: 14px 30px;
      font-size: 4vw;
      position: relative;
      white-space: nowrap;

      &:nth-child(${({ mode }) => mode + 1}) {
        color: #d03b47;
        border-bottom: 2px solid #d03b47;
      }

      &::after {
        content: '';
        position: absolute;
        right: -0.5px;
        top: calc(50% - 7px);
        height: 14px;
        width: 1px;
        background-color: #666666;
      }
    }
  }
`;

// const category = ['season', 'combination', 'original', 'milktea', 'jewelry', 'fruit', 'smoothy', 'coffee'];
const category = ['시즌 메뉴', '베스트조합', '오리지널 티', '밀크티', '쥬얼리', '과일 믹스', '스무디', '커피'];

const Product = () => {
  const [mode, setMode] = useState(0);

  const ulRef = useRef<HTMLUListElement>(null);
  const startX = useRef(0);
  const transX = useRef(0);
  const x = useRef(0);

  const touchStart: React.TouchEventHandler<HTMLUListElement> = ({
    changedTouches: {
      0: { clientX },
    },
  }) => {
    startX.current = clientX;

    if (ulRef.current) {
      ulRef.current.style.transition = '0s';
    }
  };

  const touchMove: React.TouchEventHandler<HTMLUListElement> = ({
    changedTouches: {
      0: { clientX },
    },
  }) => {
    transX.current = clientX - startX.current + x.current;

    if (ulRef.current) {
      const width = ulRef.current.getBoundingClientRect().width;

      ulRef.current.style.transform = `translateX(${(transX.current * 100) / width}%)`;
    }
  };

  const touchEnd: React.TouchEventHandler<HTMLUListElement> = () => {
    x.current = transX.current;

    if (ulRef.current) {
      const width = ulRef.current.getBoundingClientRect().width;

      if (-transX.current > width - innerWidth) {
        ulRef.current.style.transition = '0.3s';
        transX.current = innerWidth - width;
        ulRef.current.style.transform = `translateX(${(transX.current * 100) / width}%)`;
        x.current = transX.current;
      } else if (transX.current > 0) {
        ulRef.current.style.transition = '0.3s';
        transX.current = 0;
        ulRef.current.style.transform = `translateX(${(transX.current * 100) / width}%)`;
        x.current = transX.current;
      }
    }
  };

  return (
    <StyledNav mode={mode}>
      <ul ref={ulRef} onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd}>
        {category.map((cate, i) => (
          <li key={cate} onClick={() => setMode(i)}>
            {cate}
          </li>
        ))}
      </ul>
    </StyledNav>
  );
};

export default Product;
