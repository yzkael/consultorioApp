import { useAuth } from "../context/RoleContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userId, roles, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate('/')
  }

  if (!roles || !userId) {
    return <div>Loading...</div>;
  }

  const isAdmin = roles.includes("admin");
  const isUser = roles.includes("user");

  return (
    <div className="h-[100%] bg-slate-400 flex flex-col justify-center items-center gap-10 w-full">
      {isAdmin && (
        <Link className="bg-blue-500 p-5 border rounded-md my-2" to={"/dashboard-admin"}>Admin Dashboard</Link>
      )}
      {(isUser || isAdmin) && (
        <Link className="bg-blue-500 p-5 border rounded-md my-2" to={"/dashboard-user"}>User Dashboard</Link>
      )}
      {/* Public */}
      <p>This is the public stuff</p>
    </div>
  );
};

export default Dashboard;
