import {useMutation} from 'react-query';
import * as apiClient from '../api-client';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import ManageUserRegisterForm from '../forms/userRegisterForm/ManageUserRegisterForm';

const AddUser = () => {
    const navigate = useNavigate();
    const {notifyError, notifySuccess} = useToast()
    const {mutate, isLoading} = useMutation(apiClient.createUser,{
        onSuccess: ()=>{
            notifySuccess("User registered Succesfully");
            navigate('/dashboard');
        },
        onError: ()=>{
            notifyError("Something went wrong...");
        }
    });

    const handleRegister= (userFormData: FormData)=>{
        mutate(userFormData);
    }
  return (
    <div className='container w-[70%] h-10'>
        <ManageUserRegisterForm handleRegister={handleRegister} isLoading={isLoading}/>
    </div>
  )
}

export default AddUser
