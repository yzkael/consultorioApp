import { UserFormData } from "./pages/Login"

export const signUp = async (formData: UserFormData) =>{
    console.log(formData);
    const response = await fetch('http://localhost:3000/api/auth/login',{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
} 

export const checkRole = async ()=>{
    const response =  await fetch('http://localhost:3000/api/auth/check-user',{
        credentials:"include",
    });
    if (!response.ok) {
        throw new Error("Token Invalid");
    }
    const data = await response.json();
    console.log(data);
    return data;
};