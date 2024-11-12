'use client'

import { useState, useEffect } from "react";
import { useTableStore } from "../zustand/useTablesStore";
import { useCalendarStore } from "../zustand/useCalendarStore";
export default function useCalendar() {
 
   const { monthEndYear, setMonthEndYear, yearMonths } = useCalendarStore();
   const { selectedTable } = useTableStore();
   const [currentCalendar, setCurrentCalendar] = useState();
   
   useEffect(() => {
      !monthEndYear && setMonthEndYear({month: yearMonths.indexOf(selectedTable.month), year: selectedTable.year})
      setCurrentCalendar(datesHandler.calendar(monthEndYear?.month, monthEndYear?.year));
   }, [monthEndYear]);
   
   const datesHandler = {
      checkDeadline: function (period) {
         const today = new Date(this.dateConvert(this.today())).getTime();
         const term = new Date(period.fim).getTime();
         if (period.status) return "bg-green-700 text-white pt-[5px] pr-[6px]";
         if (term == today) return "bg-yellow-400 text-gray-700 pt-[5px] pr-[6px]";
         if (term < today) return "bg-red-700 text-white pt-[5px] pr-[6px]";
      },
      
      toggleStatus: function (period, cardInfos, setCardInfos) {
         const currentStatus = period.status;
         setCardInfos(
            { ...cardInfos, periodo: { ...period, status: !currentStatus } }
         )
      },
      
      monthDays: function (month, year) {
         const daysNumberInTheLastMonth = new Date(year, month, 0).getDate();
         const daysNumberCurrentMonth = new Date(year, month + 1, 0).getDate();
         const dayNumberNextMonth = new Date(year, month + 2, 0).getDate();

         return ({ prevMonth: daysNumberInTheLastMonth, currMonth: daysNumberCurrentMonth, nextMonth: dayNumberNextMonth });
      },
      calendar: function (month, year) {
         //Dia da semana que foi o primeiro dia do mês.
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
      
      isDateInAnalyzedPeriod: function (period, day, month, year) {
         let analyzedYear = year
         let analyzedMonth = month;
         if (month > 12) {
            analyzedYear++;
            analyzedMonth = 1;
         }
         if (month < 1) {
            analyzedYear--;
            analyzedMonth = 12;
         }

         const startDate = new Date(period.inicio).getTime();
         const endDate = new Date(period.fim).getTime();
         const analyzedDay = (new Date(`${analyzedYear}/${analyzedMonth}/${day}`).getTime());
         
         //Verifica se as datas recebidas formam um período, com data de incio e fim.
         if (!period.inicio || !period.fim) {
            //Se tiver apenas a data de inicio
            if (period.inicio && (analyzedDay == startDate)) return true;
            //Se tiver a penas a data final.
            if (period.fim && (analyzedDay == endDate)) return true;
         };
         
         //Checa se dia está dentro do periodo analizado.
         if (analyzedDay >= startDate && analyzedDay <= endDate) return true;
      },
      
      validateDate: function (date) {
         //Regex para validar o formato da data recebida.
         console.log(date)
         const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/;
         if (!regex.test(date)) return false;
         
         //Converte a data para o padrão aceito pelo js. 
         const convertedDate = this.dateConvert(date);
         //Valida a data.
         if (new Date(convertedDate) == 'Invalid Date') return false;
         
         const yearMilisseconds = 365 * 24 * 60 * 60 * 1000; //Um ano em milissegundos (365 dias);
         const convertedDateMilisseconds = new Date(convertedDate).getTime(); //data recebida em milissegundos;
         const todayMilisseconds = new Date(this.dateConvert(this.today())).getTime(); //hoje em milissegundos;
         
         //Vilida se o periodo da data tem o período de um ano.
         if (convertedDateMilisseconds > todayMilisseconds + yearMilisseconds
            || convertedDateMilisseconds < todayMilisseconds - yearMilisseconds
         ) return false;
         
         return convertedDate;
      },
      
      isStartDateGreaterThanEndDate: function (date, endDate) {
         //Checa se a data enviada é maior que a data final.
         if (new Date(date).getTime() > new Date(endDate).getTime()) {
            return true;
         }
         return false;
      },

      checkData: function(){
         //Essa função checará a data
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
      
      savePeriod: function () {
         modalInfos.setCardInfos({
            ...modalInfos.getCardInfos(),
            periodo: period
         })
      },
      
      today: function () {
         return new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' })
      },
      
      //*************************************************HANDLES***************************************************/
      /************************************************************************************************************/
      handleStartDate: function (date, endDate, removeStartDate) {
         let newDate;
         removeStartDate ? newDate = '' : newDate = this.validateDate(date);
         let fim = endDate;
         
         if (!removeStartDate) {
            if (!newDate) return console.log('Data inválida.');
            //Se a data final for menor que a data adicionada, é removida.
            if (this.isStartDateGreaterThanEndDate(newDate, this.dateConvert(endDate))) fim = '';
         }
         if(checkTwo){
            setDateType(false);
         }
         
         setPeriod({ ...period, inicio: newDate, fim: fim ? this.dateConvert(fim) : '' });
      },
      
      handleEndDate: function (date, startDate, removeEndDate) {
         let newDate;
         removeEndDate ? newDate = "" : newDate = this.validateDate(date);
         if (!removeEndDate) {
            if (!newDate) return console.log('Data inválida.');
            //Checa se a data inicial é maior que a final, se sim a data menor vai pra inicial.
            if (this.isStartDateGreaterThanEndDate(this.dateConvert(startDate), newDate)) {
               setPeriod({ ...period, inicio: newDate, fim: '' });
               setDateType(false) 
               return;
            }
            setPeriod({...period, inicio: startDate ? this.dateConvert(startDate) : '', fim: newDate})
            setDateType(checkOne ? true : false)
            return;
         }
         
         setDateType(checkOne ? true : false);   
         setPeriod({ ...period, inicio: startDate ? this.dateConvert(startDate) : '', fim: newDate });
      },
      
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
   
   //***********************************************************************************************************/
   /************************************************************************************************************/
   return {
      datesHandler,
      monthEndYear,
      currentCalendar
   }
}