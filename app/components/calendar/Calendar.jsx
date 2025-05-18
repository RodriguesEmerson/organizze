'use client'
import { useCalendar } from "@/app/hooks/calendar/useCalendar";
import { useUtils } from "@/app/hooks/useUtils";
import { useState } from "react";

/**
* Calendário personalizado já com input que mostra a data selecionada.
* -Permite enviar um mês padrão para ser mostrado ao abrir o calendário,
* ativar ou não os botões de navegação entre os meses, selecionar uma data
* clicando no dia desejado no calendário e permite também desabilitar o
* input e clendário.
*/


export function Calendar({ params }) {
   const { disabledCalendar, formData, setFormData, name, navButtonsStatus = 'on', defaultMonth = false } = params;
   const { calendarHandler, selectedDateAtCalendar, calendarDays, weekDays } = useCalendar(defaultMonth);
   const { year, month } = selectedDateAtCalendar;
   const { toUpperFirstLeter } = useUtils();
   
   //Define se o modal do calendário deve ser aberto.
   const [openCalendar, setOpenCalendar] = useState(false);

   //Classes do botões de navegação e dos dias do calendário do mes anterior e posterior
   //baseado no status da navBar.
   const calendarConfig = {
      on: {
         navButtonsClasses: 'hover:bg-gray-200 cursor-pointer text-gray-600',
         calendarNextAndPrevDaysClasses: 'hover:bg-blue-200 text-gray-400 cursor-pointer',
      },
      off: {
         navButtonsClasses: '!text-gray-200 !cursor-default',
         calendarNextAndPrevDaysClasses: 'text-gray-200 cursor-default',
      },
   }

   //Seta o mês selecioando no formData enviado.
   const handleSetDate = (date) => {
      setFormData({ ...formData, [name]: date })
   }

   return (
      <div className="relative modal calendar ">

         {/* INPUT/TEXT que mostra o dia selecionado*/}
         <div className="w-full flex flex-row">
            <input type="text" readOnly defaultValue={formData[name]}
               className={`h-8 pl-3 w-full font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400 ${disabledCalendar ? "bg-gray-200" : "bg-white"}`}
            />
            <span
               className={`material-icons -ml-6 mt-[4px] cursor-pointer ${disabledCalendar ? "!text-gray-500 !cursor-default" : ''}`}
               onClick={() => {
                  !disabledCalendar && setOpenCalendar(!openCalendar);
               }}
            >calendar_month</span>
         </div>

         {/* CALENDAR MODAL */}
         <div className={`z-10 absolute overflow-hidden  bg-white w-[276px] p-[10px] pt-2 rounded-lg shadow-lg transition-all
            ${openCalendar ? "h-[314px]" : "h-0 !p-0"}`}
            style={{ top: `${0}px`, left: `${112}px` }}
         >
            {/* Cabeçalho do modal calendário com título e botão de fechar */}
            <div>
               <h2 className="text-center text-sm font-semibold text-gray-600 mb-3">Calendário</h2>
               <span
                  className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-8 h-8 !leading-8 text-center hover:bg-gray-200"
                  onClick={() => { setOpenCalendar(false) }}
               >close</span>
            </div>

            {/* NAVBUTTONS com nome do mês e ano selecionado no centro */}
            <div className="flex justify-between items-center  text-gray-600 mb-3">
               <span
                  className={`material-icons h-7 w-7 pt-[2px] text-center rounded 
                     ${calendarConfig[navButtonsStatus].navButtonsClasses}`}
                  onClick={() => 
                     //Altera o mês do calendário para o mês anterior se navButtons estiver ativa
                     navButtonsStatus == 'on' && calendarHandler.previousMonth()
                  }
               >chevron_left</span>
               <p className="text-xs font-semibold cursor-default">
                  {`${toUpperFirstLeter(new Date(year, month - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }))}`}
               </p>
               <span
                  className={`material-icons h-7 w-7 pt-[2px] text-center rounded 
                     ${calendarConfig[navButtonsStatus].navButtonsClasses}`}
                  onClick={() => 
                     //Altera o mês do calendário para o mês anterior se navButtons estiver ativa
                     navButtonsStatus == 'on' && calendarHandler.nextMonth()
                  }
               >chevron_right</span>
            </div>

            {/* CALENDAR DAYS */}
            <div className="grid grid-cols-7 mb-2">
               {weekDays.map(day => (
                  <span
                     key={`weedDay${day}`}
                     className={`text-xs  text-center font-semibold mb-2 ${day == "Dom" && "text-red-700"}`}
                  >{day}</span>
               ))}

               {calendarDays?.prevMonthDays.map(day => (
                  <span
                     key={`mAnte${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center 
                        ${calendarConfig[navButtonsStatus].calendarNextAndPrevDaysClasses}`}
                     onClick={() => {
                        //Seleciona o dia do mês anterior se a navBar estiver ativa.
                        if (navButtonsStatus == 'on') {
                           handleSetDate(calendarHandler.getClickedCalendarDate(day, 'prev'));
                           setOpenCalendar(false);
                        }
                     }}
                  >{day}</span>
               ))}

               {calendarDays?.currentMonthDays.map(day => (
                  <span
                     key={`monthDay${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-blue-200   cursor-pointer border border-white
                        ${calendarHandler.isToday(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`) && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}`}
                     onClick={() => {
                        //Seleciona o dia do mês atual.
                        handleSetDate(calendarHandler.getClickedCalendarDate(day, 'curr'));
                        setOpenCalendar(false);
                     }}
                  >{day}</span>
               ))}

               {calendarDays?.nextMonthDays.map(day => (
                  <span
                     key={`mAnte${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center 
                        ${calendarConfig[navButtonsStatus].calendarNextAndPrevDaysClasses}`}
                     onClick={() => {
                        //Seleciona o dia do mês porterior se a navBar estiver ativa.
                        if (navButtonsStatus == 'on') {
                           handleSetDate(calendarHandler.getClickedCalendarDate(day, 'next'));
                           setOpenCalendar(false);
                        }
                     }}
                  >{day}</span>
               ))}
            </div>
         </div>
      </div>
   )
}