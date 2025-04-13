'use client';
import { useSignin } from "@/app/hooks/auth/signin";

export default function Signin(){
   return (
      <main 
         className="relative flex justify-center items-center"
         style={{ height: "calc(100vh - 48px)" }}
      >
         <section className="bg-white rounded-md h-[26rem] w-80 p-3 pt-4 shadow-xl">

            <h1 className="text-center text-gray-900 font-extrabold text-2xl">SignIn</h1>

            <div className="h-[90%] content-center">
               <form action={useSignin} className="flex flex-col gap-2">
                  <div className="flex flex-col">
                     <label htmlFor="signin-email" className="text-gray-500 pl-1">E-mail</label>
                     <input type="email" name="email" id="signin-email" required
                        className="border border-gray-500 rounded-md h-8 pl-2"
                     />
                  </div>
                  <div className="flex flex-col">
                     <label htmlFor="signin-password" className="text-gray-500 pl-1">Password</label>
                     <input type="password" name="password" id="signin-password" required
                         className="border border-gray-500 rounded-md h-8 pl-2"
                     />
                  </div>
                  <div className="flex justify-end gap-1">
                     <input type="checkbox" name="remember" id="remember-checkbox" className="w-3"/>
                     <label htmlFor="remember-checkbox" className="text-sm">Remember-me</label>
                  </div>

                  <input type="submit" value="Sign In" 
                     className="h-10 bg-gray-800 rounded-md text-white cursor-pointer mt-2 transition-all hover:bg-gray-900"
                  />
               </form>
            </div>
         </section>
      </main>
   )
} 
