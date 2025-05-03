import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useEffect, useRef, useState } from "react";


export function ToastNotifications() {
   const notifications = useToastNotifications(state => state.notifications);
   
   if(!notifications) return;
   return (
      <div
         className="fixed left-1 bottom-4 flex flex-col justify-end items-start gap-2 text-sm z-[40] w-fit h-52 p-2 transition-all duration-300 "
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
   const notificationRef = useRef(null);
   const [left, setLeft] = useState();
   const [barWidth, setBarWidth] = useState();
   const [visible, setVisible] = useState(true);
   const deletNotification = useToastNotifications(state => state.deletNotification);

   const type = {
      success: {bg: 'bg-green-100', bar: 'bg-green-500', icon: 'check_circle'},
      warn: {bg: 'bg-yellow-100', bar: 'bg-yellow-500', icon: 'warning'},
      error: {bg: 'bg-red-100', bar: 'bg-red-500', icon: 'report'},
      info: {bg: 'bg-blue-100', bar: 'bg-blue-500', icon: 'info'},
   }

   useEffect(() => {
      //Garante que a aniamção aconteça de forma suave;
      setTimeout(() => {
         setLeft('17px');
         setBarWidth('0px');
      }, 50)
      setTimeout(() => {
         setLeft(`-${notificationRef.current.offsetWidth + 20}px`);
      }, 4000);
      setTimeout(() => {
         setVisible(false) //Desmonta o componente
         deletNotification(notification.id)
      }, 5400);
   }, []); 

   if(!visible) return;

   return (
      <div
         ref={notificationRef}
         className={`relative text-gray-800 flex items-center -left-[240px] justify-around gap-1 text-sm z-40 h-16 p-2 rounded-md transition-all duration-500 shadow-[-10px_35px_60px_2px_rgba(0,0,0,0.3)] ${type[notification.type].bg}`}
         style={{ left: left }}
      >

         <span className="material-icons-outlined">{type[notification.type].icon}</span>
         <p>{notification.message}</p>
         <span
            className={`absolute bottom-0 left-0 inline-block w-full !transition-all !ease-linear h-1 rounded-sm !duration-[4s] ${type[notification.type].bar}`}
            style={{ width: barWidth }}
         ></span>
      </div>
   )
}