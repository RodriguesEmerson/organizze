'use client'

import { useState, useEffect } from "react";

/**
 * Hook personalizado que gera e manipula os dados de um calendário mensal.
 *
 * @param {string} defaultDate - Data inicial no formato "dd/mm/aaaa" ou "dd-mm-aaaa".
 * @returns {{
 *   calendarHandler: {
 *     isToday: (calendarDate: string | Date) => boolean,
 *     previousMonth: () => void,
 *     nextMonth: () => void,
 *     getClickedCalendarDate: (day: number, group: 'prev' | 'curr' | 'next') => string
 *   },
 *   selectedDateAtCalendar: { year: number, month: number },
 *   calendarDays: {
 *     prevMonthDays: number[],
 *     currentMonthDays: number[],
 *     nextMonthDays: number[]
 *   } | undefined,
 *   weekDays: string[]
 * }}
 */

export function useCalendar(defaultDate) {
   // Extrai mês e ano da data padrão, se fornecida
   const defaultMonth = defaultDate ? Number(defaultDate.split(/\/|\-/)[1]) : false;
   const defaultYear = defaultDate ? Number(defaultDate.split(/\/|\-/)[2]) : false;

   const [selectedDateAtCalendar, setSelectedDateAtCalendar] = useState({ year: defaultYear, month: defaultMonth });
   const [calendarDays, setCalendarDays] = useState();

   useEffect(() => {
      if (selectedDateAtCalendar.year) {
         // Subtrai 1 do mês porque o construtor Date usa meses baseados em índice (0-11)
         setCalendarDays(genereTeCalendar(selectedDateAtCalendar?.month - 1, selectedDateAtCalendar?.year));
         return;
      }

      // Caso não haja data inicial, define o mês atual como padrão
      const month = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' }).split('/');
      setSelectedDateAtCalendar({ month: Number(month[0]), year: Number(month[1]) });
   }, [selectedDateAtCalendar.month]);

   /**
    * Gera os dias do calendário com base no mês e ano.
    *
    * @param {number} month - Mês (base 0: janeiro = 0).
    * @param {number} year - Ano.
    * @returns {{
    *   prevMonthDays: number[],
    *   currentMonthDays: number[],
    *   nextMonthDays: number[]
    * }}
    */
   function genereTeCalendar(month, year) {
      const firstWeekDayOfMonth = new Date(year, month, 1).getDay();
      const daysInTheLastMonth = new Date(year, month, 0).getDate();
      const daysInTheCurrentMonth = new Date(year, month + 1, 0).getDate();

      const prevMonthDays = [...Array(firstWeekDayOfMonth).keys()].map(day =>
         daysInTheLastMonth - (firstWeekDayOfMonth - 1 - day)
      );

      const currentMonthDays = [...Array(daysInTheCurrentMonth).keys()].map(day => day + 1);

      const restDays = 42 - (prevMonthDays.length + currentMonthDays.length);
      const nextMonthDays = [...Array(restDays).keys()].map(day => day + 1);

      return {
         prevMonthDays,
         currentMonthDays,
         nextMonthDays
      };
   }

   const calendarHandler = {
      /**
       * Verifica se a data enviada é o dia atual.
       *
       * @param {string | Date} calendarDate
       * @returns {boolean}
       */
      isToday: (calendarDate) => {
         const date = new Date();
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const day = String(date.getDate()).padStart(2, '0');

         return new Date(calendarDate).getTime() === new Date(`${year}-${month}-${day}`).getTime();
      },

      /**
       * Altera o calendário para o mês anterior.
       */
      previousMonth: () => {
         setSelectedDateAtCalendar(prev => ({
            month: prev.month === 1 ? 12 : prev.month - 1,
            year: prev.month === 1 ? prev.year - 1 : prev.year
         }));
      },

      /**
       * Altera o calendário para o próximo mês.
       */
      nextMonth: () => {
         setSelectedDateAtCalendar(prev => ({
            month: prev.month === 12 ? 1 : prev.month + 1,
            year: prev.month === 12 ? prev.year + 1 : prev.year
         }));
      },

      /**
       * Constrói uma data completa (dd/mm/aaaa) com base no clique no calendário.
       *
       * @param {number} day - Dia clicado.
       * @param {'prev' | 'curr' | 'next'} group - Indica a qual mês o dia pertence.
       * @returns {string} Data no formato "dd/mm/aaaa".
       */
      getClickedCalendarDate: (day, group) => {
         const { month, year } = selectedDateAtCalendar;
         if (group === 'prev') {
            const prevMonth = month === 1 ? 12 : month - 1;
            const newYear = month === 1 ? year - 1 : year;
            return `${String(day).padStart(2, '0')}/${String(prevMonth).padStart(2, '0')}/${newYear}`;
         }
         if (group === 'curr') {
            return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
         }
         const nextMonth = month === 12 ? 1 : month + 1;
         const newYear = month === 12 ? year + 1 : year;
         return `${String(day).padStart(2, '0')}/${String(nextMonth).padStart(2, '0')}/${newYear}`;
      }
   };

   const weekDays = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];

   return {
      calendarHandler,
      selectedDateAtCalendar,
      calendarDays,
      weekDays
   };
}
