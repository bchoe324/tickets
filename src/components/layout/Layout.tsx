import { NavLink, Outlet } from "react-router-dom";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import TicketIcon from "../../assets/icons/TicketIcon";
import styled from "styled-components";

const LayoutHeader = styled.header`
  justify-content: center;

  .title {
    display: block;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }
`;

const LayoutNav = styled.nav`
  display: block;
  width: 100%;
  max-width: 600px;
  height: 78px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  text-align: center;
  padding: 15px;
  background-color: #000;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;

    li {
      list-style-type: none;

      a {
        width: 80px;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.active {
          span {
            color: #fff;
          }
          svg {
            fill: #fff;
          }
        }

        span {
          color: #ccc;
          font-size: 12px;
          margin-top: 5px;
        }
        svg {
          fill: #ccc;
          height: 24px;
        }
      }
    }
  }
`;

const Layout = () => {
  return (
    <>
      <LayoutHeader>
        <h1 className="title">Tickets</h1>
      </LayoutHeader>
      <LayoutNav>
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
      </LayoutNav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
