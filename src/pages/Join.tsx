import { Link, useNavigate } from "react-router-dom";
import "../components/AuthComponents.css";
import loginErrorMsg from "../util/login_error_msg";
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loading from "../components/Loading";

const Join = () => {
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
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
    if (
      isLoading ||
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.password === ""
    )
      return;
    setLoading(true);
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: userInfo.name,
        });
        setLoading(false);
        nav("/");
      })
      .catch((error) => {
        console.log(error.code);
        setErrorMessage(loginErrorMsg(error.code));
      });
  };

  return (
    <div className="join">
      {isLoading ? <Loading /> : null}
      <div className="title">
        <h1>Tickets</h1>
      </div>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div className="collumn">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            type="text"
            required
            placeholder="이름을 입력하세요"
            className="name"
            value={userInfo.name}
            onChange={onChangeInput}
          />
        </div>
        <div className="collumn">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            required
            placeholder="이메일을 입력하세요"
            className="email"
            value={userInfo.email}
            onChange={onChangeInput}
          />
        </div>
        <div className="collumn">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
            className="password"
            value={userInfo.password}
            onChange={onChangeInput}
          />
        </div>
        {errorMessage ? <p className="error_message">{errorMessage}</p> : null}

        <input type="submit" value="회원가입" className="submit_button" />
      </form>
      <div className="link_wrapper">
        <Link to={"/login"}>로그인</Link>
      </div>
    </div>
  );
};

export default Join;
