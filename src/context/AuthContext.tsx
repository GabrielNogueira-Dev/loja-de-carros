
import { auth } from "../services/firebaseconection";
import { onAuthStateChanged } from "firebase/auth";

import {createContext, useState,useEffect, type ReactNode } from "react";
import { set } from "react-hook-form";


interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextData = {
    signed: boolean;
    loadingAuth:boolean;
}

interface UserProps {
    uid:string;
    name:string | null ;
    email:string | null;
}

export const  AuthContext = createContext({} as AuthContextData)

function AuthProvider({children} : AuthProviderProps) {
    const [user,setUser] = useState<UserProps | null>(null);
    const [loadingAuth,setLoadingAuth] = useState(true)

useEffect(() => {

const unsub =onAuthStateChanged(auth,(user) => {
    if(user){
        setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
        })
        setLoadingAuth(false);

    }else{
        setUser(null);
        setLoadingAuth(false);
    }
})
return () => {
    unsub();
}
},[])

return(
    <AuthContext.Provider value = {{signed:!!user, loadingAuth,}}>
        {children}
    </AuthContext.Provider>
)
}

export {AuthProvider};