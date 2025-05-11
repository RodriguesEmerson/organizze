'use client';
import { useEffect, useState } from "react"
import { ButtonClose } from "../buttons/ButtonClose"
import { ButtonSave } from "../buttons/ButtonSave";
import { CategorieSelect } from "../selects/CategorieSelect";
import { Calendar } from "../Calendar";
import { useTableStore } from "../../zustand/useTablesStore";
import { ModalBackGround } from "./../ModalBackGround";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useEntryHandler } from "@/app/hooks/entries/useEntryHandler";
import { useUtils } from "@/app/hooks/useUtils";
import { Spinner } from "../loads/spinner";
import { ButtonDelete } from "../buttons/ButtonDelete"; 

export function ModalEditEntry(){
   const showEditModal = useModalsHiddenStore((state) => state.showEditModal);
   if(showEditModal){
      return (
         <ModalEditEntryBody />
      )
   }
}

function ModalEditEntryBody() {
   const { updateEntry, updateDBSAnswer } = useEntryHandler(); 
   const { convertDateToDMY } = useUtils();
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const [formData, setFormData] = useState({description: '', category: '', date: '', fixed: false, end_date: '', value: '', id: ''});
   
   //Dados do item em edição.
   const editingEntry = useTableStore((state) => state.editingEntry);
   const [fixedRelease, setFixedRelease] = useState(false);

   useEffect(() => {
      setFormData( 
         {   
            description: editingEntry.description,
            category: editingEntry.category,
            date: convertDateToDMY(editingEntry.date),
            fixed: !!editingEntry?.end_date ? true : false,
            icon: editingEntry.icon,
            end_date: editingEntry.end_date ? convertDateToDMY(editingEntry.end_date) : '',
            value: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(editingEntry.value).slice(3,),
            id: editingEntry.id
         } 
      );
      setFixedRelease(!!editingEntry?.end_date && true);
   }, [editingEntry]);
   
   return (
      <ModalBackGround >
         <div className="relative modal flex flex-col justify-between h-fit w-[420px] bg-white rounded-md shadow-lg py-2 px-3">

            <div className="text-center h-9 leading-7 w-[420px] rounded-t-md -ml-3 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-gray-800 text-white">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/gif/edit.gif"} />
               </div>
                <h4>{`Editando ${editingEntry.type == 'expenses' ? 'Despesa' : 'Receita'}`}</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => { setShowEditModal(false) }} />
               </div>
            </div>
            
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
                           setValue={ setFormData }
                           formData={formData}
                           type={editingEntry.type.slice(0,-1)}
                        />
                     </div>

                     <div className="relative flex flex-col gap-[2px]">
                        <label className="pl-1">Data *</label>
                        <div className="flex flex-row gap-1 w-full">
                           <Calendar
                              name="data"
                              value={formData.date}
                              disabled={false}
                              disabledCalendar={false}
                              setFormData={setFormData}
                              formData={formData}
                              formRef = "date"
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                           />
                           <Calendar
                              name="dataFim"
                              value={formData.end_date}
                              disabled={!fixedRelease}
                              disabledCalendar={!fixedRelease}
                              setFormData={setFormData}
                              formData={formData}
                              formRef = "end_date"
                              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                           />
                        </div>
                        <div className="absolute right-[10px] h-5 flex flex-row items-center gap-[4px]">
                           <input
                              className="h-4"
                              type="checkbox"   
                              name="fixa"
                              checked={fixedRelease}
                              onChange={() => { 
                                 setFormData({ ...formData, end_date: '', fixed: !fixedRelease }); 
                                 setFixedRelease(!fixedRelease); 
                              }}
                              id={`${editingEntry.type}-fixedReleaseCheckbox`}
                           />
                           <label htmlFor={`${editingEntry.type}-fixedReleaseCheckbox`}>
                              {`${editingEntry.type == 'expenses' ? 'Despesa' : 'Receita'} fixa`}
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

                     <ButtonDelete text={`Deletar ${editingEntry.type == 'expenses' ? 'Despesa' : 'Receita'}`}/>
                  </div>
               </form>
            </div>
         </div>
      </ModalBackGround>
   )
}