'use client'

import { useState, useEffect } from "react";
import { useTableStore } from "../zustand/useTablesStore";
import { useCalendarStore } from "../zustand/useCalendarStore";

export default function useCalendar() {
   const { monthEndYear, setMonthEndYear, yearMonths } = useCalendarStore();
   const selectedTable = useTableStore(state => state.selectedTable);
   const [currentCalendar, setCurrentCalendar] = useState();

   useEffect(() => {
      !monthEndYear && setMonthEndYear({month: yearMonths.indexOf(selectedTable.month), year: selectedTable.year})
      setCurrentCalendar(datesHandler.calendar(monthEndYear?.month, monthEndYear?.year));
   }, [monthEndYear]);

   useEffect(() => {
      setMonthEndYear({month: yearMonths.indexOf(selectedTable.month), year: selectedTable.year})
   }, [selectedTable]);

   const datesHandler = {
      
      monthDays: function (month, year) {
         const daysNumberInTheLastMonth = new Date(year, month, 0).getDate();
         const daysNumberCurrentMonth = new Date(year, month + 1, 0).getDate();
         const dayNumberNextMonth = new Date(year, month + 2, 0).getDate();

         return ({ prevMonth: daysNumberInTheLastMonth, currMonth: daysNumberCurrentMonth, nextMonth: dayNumberNextMonth });
      },
      
      calendar: function (month, year) {
         //Dia da semana que inicia o mês.
         const firsWeekDayOfMonth = (new Date(year, month, 1).getDay());
         
         //Cria um array com números do 1º dia da semana até o 1º dia do mês.
         const weekDays = []
         for (let day = 1; day <= firsWeekDayOfMonth; day++) {
            weekDays.push(day);
         }
         
         //Cria um array com os ultimos dias do mês anterior que aparecem na mesma semana do 1º dia do mês atual.
         const lastDaysOfPreviousMonth = [];
         for (let day = firsWeekDayOfMonth - 1; day >= 0; day--) {
            lastDaysOfPreviousMonth.push(this.monthDays(month, year).prevMonth - day);
         }
         
         //Cria um array com os primerios dias do próximo mês.
         const firstDaysOfNextMonth = [];
         const lastWeekDayOfCurrentMonth = new Date(year, month + 1, 0).getDay();
         let day = 1;
         for (let d = lastWeekDayOfCurrentMonth; d < 6; d++) {
            firstDaysOfNextMonth.push(day);
            day++;
         }
         
         //Cria um array com todos os dias do mês atual.
         const currentMonthDays = [];
         const daysNumberCurrentMonth = new Date(year, month + 1, 0).getDate();
         for (let day = 1; day <= daysNumberCurrentMonth; day++) {
            currentMonthDays.push(day)
         }
         
         const calendarDatas = {
            firsWeekDayOfMonth: firsWeekDayOfMonth,
            lastDaysOfPreviousMonth: lastDaysOfPreviousMonth,
            currentMonthDays: currentMonthDays,
            firstDaysOfNextMonth: firstDaysOfNextMonth
         }
         
         return calendarDatas;
      },
      
      isValidDate: function (date) {
         //Regex para validar o formato da data recebida.
         const regex = /^(\d{4})\/(\d{2})\/(\d{2})$/;
         if(!regex.test(date)) return false;

         //Valida da data.
         const selectedDate = new Date(date);
         if(isNaN(selectedDate.getTime())) return false;
         
         return true;
      },
      
      dateConvert: function (date, format) {
         if (format == "br") {
            if (date == '') return '';
            return new Date(date).toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
         }
         
         //Divide a data 
         let [day, month, year] = date.split('/');
         
         if (month > 12) { month = 1; year++ } //Se o mes recebido for maior que 12, então é o 1º mês do seguinte.
         if (month < 1) { month = 12; year-- } //Se o mes recebido for menor que 1, então é o 12ª mês do ano anterior.
         //Retorna a data no padrão aaaa/mm/dd;
         return `${year}/${month}/${day}`
      },
      
      today: function () {
         return new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
      },
      
      //*************************************************HANDLES***************************************************/
      handleChangeMonth: function (arrow) {
         if (arrow == 'next') {
            setMonthEndYear({
               month: (monthEndYear.month + 1) % 12,
               year: monthEndYear.month == 11
               ? monthEndYear.year + 1
               : monthEndYear.year
            })
            return;
         }
         
         setMonthEndYear({
            month: monthEndYear.month == 0
            ? 11
            : monthEndYear.month - 1,
            year: monthEndYear.month == 0
            ? monthEndYear.year - 1
            : monthEndYear.year
         })
      }
   }
   return {
      datesHandler,
      monthEndYear,
      currentCalendar
   }
}