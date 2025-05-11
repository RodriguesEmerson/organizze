'use client';
import { useSignin } from "@/app/hooks/auth/signin";
import { Spinner } from "@/app/components/loads/spinner";
import { useState } from "react";
import Link from "next/link";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";

export default function Signin() {
   useAuthGuard(true); //Redireciona o usuário se já existir um token válido e o parâmetro for TRUE.

   return(
      <SigninForm />
   )
}

function SigninForm() {
   const [data, setData] = useState({ email: '', password: '', remember: false });
   const [status, setStatus] = useState({ loading: false, error: { status: false, message: '' } });

   return (
      <main
         className="relative flex justify-center items-center"
         style={{ height: "calc(100vh - 48px)" }}
      >
         <section className="bg-white rounded-md h-[26rem] w-80 p-3 pt-4 shadow-md relative">
            <div>
               <h2 className="text-center text-gray-900 font-extrabold text-2xl">Entrar</h2>
            </div>
            <div className="h-[90%] content-center">
               <form className="flex flex-col gap-3">
                  <div className="flex flex-col">
                     {/* <label htmlFor="signin-email" className="text-gray-500 text-sm pl-1">E-mail</label> */}
                     <input type="email" name="email" id="signin-email" required
                        className="border border-gray-300 text-sm rounded-[4px] h-9 pl-2"
                        value={data.email}
                        placeholder="Email"
                        onChange={(e) => { setData({ ...data, email: e.target.value }); setStatus({ ...status, error: false }) }}
                     />
                  </div>
                  <div className="flex flex-col">
                     {/* <label htmlFor="signin-password" className="text-gray-500 text-sm pl-1">Senha</label> */}
                     <input type="password" name="password" id="signin-password" required
                        className="border border-gray-300 text-sm rounded-[4px] h-9 pl-2"
                        value={data.password}
                        placeholder="Senha"
                        onChange={(e) => { setData({ ...data, password: e.target.value }); setStatus({ ...status, error: false }) }}
                     />
                  </div>
                  <div className="flex justify-end gap-1">
                     <input type="checkbox"
                        name="remember"
                        id="remember-checkbox"
                        className="w-3"
                        checked={data.remember}
                        onChange={(e) => { setData({ ...data, remember: !data.remember }) }}
                     />
                     <label htmlFor="remember-checkbox" className="text-xs">Lembrar por 30 dias</label>
                  </div>

                  <button onClick={(e) => { e.preventDefault(); setStatus({ ...status, loading: true }); useSignin(data, setStatus, status) }}
                     className="h-10 bg-gray-800 rounded-md text-white cursor-pointer mt-2 transition-all hover:bg-gray-900"
                  >{status.loading
                     ? <Spinner />
                     : "Entrar"
                  }</button>
               </form>

               {status.error.status &&
                  <p className="text-red-800 text-center text-sm mt-6">{status.error.message}</p>
               }

               <div className="flex flex-row gap-1 items-center justify-center text-sm w-[92%] absolute bottom-2">
                  <p>Ainda não tem conta?</p>
                  <Link href={'http://localhost:3000/signup'}
                     className="block h-8 w-fit px-2 leading-8 text-blue-900 rounded-md cursor-pointer transition-all hover:underline"
                  >
                     Cadastre-se
                  </Link>
               </div>
            </div>
         </section>
      </main>
   )
}
