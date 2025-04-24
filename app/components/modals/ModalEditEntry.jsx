import { useEffect, useState } from "react"
import { ButtonClose } from "../buttons/ButtonClose"
import { ButtonSave } from "../buttons/ButtonSave";
import { CategorieSelect } from "../selects/CategorieSelect";
import { useNewRelease } from "../../hooks/useNewRelease";
import { Calendar } from "../Calendar";
import { FloatAtentionNotification } from "./../FloatAtentionNotification";
import { useTableStore } from "../../zustand/useTablesStore";
import { ModalBackGround } from "./../ModalBackGround";
import useCalendar from "../../hooks/useCalendar";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function ModalEditEntry(){
   const showEditModal = useModalsHiddenStore((state) => state.showEditModal);
   if(showEditModal){
      return (
         <ModalEditEntryBody />
      )
   }
}

function ModalEditEntryBody() {
   
   const { releaseHandler, releaseMensage } = useNewRelease();
   const { datesHandler } = useCalendar();
   const setHiddenReleaseModal = useModalsHiddenStore((state) => state.setHiddenReleaseModal);
   const [formData, setFormData] = useState({ desc: '', categ: '*Selecione*', date: '', endDate: '', value: '' });
   
   //Dados do item em edição.
   const editingEntry = useTableStore((state) => state.editingEntry);
   const categories = useTableStore((state) => state.categories);

   const [fixedRelease, setFixedRelease] = useState(false);
   
   useEffect(() => {
      setFormData( 
         {   
            desc: editingEntry.description,
            categ: editingEntry.category,
            date: datesHandler.dateConvert(editingEntry.date, 'br'),
            endDate: editingEntry.end_date ? datesHandler.dateConvert(editingEntry.end_date, 'br') : '',
            value: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(editingEntry.value).slice(3,),
            id: editingEntry.id
         } 
      );
      setFixedRelease(!!editingEntry?.end_date && true);
   }, [editingEntry]);
   
   return (
      <ModalBackGround >
         <div className="relative modal flex flex-col justify-between h-fit w-96 bg-white rounded-xl shadow-lg py-2 px-3">

            <div className="text-center h-9 leading-7 w-[384px] rounded-t-xl -ml-3 -mt-2 text-sm pt-[6px] border-b mb-3 bg-gray-200">
               <div className="absolute flex items-center justify-center top-0 left-2 w-9 h-9 bg-white rounded-full overflow-hidden">
                  <img className="w-6 transition-all" src={"/gif/edit.gif"} />
               </div>
                <h4>{`Editando ${editingEntry.type == 'expenses' ? 'Despesas' : 'Receitas'}`}</h4>
               <div className="absolute h-5 w-5 top-0 right-0">
                  <ButtonClose onClick={() => { setHiddenReleaseModal() }} />
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
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        autoFocus
                        maxLength={50}
                     />
                  </div>
                  <div className="flex flex-row gap-1 mb-3">
                     <div className="flex flex-col gap-[2px]">
                        <label className="pl-1">Categoria *</label>
                        <CategorieSelect
                           name={"categoria"}
                           categoriesB={[{categ: 'Teste', icon: 'icon.png'}]}
                           // categories={categories[editingEntry.type]}
                           value={formData.categ}
                           setValue={ setFormData }
                           formData={formData}
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
                              value={formData.endDate}
                              disabled={!fixedRelease}
                              disabledCalendar={!fixedRelease}
                              setFormData={setFormData}
                              formData={formData}
                              formRef = "endDate"
                              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                           />
                        </div>
                        <div className="absolute right-[10px] h-5 flex flex-row items-center gap-[4px]">
                           <input
                              className="h-4"
                              type="checkbox"
                              name="fixa"
                              checked={fixedRelease}
                              onChange={() => { fixedRelease && setFormData({ ...formData, endDate: '' }); setFixedRelease(!fixedRelease)}}
                              id={`${editingEntry.type}-fixedReleaseCheckbox`}
                           />
                           <label htmlFor={`${editingEntry.type}-fixedReleaseCheckbox`}>{`${editingEntry.type} fixa`}</label>
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
                  <div className="flex justify-center mt-3">
                     <ButtonSave 
                        onClick={(e) => {releaseHandler.updateRelease(e, formData); setFormData({ desc: '', categ: '*Selecione*', date: '', endDate: '', value: '' }); setHiddenReleaseModal() }} 
                        text="Salvar alteraçôes" 
                     />
                  </div>
               </form>
            </div>
            {releaseMensage &&
               <div className="absolute -right-2 top-0 transition-all">
                  <FloatAtentionNotification releaseMensage={releaseMensage} />
               </div>
            }
         </div>
      </ModalBackGround>
   )
}