import { useFormContext } from "react-hook-form";
import { UserRegisterFormData } from "./ManageUserRegisterForm";

const FirstPart = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<UserRegisterFormData>();

  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold text-sm">
        Username:
        <input
          type="text"
          className="bg-blue-400 border-black rounded-md p-3"
          {...register("username", { required: "This field is required" })}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </label>
      <label>
        Password:
        <input
          type="password"
          className="bg-blue-400 border-black rounded-md p-3"
          {...register("password", { required: "This field is required" })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </label>
      <label>
       Confirm Password:
        <input
          type="password"
          className="bg-blue-400 border-black rounded-md p-3"
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <label>
        Email: 
        <input type="email" {...register('email',{required: "An email is required"})}/>
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </label>
    </div>
  );
};

export default FirstPart;
