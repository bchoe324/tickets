import { Link } from "react-router-dom";
import "../components/AuthComponents.css";
import { authErrorMsg } from "../util/auth_error_msg";

const Login = () => {
  return (
    <div className="login">
      <h1>로그인</h1>
      <form>
        <input type="email" required placeholder="이메일을 입력하세요." />
        <input type="password" required placeholder="비밀번호를 입력하세요." />
        <input type="submit" value="로그인" />
      </form>
      <Link to={"/join"}>회원가입</Link>
    </div>
  );
};

export default Login;
