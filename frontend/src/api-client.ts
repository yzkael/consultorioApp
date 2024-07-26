import { UserFormData } from "./pages/Login"

const API_BASE_URI = import.meta.env.VITE_API_BASE_URL;


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
    return data;
};

export const logout = async()=>{
    const response = await fetch(`${API_BASE_URI}/api/auth/logout`,{
        method: "POST",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Error while signing out")
    }
    const data = await response.json();
    return data;
}

type UserRegisterData = {
    username: string;
    password: string;
    confirmPassword: string;
    salary: string;
    email: string;
    [key: string]: any; // This allows for dynamic keys like 'roles[0]', 'roles[1]', etc.
  };
  
  export const createUser = async (userRegisterData: FormData): Promise<any> => {
    // Convert FormData to an object
    const entries: UserRegisterData = Object.fromEntries(userRegisterData) as UserRegisterData;
    console.log(entries);
  
    // Initialize an array to collect roles
    const roles: string[] = [];
  
    // Iterate through entries to collect roles
    for (const key in entries) {
      if (key.startsWith('roles[') && key.endsWith(']')) {
        roles.push(entries[key]);
        delete entries[key]; // Remove the individual role entry
      }
    }
  
    // Add the consolidated roles array to the entries object
    entries.roles = roles;
  
    // Send the modified data to the backend
    const response = await fetch(`${API_BASE_URI}/api/user/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entries),
    });
  
    if (!response.ok) {
      throw new Error("Failed to register new user");
    }
  
    const data = await response.json();
    return data;
  };
  

  export const fetchUsers = async ()=>{
    console.log("Reaching")
    const response = await fetch(`${API_BASE_URI}/api/user/get-all`,{
      method: "GET",
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong...");
    }
    const data = await response.json();
    return data;
  }

  export const deleteUser = async(id:string)=>{
    console.log("Reached")
    const response = await fetch(`${API_BASE_URI}/api/user/${id}`,{
      method: "DELETE",
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Something went wrong...");
    }
    const data = await response.json();
    return data;
  }