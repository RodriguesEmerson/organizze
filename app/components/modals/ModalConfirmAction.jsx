import { useModalConfirmActionStore } from "@/app/zustand/useModalConfirmActionStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { ButtonClose } from "../buttons/ButtonClose";
import { ButtonDelete } from "../buttons/ButtonDelete";
import { ModalBackGround } from "./ModalBackGround";

/**
 * ModalConfirmAction exibe um modal de confirmação para ações importantes,
 * como a exclusão ou alteração.
 * 
 * O texto exibido e a ação executada ao confirmar são definidos dinamicamente
 * por outros componentes através do Zustand.
 * 
 * @param {string} text - Texto que descreve o que será excluído (ex: "lancamento", "registro").
 */
export function ModalConfirmAction({ text }) {

   const showAddConfirmModal = useModalsHiddenStore(state => state.showAddConfirmModal);
   const setShowAddConfirmModal = useModalsHiddenStore(state => state.setShowAddConfirmModal);

   // Função que será executada ao confirmar a ação
   const action = useModalConfirmActionStore(state => state.action);

   if (!showAddConfirmModal) return null;
   return (
      <ModalBackGround>
         <div className="relative z-50 shadow-xl modal flex flex-col w-[314px] h-[150px] bg-white rounded-md py-2 px-2">

            {/* Cabeçalho vermelho com ícone de alerta, texto e botão de fechar */}
            <div className="text-center h-9 leading-7 w-[314px] rounded-t-md -ml-2 -mt-[9px] text-sm pt-[5px] border-b mb-3 bg-red-800 text-white">
               <span className="material-icons-outlined absolute left-2 top-[6px]">warning</span>
               <p>Atenção</p>
               <ButtonClose onClick={() => { setShowAddConfirmModal(false) }} color={'green'} />
            </div>

            {/* Corpo do modal com mensagem e botão de confirmação */}
            <div className="flex flex-col justify-around h-full text-gray-600 text-sm text-center">
               <div className="flex flex-row justify-center gap-1 flex-wrap">
                  <span>Deseja realmente excluir esta(e)</span>
                  <span className="font-semibold">{text}</span>
                  <span className="-ml-1">?</span>
               </div>

               <div className="flex justify-center">
                  <ButtonDelete 
                     text={'Confirmar exclusão'} 
                     onClick={() => { 
                        // Executa a ação definida e fecha o modal
                        action && action();
                        setShowAddConfirmModal(false);
                     }} 
                  />
               </div>
            </div>
         </div>
      </ModalBackGround>
   )
}
