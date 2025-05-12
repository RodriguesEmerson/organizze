import { useModalConfirmActionStore } from "@/app/zustand/useModalConfirmActionStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { ButtonClose } from "../buttons/ButtonClose";
import { ButtonDelete } from "../buttons/ButtonDelete";
import { ModalBackGround } from "../ModalBackGround";


export function ModalConfirmAction({ text }) {

   const showAddConfirmModal = useModalsHiddenStore(state => state.showAddConfirmModal);
   const setShowAddConfirmModal = useModalsHiddenStore(state => state.setShowAddConfirmModal);
   const action = useModalConfirmActionStore(state => state.action);
   if (!showAddConfirmModal) return;

   return (
      <ModalBackGround >
         <div className="relative z-50 shadow-xl modal flex flex-col w-[314px] h-[150px] bg-white rounded-md py-2 px-2">

            <div className="text-center h-9 leading-7 w-[314px] rounded-t-md -ml-2 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-red-800 text-white">
               <span className="material-icons-outlined absolute left-2 top-[6px]">warning</span>
               <p>Atenção</p>
               <ButtonClose onClick={() => { setShowAddConfirmModal(false) }} color={'green'} />
            </div>

            <div className="flex flex-col justify-around h-full text-gray-600 text-sm text-center">
               <div className="flex flex-row justify-center gap-1 flex-wrap">
                  <span>Deseja realmente excluir esta(e)</span>
                  <span className="font-semibold">{text}</span>
                  <span className="-ml-1">?</span>
               </div>

               <div className="flex justify-center">
                  <ButtonDelete 
                     text={'Confirmar excluisão'} 
                     onClick={() => { action && action(); setShowAddConfirmModal(false) }} />
               </div>
            </div>
         </div>
      </ModalBackGround>
   )
}