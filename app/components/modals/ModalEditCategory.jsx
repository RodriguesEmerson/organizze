'use client';

import { useEffect, useState } from "react"
import { ButtonClose } from "../buttons/ButtonClose"
import { ButtonSave } from "../buttons/ButtonSave";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { Spinner } from "../loads/spinner";
import { IconSelect } from "../selects/IconSelect";
import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";
import { useUpdateCategories } from "@/app/hooks/categories/useUpdateCategory";
import { ModalBackGround } from "./ModalBackGround";
import { ButtonDelete } from "../buttons/ButtonDelete";
import { useDeleteCategory } from "@/app/hooks/categories/useDeleteCategory";
import { useModalConfirmActionStore } from "@/app/zustand/useModalConfirmActionStore";

/**
 * ModalEditCategory exibe um modal para edição de categorias de despesas ou receitas.
 * 
 * O modal permite alterar o nome, tipo e ícone da categoria atualmente selecionada para edição.
 * A visibilidade do modal é controlada pelo Zustand.
 * 
 * O conteúdo do modal é renderizado apenas se o estado indicar que o modal deve estar visível.
 */
export function ModalEditCategory() {
   const showEditCategoryModal = useModalsHiddenStore((state) => state.showEditCategoryModal);

   if (!showEditCategoryModal) return null;
   return <ModalEditCategoryBody />;
}

/**
 * Corpo do modal de edição de categoria, com formulário para alteração e opções de exclusão.
 * 
 * Exibe spinner enquanto os dados da categoria para edição não forem carregados.
 * 
 * Permite:
 * - Alterar nome da categoria.
 * - Alterar tipo da categoria (despesa ou receita).
 * - Alterar ícone da categoria.
 * - Excluir categoria com confirmação via modal confirm action.
 */
function ModalEditCategoryBody() {
   const { updateCategoryHandler, loading } = useUpdateCategories();
   const { deleteCategoryHandler, deleting } = useDeleteCategory();
   const setShowEditCategoryModal = useModalsHiddenStore(state => state.setShowEditCategoryModal);
   const setShowAddConfirmModal = useModalsHiddenStore(state => state.setShowAddConfirmModal);
   const setAction = useModalConfirmActionStore(state => state.setAction);

   const icons = useCategoriesDataStore(state => state.icons);
   const editingCategory = useCategoriesDataStore(state => state.editingCategory);
   const [formData, setFormData] = useState();

   // Atualiza o formulário com os dados da categoria em edição ao abrir modal
   useEffect(() => {
      if (editingCategory) {
         setFormData({
            name: editingCategory.name,
            type: editingCategory.type,
            icon: editingCategory.icon,
            id: editingCategory.id
         });
      }
   }, [editingCategory]);

   return (
      <ModalBackGround>
         <div className="relative modal flex flex-col justify-between h-fit w-[350px] bg-white rounded-md shadow-lg py-2 px-3">

            {/* Cabeçalho do modal */}
            <div className="text-center h-9 leading-7 w-[350px] rounded-t-md -ml-3 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-gray-900 text-white">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/gif/edit.gif"} />
               </div>
               <h4>Editando Categoria</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => setShowEditCategoryModal(false)} />
               </div>
            </div>

            {/* Spinner enquanto dados não carregam */}
            {!formData && <Spinner />}

            {/* Formulário de edição */}
            {formData &&
               <form className="flex flex-col gap-4 text-sm">
                  {/* Campo para nome da categoria */}
                  <div className="flex items-center flex-row gap-2">
                     <label className="font-bold">Categoria:</label>
                     <input
                        className="h-8 pl-2 font-thin w-full border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                        type="text"
                        name="category"
                        placeholder="Categoria..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        autoFocus
                        maxLength={50}
                     />
                  </div>

                  {/* Tipo e seleção do ícone */}
                  <div className="flex flex-row justify-between gap-2">
                     <div className="flex items-center flex-row gap-2 mb-2 pr-2">
                        <p className="font-bold">Tipo:</p>
                        <input
                           id="expenseradio"
                           type="radio"
                           name="type"
                           checked={formData.type == 'expense'}
                           onChange={() => setFormData({ ...formData, type: 'expense' })}
                        />
                        <label htmlFor="expenseradio" className="-ml-1">Despesa</label>
                        <input
                           id="incomeradio"
                           type="radio"
                           name="type"
                           checked={formData.type == 'income'}
                           onChange={() => setFormData({ ...formData, type: 'income' })}
                        />
                        <label htmlFor="incomeradio" className="-ml-1">Receita</label>
                     </div>

                     <div className="flex items-center flex-row gap-2 mb-2">
                        <label className="-ml-1 font-bold">Ícone:</label>
                        <IconSelect
                           currentIcon={formData.icon}
                           formData={formData}
                           setFormData={setFormData}
                           icons={icons}
                        />
                     </div>
                  </div>

                  {/* Botões de salvar e excluir */}
                  <div>
                     <ButtonSave
                        onClick={() => updateCategoryHandler.update(formData, editingCategory)}
                        text="Salvar alterações"
                     >
                        {loading && <Spinner />}
                     </ButtonSave>

                     <div className="flex flex-row items-center">
                        <div className="flex-1"><hr /></div>
                        <span className="px-2">ou</span>
                        <div className="flex-1"><hr /></div>
                     </div>

                     <ButtonDelete
                        onClick={(e) => {
                           e.preventDefault();
                           setAction(() => deleteCategoryHandler.delete(editingCategory));
                           setShowAddConfirmModal(true);
                        }}
                        text={`Excluir categoria`}
                     >
                        {deleting && <Spinner />}
                     </ButtonDelete>
                  </div>
               </form>
            }

            {/* Aviso sobre impacto da alteração ou exclusão */}
            <div className="flex flex-row items-center gap-2 mt-2 justify-center text-xs text-red-800">
               <span className="material-icons-outlined pl-3">warning</span>
               <p className="w-[85%]">
                  Atenção. Ao alterar ou excluir uma categoria, todos os lançamentos com a respectiva categoria serão alterados!
               </p>
            </div>
         </div>
      </ModalBackGround>
   )
}
