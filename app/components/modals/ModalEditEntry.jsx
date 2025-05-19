'use client';
import { useDeleteEntry } from "@/app/hooks/entries/useDeleteEntry";
import { useEntryHandler } from "@/app/hooks/entries/useEntryHandler";
import { useUtils } from "@/app/hooks/useUtils";
import { useModalConfirmActionStore } from "@/app/zustand/useModalConfirmActionStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEffect, useState } from "react";
import { useTableStore } from "../../zustand/useTablesStore";
import { ButtonClose } from "../buttons/ButtonClose";
import { ButtonDelete } from "../buttons/ButtonDelete";
import { ButtonSave } from "../buttons/ButtonSave";
import { Spinner } from "../loads/spinner";
import { CategorieSelect } from "../selects/CategorieSelect";
import { ModalBackGround } from "./ModalBackGround";
import { Calendar } from "../calendar/Calendar";

/**
 * ModalEditEntry exibe um modal de edição para os lançamentos (despesa ou receita).
 * - Carrega os dados do lançamento selecionado para edição (usando Zustand).
 * - Permite editar descrição, categoria, datas (inicial e final) e valor.
 * - Possui opção para marcar o lançamento como fixo (com data final ativada).
 * - Envia atualizações para o banco de dados.
 * - Permite excluir a entrada com confirmação.
 */
export function ModalEditEntry() {
   const showEditModal = useModalsHiddenStore((state) => state.showEditModal);
   if (showEditModal) {
      return (
         <ModalEditEntryBody />
      )
   }
}

function ModalEditEntryBody() {
   const { updateEntry, updateDBSAnswer } = useEntryHandler();
   const { deleteEntry, loading } = useDeleteEntry();
   const { convertDateToDMY } = useUtils();
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);

   // Dados do formulário. Preenchido com os dados da entrada que está sendo editada.
   const [formData, setFormData] = useState({
      description: '', category: '', date: '', type: 'expense', icon: '', fixed: false, end_date: '', value: '',
      id: '', effected: true, recurrence_id: ''
   });

   const setAction = useModalConfirmActionStore(state => state.setAction);
   const setShowAddConfirmModal = useModalsHiddenStore(state => state.setShowAddConfirmModal);

   // Dados do lançamento em edição (obtidos via Zustand).
   const editingEntry = useTableStore((state) => state.editingEntry);

   // Estado local para controlar se o lançamento é fixo (ativa segundo calendário).
   const [fixedEntry, setFixedEntry] = useState(false);

   // Ao abrir o modal, preenche o formulário com os dados do lançamento selecionado para edição.
   useEffect(() => {
      setFormData(
         {
            description: editingEntry.description,
            category: editingEntry.category,
            date: convertDateToDMY(editingEntry.date),
            type: editingEntry.type,
            fixed: !!editingEntry?.end_date ? true : false,
            icon: editingEntry.icon,
            end_date: editingEntry.end_date ? convertDateToDMY(editingEntry.end_date) : '',
            value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(editingEntry.value).slice(3,),
            id: editingEntry.id,
            effected: editingEntry.effected,
            recurrence_id: editingEntry.recurrence_id
         }
      );
      setFixedEntry(!!editingEntry?.end_date && true);
   }, [editingEntry]);

   return (
      <ModalBackGround >
         <div className="relative modal flex flex-col justify-between h-fit w-[420px] bg-white rounded-md shadow-lg py-2 px-3">

            {/* Cabeçalho do modal com título e botão de fechar */}
            <div className="text-center h-9 leading-7 w-[420px] rounded-t-md -ml-3 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-gray-900 text-white">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/gif/edit.gif"} />
               </div>
               <h4>{`Editando ${editingEntry.type == 'expense' ? 'Despesa' : 'Receita'}`}</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => { setShowEditModal(false) }} />
               </div>
            </div>

            {/* Formulário */}
            <div>
               <form className="text-[13px] text-gray-700" id="new-release-form">
                  <div className="flex flex-col gap-[2px] mb-2">
                     <label className="pl-1">Descrição *</label>
                     <input
                        className="h-8 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                        type="text"
                        name="descricao"
                        placeholder="Descrição. . ."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        autoFocus
                        maxLength={50}
                     />
                  </div>
                  <div className="flex flex-row gap-1 mb-3">
                     <div className="flex flex-col gap-[2px]">
                        <label className="pl-1">Categoria *</label>
                        <CategorieSelect
                           name={"categoria"}
                           value={formData.category}
                           setValue={setFormData}
                           formData={formData}
                           type={editingEntry.type}
                        />
                     </div>

                     {/* Calendários para data inicial e final */}
                     <div className="relative flex flex-col gap-[2px]">
                        <label className="pl-1">Data *</label>
                        <div className="flex flex-row gap-1 w-full">
                           <Calendar
                              params={{
                                 name: 'date',
                                 value: formData.date,
                                 disabledCalendar: false,
                                 setFormData: setFormData,
                                 formData: formData,
                                 navButtonsStatus: 'off',
                                 defaultMonth: formData.date
                              }}
                           />
                           <Calendar
                              params={{
                                 name: 'end_date',
                                 value: formData.end_date,
                                 disabledCalendar: !formData.fixed,
                                 setFormData: setFormData,
                                 formData: formData,
                                 navButtonsStatus: 'on',
                                 defaultMonth: formData.end_date ? formData.end_date : formData.date
                              }}
                           />
                        </div>
                        <div className="absolute right-[10px] h-5 flex flex-row items-center gap-[4px]">
                           <input
                              className="h-4"
                              type="checkbox"
                              name="fixa"
                              checked={fixedEntry}
                              onChange={() => {
                                 setFormData({ ...formData, end_date: '', fixed: !fixedEntry });
                                 setFixedEntry(!fixedEntry);
                              }}
                              id={`${editingEntry.type}-fixedEntryCheckbox`}
                           />
                           <label htmlFor={`${editingEntry.type}-fixedEntryCheckbox`}>
                              {`${editingEntry.type == 'expense' ? 'Despesa' : 'Receita'} fixa`}
                           </label>
                        </div>
                     </div>

                  </div>
                  <div className="flex flex-row items-center justify-end gap-1 w-full">
                     <label className="pl-1">Valor *</label>
                     <input
                        className="h-8 w-[112px] pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                        type="text"
                        name="valor"
                        placeholder="0,00"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        required
                     />
                  </div>
                  <div className="flex flex-col gap-[2px] justify-center mt-3">
                     <ButtonSave
                        // Atualiza a entrada no banco de dados
                        onClick={(e) => {
                           e.preventDefault();
                           updateEntry(formData, editingEntry.type);
                        }}
                        text="Salvar alteraçôes"
                     >{updateDBSAnswer.loading &&
                        <Spinner />
                        }</ ButtonSave >

                     <div className="flex flex-row items-center">
                        <div className="flex-1"><hr /></div>
                        <span className="px-2">ou</span>
                        <div className="flex-1"><hr /></div>
                     </div>

                     <ButtonDelete
                        // Define a ação de exclusão e mostra o modal de confirmação
                        onClick={(e) => {
                           e.preventDefault();
                           setAction(() => deleteEntry(editingEntry, editingEntry.type));
                           setShowAddConfirmModal(true);
                        }}
                        text={`Excluir ${editingEntry.type == 'expense' ? 'Despesa' : 'Receita'}`}
                     >{loading &&
                        <Spinner />
                        }</ ButtonDelete >
                  </div>
               </form>
            </div>
         </div>
      </ModalBackGround>
   )
}
