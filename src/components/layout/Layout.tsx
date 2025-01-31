import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import TicketIcon from "../../assets/icons/TicketIcon";

// TODO
// [ ] 페이지 활성화 표시

const Layout = () => {
  return (
    <>
      <header>
        <h1 className="title">Tickets</h1>
        <nav>
          <ul>
            <li>
              <Link to="/tickets">
                <TicketIcon fill="#fff" />
                <span>티켓</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <HomeIcon fill="#fff" />
                <span>홈</span>
              </Link>
            </li>
            <li>
              <Link to="/mypage">
                <ProfileIcon fill="#fff" />
                <span>마이페이지</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
