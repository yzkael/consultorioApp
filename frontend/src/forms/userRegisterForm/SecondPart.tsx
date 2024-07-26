import { useFormContext } from "react-hook-form";
import { UserRegisterFormData } from "./ManageUserRegisterForm";
import { userRoles } from "../../config/user-create-config";

const SecondPart = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserRegisterFormData>();

  return (
    <div className="flex flex-col gap-4">
      <label>
        Salary:
        <input
          type="number"
          min="2550"
          placeholder="2550"
          step="50"
          className="bg-blue-400 border-black rounded-md p-3"
          {...register("salary", { required: "A salary is required" })}
        />
        {errors.salary && <span>{errors.salary.message}</span>}
      </label>
      <div className="grid grid-cols-2 gap-4 bg-slate-400 border-blue-950">
        <h2>Roles:</h2>
        {userRoles.map((role) => (
          <label className="flex gap-1">
            <input
              type="checkbox"
              value={role}
              {...register("roles", {
                validate: (roles) => {
                  if (roles && roles.length > 0) {
                    return true;
                  }
                  return "At least one role is required";
                },
              })}
            />
            {role}
          </label>
        ))}
        {errors.roles && <span className="text-red-500 text-sm">{errors.roles.message}</span>}
      </div>
    </div>
  );
};

export default SecondPart;
