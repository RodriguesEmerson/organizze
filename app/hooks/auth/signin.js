export async function useSignin(data, setStatus, status){
   const credentials = {
      email: data.email,
      password: data.password,
      remember: data.remember,
   }

   if(credentials.email && credentials.password){
      await fetch('http://localhost/organizze-bk/public/signin.php', {
         method: 'POST', 
         headers: {'Content-Type': 'application/json'},
         credentials: 'include',
         body: JSON.stringify(credentials)
      })
      .then(async response => {
         const result = await response.json();
         if(result.success){
            return window.location.href = result.redirect;
         }

         setStatus({loading: false, error: {status: true, message: 'E-mail ou senha inválidos, tente novamente.'}});
      })
      .catch(error => {
         console.log(error);
         setStatus({loading: false, error: {status: true, message: 'E-mail ou senha inválidos, tente novamente.'}});
      })
      return;
   }
   
   setStatus({loading: false, error: {status: true, message: 'Preencha todos os campos.'}});
   console.log(status)
}