import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

const ProtectedRoute = () => {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
