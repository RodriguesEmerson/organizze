'use client'

import { useState, useEffect } from "react"; 

export function useCalendar(defaultDate) {
   const [ currentMonth, setCurrentMonth] = useState({year: defaultDate?.year, month: defaultDate?.month})
   const [calendarData, setCalendarData] = useState();
   
   useEffect(() => {
      if(currentMonth.year){
         //O currentMonth precisa ser "-1" pois o método new Date() pega o mês pelo index;
         setCalendarData(calendarHandler.calendar(currentMonth?.month - 1, currentMonth?.year));
         return;
      }

      //Se uma data não for enviada, seleciona o mes atual
      const month = new Date().toLocaleDateString('pt-BR',{ year: 'numeric',  month: '2-digit' }).split('/');
      setCalendarData(
         calendarHandler.calendar(
            month[0] - 1, month[1]
         )
      )
   }, [currentMonth]);
   
   const calendarHandler = {
      getHowManyDaysInTheMonth: function (month, year) {
         const daysInTheLastMonth = new Date(year, month, 0).getDate();
         const daysInTheCurrentMonth = new Date(year, month + 1, 0).getDate();
         const dayInTheNextMonth = new Date(year, month + 2, 1).getDate();

         return ({ prevMonth: daysInTheLastMonth, currMonth: daysInTheCurrentMonth, nextMonth: dayInTheNextMonth });
      },
      
      calendar: function (month, year) {
         //Dia da semana que inicia o mês.
         const firstWeekDayOfMonth = (new Date(year, month, 1).getDay());
         
         //Cria um array com os ultimos dias do mês anterior que aparecem na mesma semana do 1º dia do mês atual.
         const lastDaysOfPreviousMonth = [...Array(firstWeekDayOfMonth).keys()].map(day =>
            this.getHowManyDaysInTheMonth(month, year).prevMonth - (firstWeekDayOfMonth - 1 - day)
         );
         
         //Cria um array com todos os dias do mês atual.
         const currentMonthDays = [...Array(this.getHowManyDaysInTheMonth(month, year).currMonth).keys()].map(day =>
            day + 1
         );

         //Cria um array com os primerios dias do próximo mês.
         const restDays = (42 - (lastDaysOfPreviousMonth.length + currentMonthDays.length));
         const firstDaysOfNextMonth = [...Array(restDays).keys()].map(day => day  + 1 );
         //42
         
         const calendarDatas = {
            firstWeekDayOfMonth: firstWeekDayOfMonth,
            lastDaysOfPreviousMonth: lastDaysOfPreviousMonth,
            currentMonthDays: currentMonthDays,
            firstDaysOfNextMonth: firstDaysOfNextMonth
         }
         
         return calendarDatas;
      },

      getCurrentMonthTime:() => {
         const month = new Date().toLocaleDateString('pt-br', { year: 'numeric',  month: '2-digit' });
         return new Date(`${month}-1`).getTime();
      },
      
      //*************************************************HANDLES***************************************************/
      handleChangeMonth: function (arrow) {
         if (arrow == 'next') {
            setCurrentMonth({
               month: (currentMonth.month + 1) % 12,
               year: currentMonth.month == 11
               ? currentMonth.year + 1
               : currentMonth.year
            })
            return;
         }
         
         setCurrentMonth({
            month: currentMonth.month == 0
            ? 11
            : currentMonth.month - 1,
            year: currentMonth.month == 0
            ? currentMonth.year - 1
            : currentMonth.year
         })
      }
   }
   const weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
   return {
      calendarHandler,
      currentMonth,
      calendarData,
      weekDays
   }
}