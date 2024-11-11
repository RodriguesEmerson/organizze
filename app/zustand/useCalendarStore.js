import { create } from "zustand";

export const useCalendarStore = create((set) => ({
   monthEndYear: false,
   setMonthEndYear: (monthEndYear) => set((state) => (
      {
         monthEndYear: monthEndYear
      }
   )),
   weekDays:['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'],
   yearMonths: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
   ]
}))