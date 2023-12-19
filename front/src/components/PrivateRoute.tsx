import { useAppSelector } from "../store";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const accessToken = localStorage.getItem("accessToken");

  return currentUser && accessToken ? <Outlet /> : <Navigate to={`/login`} />;
};

export default PrivateRoute;
