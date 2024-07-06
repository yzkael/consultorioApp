import { useContext } from 'react';
import {useForm} from 'react-hook-form';
import { useMutation, useQueryClient } from "react-query";
import {useToast} from '../context/appContext';
import * as apiClient from '../api-client';
import { useNavigate } from 'react-router-dom';



export interface SignInFormData {
    username: string;
    password: string;
}


const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { notifySuccess, notifyError } = useToast();  
    const {register , formState : {errors}, handleSubmit} = useForm<SignInFormData>()
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: ()=>{
            notifySuccess("Login Succesful"),
            navigate("/success");
        },
        onError: ()=>{
            notifyError("Wrong username or password")
        }
    })


    return (
    <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="w-[60vw] h-[60vh]">
            <form>

            </form>
        </div>
    </div>
  )
}

export default Login
