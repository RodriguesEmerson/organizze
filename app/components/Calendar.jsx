'use client'
import { useEffect, useState, useRef } from "react";
import { tw_Merge } from 'tailwind-merge'
import useCalendar from "../hooks/useCalendar";
import { useCalendarStore } from "../zustand/useCalendarStore";
import { useUtils } from "../hooks/useUtils";

export function Calendar({disabledCalendar, formData, setFormData, formRef, ...props}) {
   const { weekDays, yearMonths } = useCalendarStore();
   const { datesHandler, monthEndYear, currentCalendar } = useCalendar();
   const [openCalendar, setOpenCalendar] = useState(false);
   const { toUpperFirstLeter } = useUtils();
   const calendarInput = useRef(null);

   const handleSetInputValue = ( value ) =>{
      setFormData({...formData, [formRef]: value})
   }


   let { month, year } = monthEndYear;
   return (
      <div className="relative modal calendar">
         <div className="w-full flex flex-row">
            <input
            ref={calendarInput}
               className={`h-8 pl-3 w-full font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-400 ${disabledCalendar ? "bg-gray-200" : "bg-white"}`}
               {...props}
            />
            <span 
               className={`material-icons -ml-6 mt-[4px] cursor-pointer ${disabledCalendar ? "!text-gray-500 !cursor-default" : ''}`}
               onClick={()=> {
                  !disabledCalendar && setOpenCalendar(!openCalendar);
               }}
            >calendar_month</span>
         </div>

         <div className={`z-10 absolute overflow-hidden  bg-white w-[276px] p-[10px] pt-2 rounded-lg shadow-lg transition-all
            ${openCalendar ? "h-[314px]" : "h-0 !p-0"}`}
            style={{ top: `${0}px`, left: `${112}px` }}
         >
            <h2 className="text-center text-sm font-semibold text-gray-600 mb-3">Calendário</h2>
            <span
               className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-8 h-8 !leading-8 text-center hover:bg-gray-200"
               onClick={() => { setOpenCalendar(false) }}
            >close</span>

            <div>
               <div className="flex justify-between items-center  text-gray-600 mb-3">
                  <span
                     className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
                     onClick={() => datesHandler.handleChangeMonth('previous')}
                  >chevron_left
                  </span>

                  <p className="text-xs font-semibold cursor-default">
                     {/**Gets month by index */}
                     {`${toUpperFirstLeter(yearMonths[monthEndYear.month])} de ${monthEndYear.year}`}
                  </p>

                  <span
                     className="material-icons h-7 w-7 pt-[2px] text-center hover:bg-gray-200 cursor-pointer rounded"
                     onClick={() => datesHandler.handleChangeMonth('next')}
                  >chevron_right
                  </span>
               </div>
               <div className="grid grid-cols-7 mb-2">
                  {weekDays.map(day => (
                     <span
                        key={`weedDay${day}`}
                        className={`text-xs  text-center font-semibold mb-2 ${day == "Dom" && "text-red-700"}`}
                     >{day}</span>
                  ))}

                  {currentCalendar?.lastDaysOfPreviousMonth.map(day => (
                     <span
                        key={`mAnte${day}`}
                        className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-blue-200 text-gray-400 cursor-pointer border border-white`}
                        onClick={() => {
                           handleSetInputValue(`${day}/${month < 1 ? "12" : month < 10 ? `0${month}` : month}/${month < 1 ? year -1 : year}`);
                           setOpenCalendar(false);
                        }}
                     >{day}</span>
                  ))}

                  {currentCalendar?.currentMonthDays.map(day => (
                     <span
                        key={`monthDay${day}`}
                        className={`h-8 leading-8 rounded-[3px] text-[14px] text-center hover:bg-blue-200   cursor-pointer border border-white
                     ${(new Date().getDate() == day && monthEndYear.month == new Date().getMonth()) && "text-blue-600 font-bold border-b-[3px] border-b-blue-600"}
                  `}
                        onClick={() => {
                           handleSetInputValue(datesHandler.dateConvert(`${month + 1}/${day}/${year}`, 'br'));
                           setOpenCalendar(false);
                        }}
                     >{day}</span>
                  ))}

                  {currentCalendar?.firstDaysOfNextMonth.map(day => (
                     <span
                        key={`mAnte${day}`}
                        className={`h-8 leading-8 rounded-[3px] text-[14px] text-center  hover:bg-blue-200 text-gray-400 cursor-pointer border border-white
                  `}
                        onClick={() => {
                           setInputValue(datesHandler.dateConvert(`${(month + 2) % 12}/${day}/${month + 2 > 12 ? year + 1 : year}`, 'br'));
                           setOpenCalendar(false);
                        }}
                     >{day}</span>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}