import { Link } from "react-router-dom";
import { useAuth } from "../context/RoleContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return (
      <div className="h-full w-full flex justify-between items-center bg-slate-500">
        <p>This is the Logo</p>
        <SignOutButton />
      </div>
    );
  }
  return (
    <div className="h-10 w-full flex justify-center items-center bg-slate-500">
      <p>Welcome to my Consultorio App</p>
    </div>
  );
};

export default Header;
