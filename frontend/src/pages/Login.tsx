import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/RoleContext";

export interface UserFormData {
  username: string;
  password: string;
}

const Login = () => {
 
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useToast();  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const {isLoggedIn} = useAuth();
  if (isLoggedIn) {
    navigate('/dashboard')
  }

  const { mutate, isLoading } = useMutation(apiClient.signUp, {
    onSuccess: async () => {
      notifySuccess("Login Succesfully!");
      navigate("/dashboard");
    },
    onError: async (error: Error) => {
      notifyError(`${error.message}`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <span className="text-sm text-red-600">
            {errors.username.message}
          </span>
        )}
      </label>
      <label>
        Password:
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-sm text-red-600">
            {errors.password.message}
          </span>
        )}
      </label>
        <button type="submit" className="p-4 bg-blue-600 border text-white rounded-md" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"};
        </button>
    </form>
  );
};

export default Login;
