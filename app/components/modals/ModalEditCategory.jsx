'use client';
import { useEffect, useState } from "react"
import { ButtonClose } from "../buttons/ButtonClose"
import { ButtonSave } from "../buttons/ButtonSave";
import { ModalBackGround } from "./../ModalBackGround";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { Spinner } from "../loads/spinner";
import { IconSelect } from "../selects/IconSelect";
import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";
import { useUpdateCategories } from "@/app/hooks/categories/useUpdateCategory";

export function ModalEditCategory() {
   const showEditCategoryModal = useModalsHiddenStore((state) => state.showEditCategoryModal);
   if (showEditCategoryModal) {
      return (
         <ModalEditCategoryBody />
      );
   }
}

function ModalEditCategoryBody() {

   const { updateCategoryHandler, loading } = useUpdateCategories();
   const setShowEditCategoryModal = useModalsHiddenStore(state => state.setShowEditCategoryModal);
   const icons = useCategoriesDataStore(state => state.icons);
   const editingCategory = useCategoriesDataStore(state => state.editingCategory);
   const [formData, setFormData] = useState();

   useEffect(() => {
      if (editingCategory) {
         setFormData({
            name: editingCategory.name, type: editingCategory.type, icon: editingCategory.icon, id: editingCategory.id
         })
      }
   }, [editingCategory]);

   return (
      <ModalBackGround >
         <div className="relative modal flex flex-col justify-between h-fit w-[350px] bg-white rounded-md shadow-lg py-2 px-3">

            <div className="text-center h-9 leading-7 w-[350px] rounded-t-md -ml-3 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-cyan-600 text-white">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/gif/edit.gif"} />
               </div>
               <h4>Editando Categoria</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => { setShowEditCategoryModal(false) }} />
               </div>
            </div>

            <div>
               {!formData &&
                  <Spinner />
               }
               {formData &&
                  <form className="flex flex-col gap-4 p-2=1 text-sm">
                     <div className="flex items-center flex-row gap-2">
                        <label className="font-bold">Categoria:</label>
                        <input
                           className="h-8 pl-2 font-thin w-full border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                           type="text"
                           name="category"
                           placeholder="Catgoria..."
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                           autoFocus
                           maxLength={50}
                        />
                     </div>
                     
                     <div className="flex flex-row justify-between gap-2">
                        <div className="flex items-center flex-row gap-2 mb-2 pr-2">
                           <p className="font-bold">Tipo:</p>
                           <input
                              className="h-4 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                              id="expenseradio"
                              type="radio"
                              name="type"
                              checked={formData.type == 'expense' && true}
                              onChange={(e) => setFormData({ ...formData, type: 'expense' })}
                           />
                           <label htmlFor="expenseradio" className="-ml-1">Despesa</label>
                           <input
                              className="h-4 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                              id="incomeradio"
                              type="radio"
                              name="type"
                              checked={formData.type == 'income' && true}
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
                     </div>
                     <div>
                        <ButtonSave
                           onClick={() => { updateCategoryHandler.update(formData, editingCategory) }}
                           text="Salvar alteraçôes"
                        >{loading &&
                           <Spinner />
                           }</ ButtonSave >
                     </div>
                  </form>
               }

            </div>
         </div>
      </ModalBackGround>
   )
}