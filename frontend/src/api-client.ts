import { SignInFormData } from "./page/Login";

export const signIn = async(formData: SignInFormData)=>{
    const response = await fetch("http://localhost:3000/api/auth",{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message)
    }

    return body;
};