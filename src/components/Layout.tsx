import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <header>
        <h1 className="title">Tickets</h1>
        <nav>
          <ul>
            <li>
              <Link to="/tickets">Tickets</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/mypage">My Page</Link>
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
