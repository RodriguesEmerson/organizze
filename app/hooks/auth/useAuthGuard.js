'use client';
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useEffect } from "react";

export function useAuthGuard(){
   const setAuth = useAuthStatus((state) => state.setAuth);
   const isAuthenticated = useAuthStatus((state) => state.isAuthenticated);

   useEffect(() => {
      const verifyToken = async () => {
         await fetch('http://localhost/organizze-bk/public/validatetoken.php', {
            method: 'POST',
            credentials: 'include'
         })
         .then(async response => {
            if(response.status === 200){
               setAuth(true);
            }else{
               setAuth(false);
               window.location.href ='http://localhost:3000/signin';
            }
         })
         .catch(error => {
            setAuth(false);
            window.location.href ='http://localhost:3000/signin';
         })
      }

      if(!isAuthenticated){
         verifyToken();
      }
   });
}