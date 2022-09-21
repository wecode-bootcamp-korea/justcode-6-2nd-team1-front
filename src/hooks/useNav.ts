import { useRef } from 'react';

const useNav = () => {
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

  return { ulRef, touchStart, touchMove, touchEnd };
};

export default useNav;
