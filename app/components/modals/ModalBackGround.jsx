import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

/**
 * ModalBackGround é o componente responsável por renderizar o fundo escuro
 * que fica por trás dos modais, bloqueando interação com o conteúdo da página
 * e dando foco ao modal aberto.
 * 
 * Ele também controla o fechamento dos modais quando o usuário clica fora do modal.
 * 
 * @param {React.ReactNode} children - Conteúdo dos modais que será renderizado sobre o fundo escuro.
 * @returns {JSX.Element} - Background escuro semitransparente.
 */
export function ModalBackGround({ children }) {
   const setHiddenAllModals = useModalsHiddenStore((state) => state.setHiddenAllModals);

   // Variável para controlar se o clique começou dentro de um modal
   let isSomeModalClicked = false;

   return (
      <div
         className=" fixed flex justify-center items-center bg-black bg-opacity-55 top-0 left-0 h-full w-full z-[30]"
         
         // Ao iniciar o clique, verificamos se o alvo do evento está dentro de algum elemento com a classe ".modal"
         onMouseDown={(e) => {
            isSomeModalClicked = e.target.closest(".modal");
         }}

         // Ao soltar o clique, verificamos se o alvo está fora do modal e se o clique começou fora também
         // Se sim, chamamos a função para esconder todos os modais, fechando-os
         onMouseUp={(e) => {
            if (!e.target.closest(".modal") && !isSomeModalClicked) {
               setHiddenAllModals();
            }
         }}
      >
         { children }
      </div>
   )
}
