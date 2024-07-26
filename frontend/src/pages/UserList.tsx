import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";


export interface UserData {
  userId: string;
  username: string;
  salary: number;
  roles: string[];
  email: string;
  createdBy: string;
  createdAt: string;
}

const UserList = () => {
  const { notifyError,notifySuccess } = useToast();
  const queryClient = useQueryClient();

  const {mutate} = useMutation(apiClient.deleteUser,{
    onSuccess: ()=>{
      notifySuccess("User Deleted Succesfully");
      queryClient.invalidateQueries('fetchUsers');
    },
    onError: ()=>{
      notifyError("Error while trying to delete...");
    }
  });
  const { data: userData } = useQuery("fetchUsers", apiClient.fetchUsers, {
    onError: () => {
      notifyError("Something went wrong...");
    },
  });

  const handleClick = (id: string)=>{
    mutate(id);
  }


  if (!userData) {
    return (
      <div className="flex w-full justify-center items-center">
        No User Data Available!
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-10">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Salary</th>
            <th>Roles</th>
            <th>Email</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>Utilities</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user: UserData) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.salary}</td>
              <td>{user.roles}</td>
              <td>{user.email}</td>
              <td>{user.createdBy}</td>
              <td>{user.createdAt}</td>
              <td className="flex gap-2">
                <Link to={"/"}>
                  <CiEdit size={25} />
                </Link>{" "}
                <button onClick={()=> handleClick(user.userId)}>
                  <MdDelete size={25} />
                </button>
                <Link to={"/"}>
                  <FaInfoCircle size={25} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/dashboard-admin"} className="btn mx-auto">
        Go back
      </Link>
    </div>
  );
};

export default UserList;
