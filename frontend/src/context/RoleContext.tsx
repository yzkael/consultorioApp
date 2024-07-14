import React,{  createContext, useContext } from "react";
import { useQuery } from "react-query";
import * as apiClient from '../api-client'

interface UserInfoType {
    userInfo: {
        userId: string;
        userRoles: string[];
    }
}

const RoleContext = createContext<UserInfoType | undefined>(undefined);



export const RoleProvider = ({children}: {children:React.ReactNode})=>{

    const {data:userInfo} = useQuery("validateRole",apiClient.checkRole,{
        retry: false,
    })
    
return(
    <RoleContext.Provider value={userInfo}>
        {children}
    </RoleContext.Provider>
)

}   

export const useRoleContext = ()=>{
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error("The Role Context must be used within its provider");
    }
    return context;
}
