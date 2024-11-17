import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";


export function ModalBackGround({ children }) {
   const setHiddenAllModals = useModalsHiddenStore((state) => state.setHiddenReleaseModal);
   let initialClick = false;

   return (
      <>
         <div
            className=" fixed flex justify-center items-center bg-black bg-opacity-75 top-0 left-0 h-full w-full z-[30]"
            onMouseDown={(e) => {
               initialClick = e.target.closest(".modal");
            }}
            onMouseUp={(e) => {
               if (!e.target.closest(".modal") && !initialClick) {
                  setHiddenAllModals();
               }
            }}
         >
            { children }
         </div>
      </>

   )
}