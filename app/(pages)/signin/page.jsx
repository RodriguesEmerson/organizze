'use client';
import { Spinner } from "@/app/components/loads/spinner";
import { useSignin } from "@/app/hooks/auth/signin";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import Link from "next/link";
import { useState } from "react";

/**
 * Página de login (SignIn).
 *
 * Redireciona o usuário autenticado para outra rota caso já possua um token válido,
 * utilizando o hook `useAuthGuard(true)`.
 *
 * Renderiza o formulário de autenticação com campos de e-mail, senha e checkbox de "lembrar por 30 dias".
 * Também apresenta feedback visual para carregamento (spinner) e mensagens de erro, caso ocorra falha na autenticação.
 *
 * Utiliza o hook `useSignin` para processar o login.
 *
 * @returns {JSX.Element} Componente de login com formulário e lógica de autenticação.
 */
export default function Signin() {
   useAuthGuard(true); // Redireciona o usuário se já estiver logado.
   return <SigninForm />;
}

/**
 * Componente de formulário de login.
 *
 * - Captura os dados do usuário: e-mail, senha e preferência de lembrança.
 * - Gerencia o estado de carregamento e erro.
 * - Exibe um botão de login com ícone de carregamento condicional.
 * - Fornece link de navegação para página de cadastro.
 *
 * @returns {JSX.Element} Formulário de autenticação estilizado.
 */
function SigninForm() {
   const [data, setData] = useState({ email: '', password: '', remember: false });
   const [status, setStatus] = useState({ loading: false, error: { status: false, message: '' } });

   return (
      <main className="relative flex justify-center items-center" style={{ height: "calc(100vh - 48px)" }}>
         <section className="bg-white rounded-md h-[26rem] w-80 p-3 pt-4 shadow-md relative">
            <div>
               <h2 className="text-center text-gray-900 font-extrabold text-2xl">Entrar</h2>
            </div>
            <div className="h-[90%] content-center">
               <form className="flex flex-col gap-3">
                  {/* Campo de e-mail */}
                  <input type="email" 
                     className="border border-gray-300 text-sm rounded-[4px] h-9 pl-2"
                     value={data.email}
                     placeholder="Email"
                     onChange={(e) => { setData({ ...data, email: e.target.value }); setStatus({ ...status, error: false }) }}
                  />

                  {/* Campo de senha */}
                  <input type="password" 
                     className="border border-gray-300 text-sm rounded-[4px] h-9 pl-2"
                     value={data.password}
                     placeholder="Senha"
                     onChange={(e) => { setData({ ...data, password: e.target.value }); setStatus({ ...status, error: false }) }}
                  />

                  {/* Checkbox "lembrar por 30 dias" */}
                  <div className="flex justify-end gap-1">
                     <input type="checkbox"
                        className="w-3"
                        checked={data.remember}
                        onChange={() => { setData({ ...data, remember: !data.remember }) }}
                     />
                     <label className="text-xs">Lembrar por 30 dias</label>
                  </div>

                  {/* Botão de login */}
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        setStatus({ ...status, loading: true });
                        useSignin(data, setStatus, status);
                     }}
                     className="h-10 bg-gray-800 rounded-md text-white mt-2 transition-all hover:bg-gray-900"
                  >
                     {status.loading ? <Spinner /> : "Entrar"}
                  </button>
               </form>

               {/* Exibição de erro */}
               {status.error.status &&
                  <p className="text-red-800 text-center text-sm mt-6">{status.error.message}</p>
               }

               {/* Link para cadastro */}
               <div className="flex flex-row gap-1 items-center justify-center text-sm absolute bottom-2 w-[92%]">
                  <p>Ainda não tem conta?</p>
                  <Link href="/signup"
                     className="h-8 w-fit px-2 leading-8 text-blue-900 rounded-md transition-all hover:underline"
                  >
                     Cadastre-se
                  </Link>
               </div>
            </div>
         </section>
      </main>
   );
}
