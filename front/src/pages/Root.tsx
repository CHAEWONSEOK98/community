import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Root = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
