import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export function ModalBackGround({ children }) {
   const setHiddenAllModals = useModalsHiddenStore((state) => state.setHiddenAllModals);
   let initialClick = false;

   return (
      <div
         className=" fixed flex justify-center items-center bg-black bg-opacity-55 top-0 left-0 h-full w-full z-[30]"
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
   )
}