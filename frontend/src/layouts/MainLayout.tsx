import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex-grow h-full bg-slate-400">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
