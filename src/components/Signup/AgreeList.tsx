import { AgreeBtn } from "../../pages/signup/Signup";
import { CheckList } from "../../pages/signup/Signup";
import { NextBtn } from "../../pages/signup/Signup";
import { BsCheckCircle } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { AgreeListProps } from "../../interface"

const AgreeList = ({ setPage } : AgreeListProps) => {
  const [btn, setBtn] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [backColor, setBackColor] = useState(false);
  const allCheck = () => {
    allChecked ? setAllChecked(false) : setAllChecked(true);
    if (allChecked) {
      setFirst(true);
      setSecond(true);
      setThird(true);
      setFourth(true);
      setBackColor(true);
    } else {
      setFirst(false);
      setSecond(false);
      setThird(false);
      setFourth(false);
      setBackColor(false);
    }
  }
  useEffect(() => {
    if (first && second) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [first,second]);
  return (
    <>
      <AgreeBtn>
          <button className={backColor ? 'checked':''} onClick={allCheck}>전체동의</button>
          <span>선택 동의 사항이 포함되어 있습니다.</span>
          <span>만 14세 이상만 가입 가능합니다.</span>
        </AgreeBtn>
        <CheckList>
          <div>
            <span onClick={() => first ? setFirst(false):setFirst(true)}>
              {first ? (
                <BsCheckCircleFill className="checkIcon" />
              ) : (
                <BsCheckCircle className="checkIcon" />
              )}
              공차 멤버십 회원 이용약관 동의 (필수)
            </span>
          </div>
          <div>
            <span onClick={() => second ? setSecond(false) : setSecond(true)}>
              {second ? (
                <BsCheckCircleFill className="checkIcon" />
              ) : (
                <BsCheckCircle className="checkIcon" />
              )}
              개인정보 수집 및 이용 동의 (필수)
            </span>
          </div>
          <div>
            <span onClick={() => third ? setThird(false):setThird(true)}>
              {third ? (
                <BsCheckCircleFill className="checkIcon" />
              ) : (
                <BsCheckCircle className="checkIcon" />
              )}
              위치기반 서비스 이용약관 동의 (선택)
            </span>
          </div>
          <div>
            <span onClick={() => fourth ? setFourth(false) : setFourth(true)}>
              {fourth ? (
                <BsCheckCircleFill className="checkIcon" />
              ) : (
                <BsCheckCircle className="checkIcon" />
              )}
              마케팅 수신 동의 (선택)
            </span>
          </div>
      </CheckList>
      <NextBtn disabled={btn?true:false} onClick={() => setPage(1)}>
          다음
      </NextBtn>
    </>
  )
}

export default AgreeList;