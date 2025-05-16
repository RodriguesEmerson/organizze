'use client'
import { useCalendar } from "@/app/hooks/calendar/useCalendar";
import { useUtils } from "@/app/hooks/useUtils";
import { useState } from "react";

export function Calendar({ params }) {
   const { disabledCalendar, formData, setFormData, name, navButtonsStatus = 'on', defaultMonth = false} = params;
   const { calendarHandler, calendarData, weekDays } = useCalendar(defaultMonth);
   const [openCalendar, setOpenCalendar] = useState(false);
   const { toUpperFirstLeter, getMonthName } = useUtils();

   //ADICIONAR MÊS MÍNIMO PARA DESABILIDAR O BOTÃO MES ANTERIOR

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

   const handleSetInputValue = ( value ) =>{
      setFormData({...formData, [name]: value})
   }

   let month = 4, year = 2025 ;
   return (
      <div className="relative modal calendar ">

         {/* CALENDAR INPUT/TEXT */}
         <div className="w-full flex flex-row">
            <input type="text" readOnly
               className={`h-8 pl-3 w-full font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400 ${disabledCalendar ? "bg-gray-200" : "bg-white"}`}
            />
            <span 
               className={`material-icons -ml-6 mt-[4px] cursor-pointer ${disabledCalendar ? "!text-gray-500 !cursor-default" : ''}`}
               onClick={()=> {
                  !disabledCalendar && setOpenCalendar(!openCalendar);
               }}
            >calendar_month</span>
         </div>
            
         {/* CALENDAR MODAL */}
         <div className={`z-10 absolute overflow-hidden  bg-white w-[276px] p-[10px] pt-2 rounded-lg shadow-lg transition-all
            ${openCalendar ? "h-[314px]" : "h-0 !p-0"}`}
            style={{ top: `${0}px`, left: `${112}px` }}
         >
            {/* HEADER:= */}
            <div>
               <h2 className="text-center text-sm font-semibold text-gray-600 mb-3">Calendário</h2>
               <span
                  className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-8 h-8 !leading-8 text-center hover:bg-gray-200"
                  onClick={() => { setOpenCalendar(false) }}
               >close</span>
            </div>

            {/* NAVBUTTONS */}
            <div className="flex justify-between items-center  text-gray-600 mb-3">
               <span
                  className={`material-icons h-7 w-7 pt-[2px] text-center rounded 
                     ${calendarConfig[navButtonsStatus].navButtonsClasses}`}
                  onClick={() => navButtonsStatus == 'on' && calendarHandler.handleChangeMonth('previous')}
               >chevron_left
               </span>
               <p className="text-xs font-semibold cursor-default">
                  {/**Gets month by index */}
                  {`${toUpperFirstLeter(getMonthName(`${year}-0${month}-01`, false))} de ${year}`}
               </p>
               <span
                  className={`material-icons h-7 w-7 pt-[2px] text-center rounded 
                     ${calendarConfig[navButtonsStatus].navButtonsClasses}`}
                  onClick={() => navButtonsStatus == 'on' &&  calendarHandler.handleChangeMonth('next')}
               >chevron_right
               </span>
            </div>
                  
            {/* CALENDAR DAYS */}
            <div className="grid grid-cols-7 mb-2">
               {weekDays.map(day => (
                  <span
                     key={`weedDay${day}`}
                     className={`text-xs  text-center font-semibold mb-2 ${day == "Dom" && "text-red-700"}`}
                  >{day}</span>
               ))}

               {calendarData?.lastDaysOfPreviousMonth.map(day => (
                  <span
                     key={`mAnte${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center 
                        ${calendarConfig[navButtonsStatus].calendarNextAndPrevDaysClasses}`}
                     onClick={() => {
                        if(navButtonsStatus == 'on'){
                           handleSetInputValue(`${day}/${month < 1 ? "12" : month < 10 ? `0${month}` : month}/${month < 1 ? year -1 : year}`);
                           setOpenCalendar(false);
                        }
                     }}
                  >{day}</span>
               ))}

               {calendarData?.currentMonthDays.map(day => (
                  <span
                     key={`monthDay${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-blue-200   cursor-pointer border border-white
                  ${(new Date(`${year}-${month}-01`).getTime() == calendarHandler.getCurrentMonthTime()) && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}
               `}
                     onClick={() => {
                        handleSetInputValue(calendarHandler.dateConvert(`${month + 1}/${day}/${year}`, 'br'));
                        setOpenCalendar(false);
                     }}
                  >{day}</span>
               ))}

               {calendarData?.firstDaysOfNextMonth.map(day => (
                  <span
                     key={`mAnte${day}`}
                     className={`h-8 leading-8 rounded-[3px] text-[14px] text-center 
                        ${calendarConfig[navButtonsStatus].calendarNextAndPrevDaysClasses}`}
                     onClick={() => {  
                        if(navButtonsStatus == 'on'){
                           setInputValue(calendarHandler.dateConvert(`${(month + 2) % 12}/${day}/${month + 2 > 12 ? year + 1 : year}`, 'br'));
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