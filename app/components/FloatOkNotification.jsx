import { useEffect, useState } from "react"
import { useUtilsStore } from "../zustand/useUtilsStore";

export function FloatOkNotification({ mensage }) {
   const showOkNotification = useUtilsStore((state) => state.showOkNotification);
   const setShowOkNotification = useUtilsStore((state) => state.setShowOkNotification);

   const [left, setLeft] = useState('-240px');
   const [barWidth, setBarWidth] = useState('0')

   useEffect(() => {
      if (showOkNotification) {
         setLeft('17px');
         setBarWidth('224px');
         setTimeout(() => {
            setLeft('-240px');
            setBarWidth('0');
            setShowOkNotification(false);
         }, 4000);
      }
   }, [showOkNotification]);

   return (
      <div
         className="fixed flex items-center justify-around text-sm z-40 w-56 h-16 rounded-md bg-white transition-all duration-300 shadow-[-10px_35px_60px_2px_rgba(0,0,0,0.3)]"
         style={{ top: "calc(100vh - 80px)", left: left }}
      >

         <p>Alterações salvas!</p>
         <img className="max-w-9" src="/icons/i-saved.png" alt="saved-icon" />
         <span
            className={`absolute bottom-0 left-0 inline-block w-0 transition-all ease-linear h-1 rounded-sm bg-green-800 ${showOkNotification && "duration-[4s]"}`}
            style={{ width: barWidth }}
         ></span>
      </div>
   )
}