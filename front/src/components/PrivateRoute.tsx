import { useAppSelector } from "../store";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoute;
