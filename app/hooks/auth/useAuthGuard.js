'use client';
import { useAuthStatus } from "@/app/zustand/useAuthStatus";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard(){
   const router = useRouter();
   const setAuth = useAuthStatus((state) => state.setAuth);
   const isAuthenticated = useAuthStatus((state) => state.isAuthenticated);

   useEffect(() => {
      const verifyToken = async () => {
         await fetch('http://localhost/organizze-bk/public/validatetoken.php', {
            method: 'POST',
            credentials: 'include',
         })
         .then(async response => {
            const code = response.status;
            const result = await response.json();
            if(code === 200){
               console.log(result);
            }else{
               window.location.href ='http://localhost:3000/signin';
            }
         })
         .catch(error => {
            window.location.href ='http://localhost:3000/signin';
         })
      }

      if(!isAuthenticated){
         verifyToken();
      }
   });

}