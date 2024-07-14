import { Navigate, useLocation } from "react-router";
import { useRoleContext } from "../context/RoleContext";



const UserAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  let {userInfo} = useRoleContext();
  let location = useLocation();

  if (!userInfo.userRoles.includes('user')) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};
export default UserAuth;
