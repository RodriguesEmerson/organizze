import { useToastNotifications } from "@/app/zustand/useToastNotifications";
import { useEffect, useRef, useState } from "react";

/**
 * Componente que renderiza a lista de notificações do tipo toast.
 * Exibe as notificações no canto inferior direito da tela com animação automática de saída.
 * 
 * @component
 * @returns {JSX.Element | null} Renderiza as notificações se existirem, ou null se não houver nenhuma.
 */
export function ToastNotifications() {
   // Obtém as notificações do estado global via Zustand
   const notifications = useToastNotifications(state => state.notifications);

   // Se não houver notificações, não renderiza nada
   if(!notifications || notifications.length < 1) return null;

   return (
      <div
         className="fixed right-1 pointer-events-none bottom-4 flex flex-col justify-end items-end gap-2 text-sm z-[40] w-fit h-52 p-2 transition-all duration-300"
      >
         {notifications.map(notification => (
            // Renderiza somente notificações que ainda não foram exibidas.
            !notification.isShowed && (
               <Notifications key={notification.id} notification={notification}/>
            )
         ))}
      </div>  
   )
}

/**
 * Componente que representa uma notificação individual.
 * Controla a animação de entrada, tempo de exibição e saída, além de remover a notificação do estado global.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.notification - Dados da notificação a ser exibida
 * @param {string} props.notification.id - ID único da notificação
 * @param {string} props.notification.type - Tipo da notificação (success, warn, error, info)
 * @param {string} props.notification.message - Mensagem exibida na notificação
 * @returns {JSX.Element | null} JSX da notificação ou null se estiver invisível.
 */
function Notifications({ notification }){
   const notificationRef = useRef(null);

   // Estado para controle de posição e largura da barra de progresso da notificação
   const [left, setLeft] = useState();
   const [barWidth, setBarWidth] = useState();
   const [visible, setVisible] = useState(true);

   // Função para remover a notificação do estado global
   const deletNotification = useToastNotifications(state => state.deletNotification);

   // Map de estilos e ícones por tipo de notificação
   const type = {
      success: {bg: 'bg-green-100', bar: 'bg-green-500', icon: 'check_circle'},
      warn: {bg: 'bg-yellow-100', bar: 'bg-yellow-500', icon: 'warning'},
      error: {bg: 'bg-red-100', bar: 'bg-red-500', icon: 'report'},
      info: {bg: 'bg-blue-100', bar: 'bg-blue-500', icon: 'info'},
   }

   useEffect(() => {
      // Delay para iniciar a animação suave de entrada da notificação
      setTimeout(() => {
         setLeft('17px');     // Move a notificação para dentro da tela
         setBarWidth('0px');  // Começa a animação da barra de progresso (diminui)
      }, 50);

      // Depois de 4 segundos, inicia animação de saída (move a notificação para fora da tela)
      setTimeout(() => {
         setLeft(`-${notificationRef.current.offsetWidth + 20}px`);
      }, 4000);

      // Após 5,4 segundos, esconde o componente e remove a notificação do estado global
      setTimeout(() => {
         setVisible(false);
         deletNotification(notification.id);
      }, 5400);
   }, []);

   if(!visible) return null;

   return (
      <div
         ref={notificationRef}
         className={`relative text-gray-800 flex items-center -right-[240px] justify-around gap-1 text-sm z-40 min-h-16 h-16 p-2 rounded-md transition-all duration-500 shadow-[-10px_35px_60px_2px_rgba(0,0,0,0.3)] ${type[notification.type].bg}`}
         style={{ right: left }}
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
