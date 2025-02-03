import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import TicketIcon from "../../assets/icons/TicketIcon";

const Layout = () => {
  return (
    <>
      <header>
        <h1 className="title">Tickets</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/tickets">
                <TicketIcon fill="currentColor" />
                <span>티켓</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <HomeIcon fill="currentColor" />
                <span>홈</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mypage">
                <ProfileIcon fill="currentColor" />
                <span>마이페이지</span>
              </NavLink>
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
