'use client';
import { PageModel } from "@/app/components/PageModel";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";

export default function CategoriesManage(){
   useAuthGuard(); //Checks if the user is Authenticated;

   //PUXAR CATEGORIAS DO BANCO DE DADOS

   return(
      <PageModel title={'Gerenciar Categorias'}>
         <div className="z-[5] w-fit bg-white rounded-md px-1">
            <table className="text-sm">
               <thead className="h-7">
                  <tr>
                     <th className="w-96">Caregoria</th>
                     <th className="w-36">Tipo</th>
                     <th className="w-32">Icone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="h-9 border-t border-gray-300  hover:bg-gray-100 transition-all cursor-pointer">
                     <td className="pl-1">Viajem</td>
                     <td className="text-center">Despesa</td>
                     <td className="text-center">Viajem</td>
                     <td className="text-center">Viajem</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </PageModel>
   )
}
