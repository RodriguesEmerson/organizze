export async function useSignin(formData){
   const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
      remember: formData.get('remember'),
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
            window.location.href = result.redirect;
         }
      })
      .catch(error => {
         console.log(error)
      })
   }
}