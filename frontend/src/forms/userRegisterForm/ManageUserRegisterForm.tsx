import { FormProvider, useForm } from "react-hook-form";
import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";


interface Props{
    handleRegister: (formData: FormData)=> void;
    isLoading: boolean;
}

export type UserRegisterFormData = {
    username: string;
    password: string;
    confirmPassword: string;
    salary: string;
    email: string;
    [key: string]: any; // This allows for dynamic keys like 'roles[0]', 'roles[1]', etc.
  };

const ManageUserRegisterForm = ({handleRegister,isLoading}:Props) => {
    
    const formMethods = useForm<UserRegisterFormData>()

    const {handleSubmit} = formMethods;

    const onSubmit = handleSubmit((formDataJson:UserRegisterFormData)=>{
        const formData = new FormData();
        formData.append('username',formDataJson.username);
        formData.append('password',formDataJson.password);
        formData.append('confirmPassword',formDataJson.confirmPassword);
        formData.append('salary', formDataJson.salary.toString());
        formData.append('email',formDataJson.email);
        formDataJson.roles.forEach((role,index)=>{
            formData.append(`roles[${index}]`, role);
        })

        handleRegister(formData);
        

    })




  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <FirstPart/>
            <SecondPart/>
            <span>
            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500">
            {isLoading ? "Loading..." : "Submit"}
            </button>
        </span>
        </form>
    </FormProvider>
  )
}

export default ManageUserRegisterForm
