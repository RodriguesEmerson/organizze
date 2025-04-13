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
            // credentials: 'include',
            // headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'}
         })
         .then(async response => {
            const d = await response.json();
            console.log(d);
         })
         .catch(error => {
            // router.push('http://localhost:3000/signin')
            console.log('Error: ' + error);
         })
      }

      if(!isAuthenticated){
         verifyToken();
      }
   });

}