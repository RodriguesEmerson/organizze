'use client';
import { useState, useEffect } from "react"
import { ButtonClose } from "../buttons/ButtonClose"
import { ButtonSave } from "../buttons/ButtonSave";
import { CategorieSelect } from "../selects/CategorieSelect";
import { ModalBackGround } from "./ModalBackGround";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { Spinner } from "../loads/spinner";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useInsertNewEntry } from "@/app/hooks/entries/useInsertNewEntry";
import { useSearchParams } from "next/navigation";
import { Calendar } from "../calendar/Calendar";
import { useUtils } from "@/app/hooks/useUtils";
import { Radio, Switch } from "@mui/material";

/**
 * Componente modal para inserção de um novo lançamento financeiro.
 * 
 * Exibe um formulário que permite ao usuário adicionar uma nova despesa ou receita.
 * Suporta lançamentos fixos (com data final) e integra calendário para seleção de datas.
 * 
 * @component
 * @returns {JSX.Element | null} Retorna o modal de inserção se ativo, ou null caso contrário.
 */
export function ModalInsertEntry() {
   const showInsertModal = useModalsHiddenStore((state) => state.showInsertModal);

   // Renderiza o corpo do modal apenas se estiver visível
   if (showInsertModal) {
      return (
         <ModalInsertEntryBody />
      )
   }

   return null;
}

/**
 * Corpo principal do modal de inserção de lançamentos.
 * 
 * Controla o estado do formulário, a interação com os hooks de inserção, e a renderização dos inputs.
 * 
 * @returns {JSX.Element} JSX do modal com formulário para inserir lançamento.
 */
function ModalInsertEntryBody() {
   const { insertEntry, loading, success } = useInsertNewEntry();
   const setShowInsertModal = useModalsHiddenStore(state => state.setShowInsertModal);
   const { yearMonths } = useUtils();
   const searchParams = useSearchParams();
   const monthURL = searchParams.get('month');
   const yearURL = searchParams.get('year');

   /**
    * Estado local do formulário, que armazena os dados do novo lançamento.
    * @type {{description: string, category: string, date: string, icon: string, fixed: boolean, end_date: string, value: string, id: string, effected: boolean, recurrence_id: string}}
    */
   const [formData, setFormData] = useState({
      description: '', category: '', date: '', type: 'expense', icon: '', fixed: false, end_date: '', value: '',
      id: '', effected: true, recurrence_id: ''
   });

   // Tipo do novo lançamento (despesa ou receita)
   const newEntryType = useEntriesDataStore(state => state.newEntryType);

   // Estado para controlar se o lançamento é fixo, usado para habilitar/desabilitar o segundo calendário
   const [fixedEntry, setFixedEntry] = useState(false);

   // Efeito que reseta o formulário quando a inserção for bem sucedida
   useEffect(() => {
      if (success) {
         setFormData({
            description: '', category: '', date: '', type: formData.type, icon: '', fixed: false, end_date: '', value: '',
            id: '', effected: true, recurrence_id: ''
         });
         setFixedEntry(false);
      }
   }, [success]);

   return (
      <ModalBackGround >
         <div className="relative modal flex flex-col justify-between h-fit w-[420px] bg-white rounded-md shadow-lg py-2 px-3">

            {/* Cabeçalho do modal com título e botão de fechar */}
            <div className="text-center h-9 leading-7 w-[420px] rounded-t-md -ml-3 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-gray-800 text-white">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/icons/edit.png"} alt="Ícone editar" />
               </div>
               <h4>{`Adicionar novo lançamento`}</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => { setShowInsertModal(false) }} />
               </div>
            </div>

            {/* Formulário */}
            <div>
               <form className="text-[13px] text-gray-700" id="new-release-form">
                  {/*Radios tipo do novo laçamento e Switch Effect */}
                  <div className="mb-3 flex flex-row items-center justify-between">
                     <div className="flex flex-row items-center gap-1">
                        <p>Tipo: </p>
                        <div className="flex flex-row items-center h-7 -ml-2">
                           <Radio
                              id="radioExpense"
                              size="small"
                              color="error"
                              checked={formData.type == 'expense'}
                              onClick={() => 
                                 setFormData({ 
                                    ...formData, 
                                    type: 'expense', 
                                    category: formData.type == 'expense' ? formData.category : ''
                                 })
                              }
                           />
                           <label className="-ml-2 mt-[1px] cursor-pointer" htmlFor="radioExpense">Despesa</label>
                        </div>
                        <div className="flex flex-row items-center h-7">
                           <Radio
                              id="radioIncome"
                              size="small"
                              color="success"
                              checked={formData.type == 'income'}
                              onClick={() => 
                                  setFormData({ 
                                    ...formData, 
                                    type: 'income', 
                                    category: formData.type == 'income' ? formData.category : ''
                                 })
                              }
                           />
                           <label className="-ml-2 mt-[1px] cursor-pointer" htmlFor="radioIncome">Receita</label>
                        </div>
                     </div>
                     <div className="flex flex-row items-center gap-1 pt-[2px]">
                        <label className="-ml-2cursor-pointer" htmlFor="switchEffected">Efetivada: </label>
                        <div className="flex flex-row items-center h-7 -ml-2">
                           <Switch
                              id="switchEffected"
                              size="medium"
                              checked={formData.effected}
                              onClick={() => setFormData({ ...formData, effected: !formData.effected })}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col mb-2">
                     <label className="pl-1" htmlFor="descricao">Descrição *</label>
                     <input
                        id="descricao"
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
                     <div className="flex flex-col">
                        <label className="pl-1">Categoria *</label>
                        <CategorieSelect
                           name={"categoria"}
                           value={formData.category}
                           setValue={setFormData}
                           formData={formData}
                           type={formData.type}
                        />
                     </div>

                     {/* Calendários para data inicial e final */}
                     <div className="relative flex flex-row gap-[2px]">
                        <div className="flex flex-col">
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
                                    defaultMonth: monthURL && yearURL ? `01-${yearMonths.indexOf(monthURL) + 1}-${yearURL}` : undefined
                                 }}
                              />
                           </div>
                        </div>
                        <div className="relative">
                           <div className="flex flex-row items-center gap-[4px]">
                              <input
                                 className="h-4 -mt-[2px] ml-1  cursor-pointer"
                                 type="checkbox"
                                 name="fixa"
                                 checked={fixedEntry}
                                 onChange={() => {
                                    setFormData({ ...formData, end_date: '', fixed: !fixedEntry });
                                    setFixedEntry(!fixedEntry);
                                 }}
                                 id='fixedEntryCheckbox'
                              />
                              <label htmlFor='fixedEntryCheckbox' className="-ml-2 pl-2 cursor-pointer">Fixa</label>
                           </div>
                           <Calendar
                              params={{
                                 name: 'end_date',
                                 value: formData.end_date,
                                 disabledCalendar: !fixedEntry,
                                 setFormData: setFormData,
                                 formData: formData,
                                 navButtonsStatus: 'on',
                                 defaultMonth: monthURL && yearURL ? `01-${yearMonths.indexOf(monthURL) + 1}-${yearURL}` : undefined
                              }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-1 w-full">
                     <label className="pl-1" htmlFor="valor">Valor *</label>
                     <input
                        id="valor"
                        className="h-8 w-[112px] pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                        type="text"
                        name="valor"
                        placeholder="0,00"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        required
                     />
                  </div>
                  <div className="flex justify-center mt-3">
                     <ButtonSave
                        /**
                         * Adiciona o novo lançamento no banco de dados.
                         * @param {React.MouseEvent} e - Evento de clique no botão salvar.
                         */
                        onClick={(e) => {
                           e.preventDefault();
                           insertEntry(formData, formData.type, monthURL);
                        }}
                        text="Adicionar"
                     >
                        {loading && <Spinner />}
                     </ButtonSave>
                  </div>
               </form>
            </div>
         </div>
      </ModalBackGround>
   )
}
