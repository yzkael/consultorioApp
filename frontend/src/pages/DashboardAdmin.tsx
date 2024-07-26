import { Link } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 container m-5">
      <Link to={'/create-user'} className="btn">
        Create New User
      </Link>
      <Link to={'/all-user'} className="btn">
        See all User
      </Link>
    </div>
  );
};

export default DashboardAdmin;
