'use client';
import { Spinner } from "@/app/components/loads/spinner";
import { PageModel } from "@/app/components/PageModel";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useGetCategories } from "@/app/hooks/categories/useCategoreisHandler";
import { useEffect, useState } from "react";

export default function CategoriesManage(){
   useAuthGuard(); //Checks if the user is Authenticated;

   const { categories } = useGetCategories();

   return(
      <PageModel title={'Gerenciar Categorias'}>
         <div className="z-[5] w-fit bg-white rounded-md px-1">
               
            <table className="text-sm">
               <thead className="h-7">
                  <tr>
                     <th className="w-96">Categoria</th>
                     <th className="w-36">Tipo</th>
                     <th className="w-32">Icone</th>
                  </tr>
               </thead>
               <tbody>
               {categories && categories.map(category => (
                  <tr key={category.id} className="h-9 border-t border-gray-300  hover:bg-gray-100 transition-all cursor-pointer">
                     <td className="pl-1">{category.name}</td>
                     <td className="text-center">{category.type == 'expense' ? 'Despesa': 'Receita'}</td>
                     <td className="text-center">{category.image}</td>
                     <td className="text-center">Viajem</td>
                  </tr>
               ))}
               </tbody>
            </table>
               
               {!categories && 
                   <Spinner />
               }
         </div>
      </PageModel>
   )
}
