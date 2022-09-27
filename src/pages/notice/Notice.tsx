import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import noticeTop from '../../assets/notice_top.jpg';
import { BiSearch } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { Notice } from '../../interface';
import axios from 'axios';
import ListSkeleton from './ListSkeleton';
import theme from '../../theme';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${noticeTop});
  background-position: center;
  background-size: cover;
  gap: 20px;
  color: white;
  padding: 30px 0;

  h2 {
    font-size: 8vw;
    font-weight: 500;
  }

  p {
    font-size: 4vw;
  }
`;

const StyledNav = styled.nav<{ isNotice: boolean }>`
  display: flex;
  width: calc(100% - 20px);
  background-color: ${theme.red};
  margin: 0 auto;
  padding: 10px 0;
  transform: translateY(-50%);
  position: relative;

  a {
    display: block;
    width: 50%;
    text-align: center;
    color: #c9898e;
    font-size: 4vw;

    &:nth-child(${({ isNotice }) => (isNotice ? '1' : '2')}) {
      color: white;
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: calc(50% - 1px);
    top: calc(50% - 2vw);
    width: 2px;
    height: 4vw;
    background-color: #c9898e;
  }
`;

const StyledDiv = styled.div<{ optionOpen: boolean }>`
  padding: 10px;

  div.container {
    display: flex;
    justify-content: space-between;
    background-color: #f3f4f7;
    height: calc(4vw + 40px);
    padding: 10px;
    position: relative;

    ul.option {
      width: calc(30% - 10px);
      height: calc((4vw + 20px) * ${({ optionOpen }) => (optionOpen ? '3' : '1')});
      transition: 0.3s;
      background-color: white;
      overflow: hidden;
      border: 1px solid lightgray;

      li {
        font-size: 4vw;
        height: calc(4vw + 20px);
        padding: 10px;
        font-weight: 300;

        &:first-of-type {
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;

          svg {
            transition: 0.3s;
            rotate: ${({ optionOpen }) => (optionOpen ? '180deg' : '0deg')};
          }
        }
      }
    }

    form {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 70%;
      height: 100%;
      background-color: white;
      padding: 0 10px;
      border: 1px solid lightgray;

      input {
        display: block;
        width: 100%;
        border: none;
        font-size: 4vw;

        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const StyledList = styled.ul`
  margin-top: 10px;
  padding: 0px 10px;

  li {
    border-bottom: 1px solid #666666;
    padding: 20px 0;

    p {
      color: #666666;
      font-weight: 300;
      font-size: 4vw;
    }

    h4 {
      font-size: 5vw;
      margin-top: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:last-of-type {
      border: none;
    }
  }
`;

const NoticePage = () => {
  const { pathname } = useLocation();
  const [isNotice, setIsNotice] = useState(pathname === '/notice');
  const [optionOpen, setOptionOpen] = useState(false);
  const [option, setOption] = useState('내용');
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(false);
  const [lastLi, setLastLi] = useState<HTMLLIElement | null>(null);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const optionOpenHandler = ({ target }: MouseEvent) => {
      if (target instanceof Element) {
        target.closest('ul.option') ? setOptionOpen(o => !o) : setOptionOpen(false);
      }
    };

    window.addEventListener('click', optionOpenHandler);
    return () => window.removeEventListener('click', optionOpenHandler);
  }, []);

  useEffect(() => {
    setNoticeList([]);
    setPage(0);
    setEnd(false);

    (async () => {
      setLoading(true);

      const { data } = await axios.get<Notice[]>(pathname === '/notice' ? 'data/noticeData.json' : 'data/newsData.json');
      const sliced = data
        .filter(n => {
          switch (option) {
            case '날짜':
              return n.date.includes(value);
            case '내용':
              return n.title.includes(value);
          }
        })
        .slice(0, 7);

      if (sliced.length < 7) {
        setEnd(true);
      }

      setNoticeList(sliced);
      setLoading(false);
    })();
  }, [value]);

  useEffect(() => {
    setIsNotice(pathname === '/notice');
    setNoticeList([]);
    setPage(0);
    setEnd(false);
    setValue('');

    (async () => {
      setLoading(true);

      const { data } = await axios.get<Notice[]>(pathname === '/notice' ? 'data/noticeData.json' : 'data/newsData.json');
      const sliced = data.slice(0, 7);

      if (sliced.length < 7) {
        setEnd(true);
      }

      setNoticeList(sliced);
      setLoading(false);
    })();
  }, [pathname]);

  useEffect(() => {
    if (!end) {
      (async () => {
        setLoading(true);

        const { data } = await axios.get<Notice[]>(pathname === '/notice' ? 'data/noticeData.json' : 'data/newsData.json');
        const sliced = data
          .filter(n => {
            switch (option) {
              case '날짜':
                return n.date.includes(value);
              case '내용':
                return n.title.includes(value);
            }
          })
          .slice(page * 7, (page + 1) * 7);

        if (sliced.length < 7) {
          setEnd(true);
        }

        setNoticeList([...noticeList, ...sliced]);
        setLoading(false);
      })();
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && entry.isIntersecting) {
          observer.disconnect();
          setPage(page + 1);
        }
      });
    });
    lastLi && observer.observe(lastLi);
  }, [lastLi]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (inputRef.current) {
      setValue(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <StyledHeader>
        <h2>NEWS</h2>
        <p>공차의 다양한 소식을 확인해 보새요.</p>
      </StyledHeader>
      <StyledNav isNotice={isNotice}>
        <Link to='/notice'>공지사항</Link>
        <Link to='/news'>보도자료</Link>
      </StyledNav>
      <StyledDiv optionOpen={optionOpen}>
        <div className='container'>
          <ul className='option'>
            <li>
              {option} <BsChevronDown />
            </li>
            <li onClick={() => setOption('내용')}>내용</li>
            <li onClick={() => setOption('날짜')}>날짜</li>
          </ul>
          <form onSubmit={submitHandler}>
            <input type='text' ref={inputRef} placeholder='검색어를 입력해주세요.' />
            <BiSearch />
          </form>
        </div>
      </StyledDiv>
      <StyledList>
        {!!noticeList.length &&
          noticeList.map((not, i) => (
            <li key={not.id} ref={noticeList.length - 1 === i ? setLastLi : null}>
              <p>{not.date}</p>
              <h4>{not.title}</h4>
            </li>
          ))}
        {loading && <ListSkeleton />}
      </StyledList>
    </>
  );
};

export default NoticePage;
