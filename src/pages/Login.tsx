import { Link, useNavigate } from "react-router-dom";
import {
  Wrapper,
  ErrorMessage,
  Form,
  Collumn,
  LinkWrapper,
} from "../components/AuthComponents";
import loginErrorMsg from "../util/login_error_msg";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loading from "../components/Loading";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || userInfo.email === "" || userInfo.password === "") return;
    setLoading(true);
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(() => {
        setLoading(false);
        nav("/");
      })
      .catch((error) => {
        console.log(error.code);
        setErrorMessage(loginErrorMsg(error.code));
      });
  };

  return (
    <Wrapper>
      {isLoading ? <Loading /> : null}
      <div className="title">
        <h1>Tickets</h1>
      </div>
      <h2>로그인</h2>
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <Form onSubmit={onSubmit}>
        <Collumn>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            required
            placeholder="이메일을 입력하세요"
            value={userInfo.email}
            onChange={onChangeInput}
          />
        </Collumn>
        <Collumn>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
            value={userInfo.password}
            onChange={onChangeInput}
          />
        </Collumn>
        <input
          type="submit"
          value="이메일로 로그인"
          className="submit_button"
        />
      </Form>
      <LinkWrapper>
        <Link to={"/forgot-password"}>비밀번호 찾기</Link>
        <Link to={"/join"}>회원가입</Link>
      </LinkWrapper>
    </Wrapper>
  );
};

export default Login;
