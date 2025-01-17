import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import New from "./pages/New";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tickets",
        element: <Tickets />,
        children: [
          {
            path: "new",
            element: <New />,
          },
        ],
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}

export default App;
