import { useToast } from "../context/ToastContext";
import { useQueryClient, useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const { notifyError, notifySuccess } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(apiClient.logout, {
      onSuccess: () => {
        notifySuccess("Logged Out");
        queryClient.invalidateQueries("validateRole");
        navigate("/");
      },
      onError: (error: Error) => {
        notifyError(`Something went wrong... ${error.message}`);
      },
    });
    const handleClick = () => {
      mutate();
    };
  
    return (
      <button
        className={`p-4 font-bold ${
          isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-slate-300 hover:bg-slate-50"
        }`}
        onClick={handleClick}
        disabled={isLoading}
        aria-label="Sign out"
      >
        {isLoading ? "Signing Out..." : "Sign Out"}
      </button>
    );
  };
  
export default SignOutButton;
  


