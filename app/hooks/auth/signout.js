
export async function useSignout(setAuth, setNotifications, gerarCUID){

   await fetch('http://localhost/organizze-bk/public/auth/signout.php', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
   })
   .then(async response => {
      const result = await response.json();
      if(response.status == 200){
         setAuth(false);
         return window.location.href = result.redirect;
      }
      setNotifications('Error ao tentar sair. Atualize a página e tente novamente.', 'error', gerarCUID());
      
   })
   .catch(error => {
      setNotifications('Error ao tentar sair. Atualize a página e tente novamente.', 'error', gerarCUID());
      console.log(error);
   })
   return;
}