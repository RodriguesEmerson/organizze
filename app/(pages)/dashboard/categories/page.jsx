'use client';

import { ButtonSave } from "@/app/components/buttons/ButtonSave";
import { Spinner } from "@/app/components/loads/spinner";
import { TableSkeleton } from "@/app/components/loads/TableSkeleton";
import { ModalConfirmAction } from "@/app/components/modals/ModalConfirmAction";
import { ModalEditCategory } from "@/app/components/modals/ModalEditCategory";
import { ToastNotifications } from "@/app/components/notificatons/ToastNotifications";
import { PageModel } from "@/app/components/PageModel";
import { IconSelect } from "@/app/components/selects/IconSelect";

import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useCategoriesHandler } from "@/app/hooks/categories/useCategoriesHandler";
import { useGetCategories } from "@/app/hooks/categories/useGetCategories";

import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

import { useEffect, useState } from "react";

/**
 * Página para gerenciar categorias de despesas e receitas.
 *
 * - Aplica proteção de rota com `useAuthGuard` para redirecionar usuários não autenticados.
 * - Carrega categorias da API e armazena no Zustand.
 * - Renderiza os modais globais (edição, confirmação e notificações).
 * - Exibe formulário para criar nova categoria.
 * - Exibe tabela com as categorias já existentes.
 *
 * @returns {JSX.Element} Componente da página de gerenciamento de categorias.
 */
export default function CategoriesManage() {
   // Protege a página: redireciona usuários não autenticados para login
   useAuthGuard(); 

   // Hook para buscar categorias da API e armazenar no Zustand
   const { getCategories } = useGetCategories();
   const categories = useCategoriesDataStore(state => state.categories);
   const categoriesLoadedType = useCategoriesDataStore(state => state.categoriesLoadedType);
   const setCategoriesLoadedType = useCategoriesDataStore(state => state.setCategoriesLoadedType);

   // Garante que todas as categorias sejam carregadas ao entrar na página
   if (categoriesLoadedType != 'all') {
      getCategories();
      setCategoriesLoadedType('all');
   }

   return (
      <>
         {/* Modais e notificações globais */}
         <ModalEditCategory />
         <ToastNotifications />
         <ModalConfirmAction text={'Categoria'} />
         
         {/* Estrutura principal da página */}
         <PageModel title={'Gerenciar Categorias'}>
            <FormNewCategory categories={categories} />

            {/* Tabela de listagem de categorias */}
            <div className="z-[5] max-w-[730px] w-fit bg-white rounded-md px-1 shadow-md">
               <table className="text-sm">
                  <thead className="h-7">
                     <tr>
                        <th scope="col" className="w-96">Categoria</th>
                        <th scope="col" className="w-60">Tipo</th>
                        <th scope="col" className="w-36">Ícone</th>
                        {!categories && <th scope="col" className="w-9"></th>}
                     </tr>
                  </thead>
                  <tbody>
                     {categories && categories.map(category => (
                        <Tr key={category.id} category={category} />
                     ))}
                  </tbody>
               </table>

               {/* Esqueleto de carregamento caso as categorias ainda não tenham sido carregadas */}
               {!categories && <TableSkeleton />}
            </div>
         </PageModel>
      </>
   );
}

/**
 * Linha da tabela que exibe uma categoria.
 *
 * - Recebe uma categoria via prop.
 * - Aplica estilos condicionais conforme o tipo da categoria (despesa ou receita).
 * - Abre modal de edição ao clicar, configurando a categoria selecionada no estado global.
 *
 * @param {Object} props
 * @param {Object} props.category - Objeto da categoria com propriedades como id, name, type e icon.
 * @returns {JSX.Element} Linha da tabela com dados da categoria.
 */
function Tr({ category }) {
   const setShowEditCategoryModal = useModalsHiddenStore(state => state.setShowEditCategoryModal);
   const setEditingCategory = useCategoriesDataStore(state => state.setEditingCategory);

   return (
      <tr
         className={`h-9 border-t border-gray-200 hover:bg-gray-100 transition-all cursor-pointer
            ${category.type == 'expense' ? 'text-red-800' : 'text-green-800'}`}
         onClick={() => {
            setShowEditCategoryModal(true);
            setEditingCategory(category);
         }}
      >
         <td className="pl-1">{category.name}</td>
         <td className="text-center">{category.type === 'expense' ? 'Despesa' : 'Receita'}</td>
         <td className="text-center">
            <img className="w-5 h-5 m-auto" src={`/icons/${category.icon}`} alt="ícone" />
         </td>
      </tr>
   );
}

/**
 * Formulário para adicionar uma nova categoria.
 *
 * - Controla o estado local do formulário (nome, tipo, ícone).
 * - Reage ao status da inserção para limpar os campos após sucesso.
 * - Utiliza hook `useCategoriesHandler` para enviar dados da nova categoria.
 * - Inclui seleção de ícone personalizado via componente `IconSelect`.
 * - Mostra spinner no botão enquanto a operação está em andamento.
 *
 * @param {Object} props
 * @param {Array} props.categories - Lista de categorias existentes para referência.
 * @returns {JSX.Element} Formulário estilizado para criação de categoria.
 */
function FormNewCategory({ categories }) {
   const { categoriesHandler, insertCategoryStatus } = useCategoriesHandler();
   const [formData, setFormData] = useState({ name: '', type: '', icon: 'c-icon-0.png' });
   const icons = useCategoriesDataStore(state => state.icons);

   // Limpa o formulário ao finalizar inserção com sucesso
   useEffect(() => {
      if (insertCategoryStatus.success) {
         setFormData({ name: '', type: '', icon: 'c-icon-0.png' });
      }
   }, [insertCategoryStatus.success]);

   return (
      <div className="bg-white rounded-md text-sm w-fit mb-2 shadow-md">
         <div className="bg-cyan-600 text-white rounded-t-md text-center h-7 leading-7">
            <h3>Adicionar nova categoria</h3>
         </div>
         <form className="flex flex-row gap-4 p-2">
            {/* Campo nome da categoria */}
            <div className="flex items-center flex-row gap-2 mb-2 pr-2 border-r border-r-gray-400">
               <label className="pl-1 font-bold">Categoria:</label>
               <input
                  className="h-8 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                  type="text"
                  name="category"
                  placeholder="Categoria..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  autoFocus
                  maxLength={50}
               />
            </div>

            {/* Tipo da categoria: despesa ou receita */}
            <div className="flex items-center flex-row gap-2 mb-2 pr-2 border-r border-r-gray-400">
               <p className="font-bold">Tipo:</p>
               <input
                  id="expenseradio"
                  type="radio"
                  name="type"
                  onChange={() => setFormData({ ...formData, type: 'expense' })}
                  checked={formData.type === 'expense'}
               />
               <label htmlFor="expenseradio" className="-ml-1">Despesa</label>
               <input
                  id="incomeradio"
                  type="radio"
                  name="type"
                  onChange={() => setFormData({ ...formData, type: 'income' })}
                  checked={formData.type === 'income'}
               />
               <label htmlFor="incomeradio" className="-ml-1">Receita</label>
            </div>

            {/* Seletor de ícones personalizados */}
            <div className="flex items-center flex-row gap-2 mb-2">
               <label className="-ml-1 font-bold">Ícone:</label>
               <IconSelect
                  currentIcon={formData.icon}
                  formData={formData}
                  setFormData={setFormData}
                  icons={icons}
               />
            </div>

            {/* Botão de salvar categoria */}
            <div>
               <ButtonSave
                  onClick={(e) => {
                     e.preventDefault();
                     categoriesHandler.insertCategory(formData, categories);
                  }}
               >
                  {insertCategoryStatus.loading
                     ? <Spinner />
                     : <span>Adicionar</span>}
               </ButtonSave>
            </div>
         </form>
      </div>
   );
}
