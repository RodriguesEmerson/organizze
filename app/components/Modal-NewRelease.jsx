import { useEffect, useState } from "react"
import { ButtonClose, ButtonSave } from "./buttons"
import { Select } from "./Select";
import { useNewRelease } from "../hooks/useNewRelease";
import { Calendar } from "./Calendar";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { FloatNotification } from "./FloatNotification"; 
import { useTableStore } from "../zustand/useTablesStore";
import { ModalBackGround } from "./ModalBackGround";



export function ModalNewRelease() {
   const { releaseHandler, releaseMensage } = useNewRelease();
   const showAddReleaseModal = useModalsHiddenStore((state) => state.showAddReleaseModal);
   const setHiddenReleaseModal = useModalsHiddenStore((state) => state.setHiddenReleaseModal);

   //Dados do item em edição.
   const editingRelease = useTableStore((state) => state.editingRelease);
   const setEditingRelease = useTableStore((state) => state.setEditingRelease);


   const newReleaseType = useTableStore((state) => state.newReleaseType);
   const categories = useTableStore((state) => state.categories);

   
   const [fixedRelease, setFixedRelease] = useState(false);
   const releaseType = newReleaseType?.type;
   const releaseTitle = newReleaseType?.title;

   if(!showAddReleaseModal) return <></>;

   return (
      <ModalBackGround >
      <div className="relative modal flex flex-col justify-between h-fit w-96 bg-white rounded-xl shadow-lg py-2 px-3">
         <div className="text-center h-8 leading-7 text-sm border-b mb-3">

            {!!editingRelease && <span className="absolute top-2 left-2 material-icons !text-green-800">edit</span>}

            {!!editingRelease && <h4>{`Editando ${releaseTitle}`}</h4>}
            {!!!editingRelease && <h4>{`Adicionar nova ${releaseTitle}`}</h4>}

            <div className="absolute h-5 w-5 top-0 right-0">
               <ButtonClose onClick={()=> {setHiddenReleaseModal(); setEditingRelease(false)}}/>
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
                     defaultValue={!!editingRelease ? editingRelease.desc : ''}
                     autoFocus
                     maxLength={50}
                  />
               </div>
               <div className="flex flex-row gap-1 mb-3">
                  <div className="flex flex-col gap-[2px]">
                     <label className="pl-1">Categoria *</label>
                        <Select 
                           name={"categoria"} 
                           categories={categories[releaseType]} 
                           defaultValue={editingRelease?.categ}
                        />
                  </div>

                  <div className="relative flex flex-col gap-[2px]"> 
                     <label className="pl-1">Data *</label>
                     <div className="flex flex-row gap-1 w-full">
                        <Calendar 
                           name="data" 
                           status={false} 
                           defaultValue={editingRelease 
                              ? new Date(editingRelease.date).toLocaleDateString('pt-bt', {day:"2-digit", month: '2-digit', year: 'numeric'}) 
                              : ''
                           }
                        />
                        <Calendar 
                           name="dataFim" 
                           status={!!!editingRelease?.endDate ? true : false} 
                           defaultValue={editingRelease.endDate
                              ? new Date(editingRelease.endDate).toLocaleDateString('pt-bt', {day:"2-digit", month: '2-digit', year: 'numeric'}) 
                              : ''
                           }
                        />
                     </div>
                     <div className="absolute right-[10px] h-5 flex flex-row items-center gap-[4px]">
                        <input
                           className="h-4"
                           type="checkbox"
                           name="fixa"
                           defaultChecked={editingRelease?.endDate ? true : false}
                           onChange={()=> {setFixedRelease(!fixedRelease);}}
                           id={`${releaseType}-fixedReleaseCheckbox`}
                        />
                        <label  htmlFor={`${releaseType}-fixedReleaseCheckbox`}>{`${releaseTitle} fixa`}</label>
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
                     defaultValue={
                        !!editingRelease && Number(editingRelease?.value).toLocaleString('pt-BR', { style: "currency", currency: "BRL"}).slice(2,)
                     }
                     required
                  />
               </div>
               <div className="flex justify-center mt-3">
                  {!!!editingRelease && (
                     <ButtonSave onClick={(e) => releaseHandler.createNewRelease(e, releaseType)} text="Adicionar"/>
                  )}
                  {!!editingRelease && (
                     <ButtonSave onClick={(e) => releaseHandler.updateRelease(e, releaseType)} text="Salvar alteraçôes"/>
                  )}
               </div>
            </form>
         </div> 
         {releaseMensage &&
            <div className="absolute -right-2 top-0 transition-all">
               <FloatNotification releaseMensage={releaseMensage}/>   
            </div>  
         }
      </div>
      </ModalBackGround>
   )
}