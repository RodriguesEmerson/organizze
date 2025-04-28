import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useEffect, useState } from "react";


export function ToastNotifications() {
   const notifications = useToastNotifications(state => state.notifications);
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const [updated, setUpdated] = useState(false);

   useEffect(() => {
      if(notifications.length > 0){
         setUpdated(notifications[notifications.length-1].id)
      }
   }, [notifications]);

   if(!updated) return;
   return (
      <div
         className="fixed left-1 bottom-4 flex flex-col justify-end items-end gap-2 text-sm z-[40] w-60 h-52 p-2 transition-all duration-300 "
      >
         {notifications.map(notification => (
            !notification.isShowed && (
               <Notifications key={notification.id} notification={notification}/>
            )
         ))}

      </div>   
   )
}

function Notifications({ notification }){
   const [left, setLeft] = useState();
   const [barWidth, setBarWidth] = useState();
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      //Garante que a aniamção aconteça de forma suave;
      setTimeout(() => {
         setLeft('17px');
         setBarWidth('0px');
      }, 50)
      setTimeout(() => {
         setLeft('-240px');
      }, 4000);
      setTimeout(() => {
         setVisible(false) //Desmonta o componente
      }, 4400);
   }, []); 

   if(!visible) return;

   return (
      <div
         className="relative flex items-center -left-[240px] justify-around gap-1 text-sm z-40 w-56 h-16 p-2 rounded-md bg-white transition-all duration-300 shadow-[-10px_35px_60px_2px_rgba(0,0,0,0.3)]"
         style={{ left: left }}
      >

         <p>{notification.message}</p>
         <img className="max-w-7" src="/icons/i-saved.png" alt="saved-icon" />
         <span
            className={`absolute bottom-0 left-0 inline-block w-[224px] !transition-all !ease-linear h-1 rounded-sm bg-green-800 !duration-[4s]`}
            style={{ width: barWidth }}
         ></span>
      </div>
   )
}