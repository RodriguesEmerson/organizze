'use client';
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useEffect } from "react";

export function useAuthGuard(redirect = false){
   const setAuth = useAuthStatus((state) => state.setAuth);
   const isAuthenticated = useAuthStatus((state) => state.isAuthenticated);

   useEffect(() => {
      const verifyToken = async () => {
         await fetch('http://localhost/organizze-bk/public/auth/validatetoken.php', {
            method: 'POST',
            credentials: 'include'
         })
         .then(async response => {
            const result = await response.json();
            if(response.status === 200){
               setAuth(true);
               if(redirect){
                   return window.location.href = result.redirect;
               }
            }else{
               if(!redirect){
                  setAuth(false);
                  window.location.href ='http://localhost:3000/signin';
               }
            }  
         })
         .catch(error => {
            if(!redirect){
               setAuth(false);
               window.location.href ='http://localhost:3000/signin';
            }
         })
      }

      if(!isAuthenticated){
         verifyToken();
      }
   });
}