import { useState } from "react"
import { ButtonClose, ButtonSave } from "./buttons"
import { Select } from "./Select";
import { useNewRelease } from "../hooks/useNewRelease";
import { Calendar } from "./Caledar";

export function ModalNewRelease({ title }) {
   const { releaseHandler } = useNewRelease();
   const type = 'expenses'

   const [fixedRelease, setFixedRelease] = useState(false);
   return (
      <div className="modal flex flex-col justify-between relative h-64 w-96 bg-white rounded-xl shadow-lg py-2 px-3">
         <div className="text-center h-8 leading-7 text-sm border-b">
            <h4>{`Adicionar nova ${title}`}</h4>
            <div className="absolute h-5 w-5 top-1 right-2">
               <ButtonClose />
            </div>
         </div>
         <div>
            <form className="text-[13px] text-gray-700" id="new-release-form">
               <div className="flex flex-col gap-[2px] mb-2">
                  <label className="pl-1">Descrição</label>
                  <input
                     className="h-7 pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400" 
                     type="text" 
                     name="descricao"
                     autoFocus
                  />
               </div>
               <div className="flex flex-row gap-1 mb-3">
                  <div className="flex flex-col gap-[2px]">
                     <label className="pl-1">Categoria</label>
                     <Select name={"categoria"}/>
                  </div>

                  <div className="relative flex flex-col gap-[2px]">
                     <label className="pl-1">Data</label>
                     <div className="flex flex-row gap-1 w-full">
                        <Calendar name="data"/>
                        <input 
                           className={`h-7 pl-3 w-full font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400 ${!fixedRelease ? "bg-gray-200" : "bg-white"}`}
                           type="text" 
                           name="dataFim"
                           disabled={!fixedRelease ? true : false}
                        />
                     </div>
                     <div className="absolute right-1 h-5 flex flex-row items-center gap-[4px]">
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
                  <label className="pl-1">Valor</label>
                  <input 
                     className="h-7 w-[112px] pl-3 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400"
                     type="text" 
                     name="valor"
                  />
               </div>
               <div className="flex justify-center mt-2">
                  <ButtonSave clickEvent={releaseHandler.createNewRelease} type="expenses"/>
               </div>
            </form>
         </div>
      </div>
   )
}