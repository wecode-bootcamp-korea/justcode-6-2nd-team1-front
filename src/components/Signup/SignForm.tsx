import { SignUpForm } from "../../pages/signup/Signup";

const SignForm = () => {
  return (
    <>
      <SignUpForm>
        <div className="head">
          <span>아이디 설정</span>
        </div>
        <form>
          <div className="title">
            <span>이메일</span>
            <div className="content">
              <input />
              <button>중복확인</button>
            </div>
          </div>
          <div className="title">
            <span>비밀번호</span>
            <div className="content">
              <input type="password" />
              <span>
                비밀번호는 영문, 숫자를 혼합하여 8~20자 이내로 입력하세요.
              </span>
            </div>
          </div>
          <div className="title">
            <span>비밀번호 확인</span>
            <div className="content">
              <input type="password" />
            </div>
          </div>
        </form>
      </SignUpForm>
      <SignUpForm>
        <div className="head">
          <span>닉네임 설정</span>
        </div>
        <form>
          <div className="title">
            <span>닉네임</span>
            <div className="content">
              <input />
            </div>
          </div>
        </form>
      </SignUpForm>
      <SignUpForm>
        <div className="head">
          <span>회원 정보</span>
        </div>
        <form>
          <div className="title">
            <span>이름</span>
            <div className="content">
              <input />
            </div>
          </div>
          <div className="title">
            <span>휴대폰 번호</span>
            <div className="content">
              <input />
            </div>
          </div>
        </form>
      </SignUpForm>
    </>
  );
}

export default SignForm;