import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Loading from "./components/Loading";
import Detail from "./pages/Detail";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Edit from "./pages/Edit";
import Reviews from "./components/Reviews";
import NewReview from "./pages/NewReview";
import SelectPerformance from "./components/SelectPerformance";
import ReviewForm from "./components/ReviewForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "tickets-new",
        element: <NewTicket />,
      },
      {
        path: "tickets-detail/:id",
        element: <Detail />,
      },
      {
        path: "tickets-edit/:id",
        element: <Edit />,
      },
      {
        path: "new-review",
        element: <NewReview />,
        children: [
          {
            path: "",
            element: <SelectPerformance />,
          },
          {
            path: "write",
            element: <ReviewForm />,
          },
        ],
      },
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />,
            children: [
              {
                path: "reviews",
                element: <Reviews />,
              },
            ],
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
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
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
