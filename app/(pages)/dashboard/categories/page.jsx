'use client';
import { ButtonDelete } from "@/app/components/buttons/ButtonDelete";
import { ButtonSave } from "@/app/components/buttons/ButtonSave";
import { Spinner } from "@/app/components/loads/spinner";
import { PageModel } from "@/app/components/PageModel";
import { IconSelect } from "@/app/components/selects/IconSelect";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useGetCategories } from "@/app/hooks/categories/useGetCategories";
import { useEffect, useState } from "react";
import { useCategoriesHandler } from "@/app/hooks/categories/useCategoriesHandler";
import { ToastNotifications } from "@/app/components/notificatons/ToastNotifications";
import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { ModalEditCategory } from "@/app/components/modals/ModalEditCategory";
import { useDeleteCategory } from "@/app/hooks/categories/useDeleteCategory";
import { TableSkeleton } from "@/app/components/loads/TableSkeleton";

export default function CategoriesManage() {
   useAuthGuard(); //Checks if the user is Authenticated;

   const { getCategories } = useGetCategories();
   const categories = useCategoriesDataStore(state => state.categories);
   const categoriesLoadedType = useCategoriesDataStore(state => state.categoriesLoadedType);
   const setCategoriesLoadedType = useCategoriesDataStore(state => state.setCategoriesLoadedType);

   if (categoriesLoadedType != 'all') {
      getCategories();
      setCategoriesLoadedType('all');
   }

   //CONSERTAR BUG DE QUE ABRE CATEGORIAS JÁ CARREGADAS EM OUTRA ABA

   return (
      <>
         <ModalEditCategory />
         <ToastNotifications />
         <PageModel title={'Gerenciar Categorias'}>
            <FormNewCategory categories={categories} />
            <div className="z-[5] max-w-[730px] w-fit bg-white rounded-md px-1 shadow-md">
               <table className="text-sm">
                  <thead className="h-7">
                     <tr>
                        <th scope="col" className="w-96">Categoria</th>
                        <th scope="col" className="w-40">Tipo</th>
                        <th scope="col" className="w-36">Icone</th>
                        {!categories && 
                        <th scope="col" className="w-9"></th>
                        }
                     </tr>
                  </thead>
                  <tbody>
                     {categories && categories.map(category => (
                        <Tr key={category.id} category={category} />
                     ))}
                  </tbody>
               </table>

               {!categories &&
                  <TableSkeleton />
               }
            </div>
         </PageModel>
      </>
   )
}

function Tr({ category }) {
   const { deleteCategoryHandler, deleting } = useDeleteCategory();
   const setShowEditCategoryModal = useModalsHiddenStore(state => state.setShowEditCategoryModal);
   const setEditingCategory = useCategoriesDataStore(state => state.setEditingCategory);
   return (
      <tr key={category.id}
         className={`h-9 border-t border-gray-200  hover:bg-gray-100 transition-all cursor-pointer
            ${category.type == 'expense' ? 'text-red-800' : 'text-green-800'}`}
         onClick={() => {
            setShowEditCategoryModal(true);
            setEditingCategory(category);
         }}
      >
         <td className="pl-1">{category.name}</td>
         <td className="text-center">{category.type == 'expense' ? 'Despesa' : 'Receita'}</td>
         <td className="text-center">
            <img className="w-5 h-5 m-auto" src={`/icons/${category.icon}`} />
         </td>
         <td className="text-center">
            {deleting &&
               <Spinner size={5}/>
            }
            {!deleting &&
               <ButtonDelete onClick={(e) => {e.stopPropagation(); deleteCategoryHandler.delete(category)}}/>
            }
         </td>
      </tr>
   )
}

function FormNewCategory({ categories }) {
   const { categoriesHandler, insertCategoryStatus } = useCategoriesHandler();
   const [formData, setFormData] = useState({ name: '', type: '', icon: 'c-icon-0.png' });
   const icons = useCategoriesDataStore(state => state.icons);

   useEffect(() => {
      if (insertCategoryStatus.success) {
         setFormData({ name: '', type: '', icon: 'c-icon-0.png' })
      }
   }, [insertCategoryStatus.success]);

   return (
      <div className="bg-white rounded-md text-sm w-fit mb-2 shadow-md">
         <div className="bg-cyan-600 text-white rounded-t-md text-center h-7 leading-7">
            <h3>Adicionar nova categoria</h3>
         </div>
         <form className="flex flex-row gap-4  p-2">
            <div className="flex items-center flex-row gap-2 mb-2 pr-2 border-r border-r-gray-400">
               <label className="pl-1 font-bold">Categoria:</label>
               <input
                  className="h-8 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                  type="text"
                  name="category"
                  placeholder="Catgoria..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoFocus
                  maxLength={50}
               />
            </div>

            <div className="flex items-center flex-row gap-2 mb-2 pr-2  border-r border-r-gray-400">
               <p className="font-bold">Tipo:</p>
               <input
                  className="h-4 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                  id="expenseradio"
                  type="radio"
                  name="type"
                  onChange={(e) => setFormData({ ...formData, type: 'expense' })}
               />
               <label htmlFor="expenseradio" className="-ml-1">Despesa</label>
               <input
                  className="h-4 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                  id="incomeradio"
                  type="radio"
                  name="type"
                  onChange={(e) => setFormData({ ...formData, type: 'income' })}
               />
               <label htmlFor="incomeradio" className="-ml-1">Receita</label>
            </div>
            <div className="flex items-center flex-row gap-2 mb-2">
               <label className="-ml-1 font-bold">Ícone:</label>
               < IconSelect
                  currentIcon={formData.icon}
                  formData={formData}
                  setFormData={setFormData}
                  icons={icons}
               />
            </div>
            <div>
               <ButtonSave
                  onClick={() => { categoriesHandler.insertCategory(formData, categories) }}
               >
                  {insertCategoryStatus.loading
                     ? <Spinner />
                     : <span>Adicionar</span>
                  }
               </ButtonSave>
            </div>
         </form>
      </div>
   )
}
