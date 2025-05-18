'use client'

import { useState, useEffect } from "react";

export function useCalendar(defaultDate) { //Defaultdate deve ser no formato aaaa/mm/dd
   const defaultMonth = defaultDate ? Number(defaultDate.split(/\/|\-/)[1]) : false;
   const defaultYear = defaultDate ? Number(defaultDate.split(/\/|\-/)[0]) : false;
   const [selectedDateAtCalendar, setSelectedDateAtCalendar] = useState({ year: defaultYear, month: defaultMonth })
   const [calendarDays, setCalendarDays] = useState();

   useEffect(() => {
      if (selectedDateAtCalendar.year) {
         //O selectedDateAtCalendar precisa ser "-1" pois o método new Date() pega o mês pelo index;
         setCalendarDays(calendarHandler.calendar(selectedDateAtCalendar?.month - 1, selectedDateAtCalendar?.year));
         return;
      }

      //Se uma data não for enviada, seleciona o mes atual
      const month = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' }).split('/');
      setSelectedDateAtCalendar({ month: month[0], year: Number(month[1]) })

   }, [selectedDateAtCalendar.month]);

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
         const prevMonthDays = [...Array(firstWeekDayOfMonth).keys()].map(day =>
            this.getHowManyDaysInTheMonth(month, year).prevMonth - (firstWeekDayOfMonth - 1 - day)
         );

         //Cria um array com todos os dias do mês atual.
         const currentMonthDays = [...Array(this.getHowManyDaysInTheMonth(month, year).currMonth).keys()].map(day =>
            day + 1
         );

         //Cria um array com os primerios dias do próximo mês.
         const restDays = (42 - (prevMonthDays.length + currentMonthDays.length));
         const nextMonthDays = [...Array(restDays).keys()].map(day => day + 1);
         //42

         const calendarDayss = {
            firstWeekDayOfMonth: firstWeekDayOfMonth,
            prevMonthDays: prevMonthDays,
            currentMonthDays: currentMonthDays,
            nextMonthDays: nextMonthDays
         }

         return calendarDayss;
      },

      getCurrentMonthTime: () => {
         const currentMonthAndYear = new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit' });
         return new Date(`${currentMonthAndYear}-1`).getTime();
      },

      //*************************************************HANDLES***************************************************/
      previousMonth: () => {
         setSelectedDateAtCalendar(prev => ({
            month: prev.month === 1 ? 12 : prev.month - 1,
            year: prev.month === 1 ? prev.year - 1 : prev.year
         }))
      },
      nextMonth: () => {
         setSelectedDateAtCalendar(prev => ({
            month: prev.month === 12 ? 1 : prev.month + 1,
            year: prev.month === 12 ? prev.year + 1 : prev.year
         }))
      },
      getClickedCalendarDate: (day, group) => {
         //group é o grupo de números do calendário, que são três: prev, curr, next.
         const { month, year } = selectedDateAtCalendar;
         if (group == 'prev') {
            const prevMonth = month == 1 ? 12 : month - 1;
            const newYear = month === 1 ? year - 1 : year;
            return `${String(day).padStart(2, '0')}/${String(prevMonth).padStart(2, '0')}/${newYear}`;
         }
         if (group == 'curr') {
            const currMonth = month;
            const newYear = year;
            return `${String(day).padStart(2, '0')}/${String(currMonth).padStart(2, '0')}/${newYear}`;
         }
         const nextMonth = month == 12 ? 1 : month + 1;
         const newYear = month === 12 ? year + 1 : year;
         return `${String(day).padStart(2, '0')}/${String(nextMonth).padStart(2, '0')}/${newYear}`;
      }
   }
   const weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
   return {
      calendarHandler,
      selectedDateAtCalendar,
      calendarDays,
      weekDays
   }
}