import { Navigate, useLocation } from "react-router";
import { useRoleContext } from "../context/RoleContext";
import { RoleProvider } from "../context/RoleContext.tsx";

const AdminAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  let { userInfo } = useRoleContext();
  let location = useLocation();

  if (!userInfo.userRoles.includes("admin")) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <RoleProvider>{children}</RoleProvider>;
};
export default AdminAuth;
