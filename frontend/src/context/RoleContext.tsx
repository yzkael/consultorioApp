
import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { checkRole } from '../api-client';


export interface UserInfoType {
    userInfo: {
      userId: string;
      userRoles: string[];
    }
  }
  
  export interface AuthContextType {
    userId: string | null;
    roles: string[] | null; 
    isLoggedIn: boolean;
  }
  

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider= ({ children }:{children:ReactNode}) => {
  const { data: userInfo, isError } = useQuery<UserInfoType>('validateRole', checkRole, {
    retry: false,
  });

  const userId = userInfo ? userInfo.userInfo.userId : null;
  const roles = userInfo ? userInfo.userInfo.userRoles : null;

  const authContextValue: AuthContextType = {
    userId,
    roles,
    isLoggedIn: !isError,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
