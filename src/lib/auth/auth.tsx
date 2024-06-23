'use client';

import { User } from "firebase/auth";
import React, { Dispatch, SetStateAction, useState, createContext, useContext } from "react";

type AppProviderProps = {
  children: React.ReactNode;
}

type AuthContextType ={
  user: User | null,
  setUser: Dispatch<SetStateAction<User | null>>,
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export function AuthProvider({ children }: AppProviderProps) {
  const [ user, setUser ] = useState<AuthContextType['user']>(null);

return <AuthContext.Provider value={{ user, setUser }}>
  {children}
</AuthContext.Provider>
};

export function useAuthContext() {
  return useContext(AuthContext);
}
