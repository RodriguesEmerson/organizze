import { useEffect, useState } from "react";

export function useGetUserInfo() {

   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      const getEntries = async () => {
         await fetch(`http://localhost/organizze-bk/public/auth/userinfo.php`, {
            method: 'GET',
            credentials: 'include'
         })
            .then(async response => {
               const data = await response.json();
               if (response.status == 200) {
                 setUserInfo(data);
               }
               if (response.status == 401) {
                  window.location.href = 'http://localhost:3000/signin';
                  return;
               }
            })
            .catch(error => {
               setUserInfo({ erro: true })
               console.log(error)
            })
      }
      getEntries()
   }, []);

   return { userInfo };

}