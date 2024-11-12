import { useState } from "react"
import { ButtonClose, ButtonSave } from "./buttons"
import { Select } from "./Select";
import { useNewRelease } from "../hooks/useNewRelease";
import { Calendar } from "./Caledar";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { FloatNotification } from "./FloatNotification";

export function ModalNewRelease({ title }) {
   const { releaseHandler } = useNewRelease();
   const { setHiddenReleaseModal } = useModalsHiddenStore();
   const type = 'expenses'

   const [fixedRelease, setFixedRelease] = useState(false);
   return (
      <div className="modal flex flex-col justify-between relative h-fit w-96 bg-white rounded-xl shadow-lg py-2 px-3">
         <div className="text-center h-8 leading-7 text-sm border-b mb-3">
            <h4>{`Adicionar nova ${title}`}</h4>
            <div className="absolute h-5 w-5 top-0 right-0">
               <ButtonClose clickEvent={setHiddenReleaseModal}/>
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
                     autoFocus
                     required
                     maxLength={50}
                  />
               </div>
               <div className="flex flex-row gap-1 mb-3">
                  <div className="flex flex-col gap-[2px]">
                     <label className="pl-1">Categoria *</label>
                     <Select name={"categoria"}/>
                  </div>

                  <div className="relative flex flex-col gap-[2px]">
                     <label className="pl-1">Data *</label>
                     <div className="flex flex-row gap-1 w-full">
                        <Calendar name="data" status={false}/>
                        <Calendar name="dataFim" status={!fixedRelease ? true : false}/>
                     </div>
                     <div className="absolute right-[10px] h-5 flex flex-row items-center gap-[4px]">
                        <input
                           className="h-4"
                           type="checkbox"
                           name="fixa"
                           onChange={()=> setFixedRelease(!fixedRelease)}
                           id={`${title}-fixedReleaseCheckbox`}
                        />
                        <label  htmlFor={`${title}-fixedReleaseCheckbox`}>Despesa fixa</label>
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
                     required
                  />
               </div>
               <div className="flex justify-center mt-3">
                  <ButtonSave clickEvent={releaseHandler.createNewRelease} type="expenses"/>
               </div>
            </form>
         </div>
         <FloatNotification />
      </div>
   )
}