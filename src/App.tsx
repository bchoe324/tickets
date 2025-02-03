import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Loading from "./components/common/Loading";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Edit from "./pages/Edit";
import NewReview from "./pages/NewReview";
import MyReview from "./pages/MyReview";
import EditReview from "./pages/EditReview";
import Ranking from "./pages/Ranking";
import Show from "./pages/Show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "ranking",
        element: <Ranking />,
      },
      {
        path: "show/:id",
        element: <Show />,
      },
      {
        path: "tickets/new",
        element: <NewTicket />,
      },
      {
        path: "tickets/detail/:id",
        element: <Detail />,
      },
      {
        path: "tickets/edit/:id",
        element: <Edit />,
      },
      {
        path: "new-review",
        element: <NewReview />,
      },
      {
        path: "my-review",
        element: <MyReview />,
      },
      {
        path: "my-review/edit/:id",
        element: <EditReview />,
      },
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "tickets",
            element: <Tickets />,
          },
          {
            path: "mypage",
            element: <MyPage />,
          },
        ],
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
