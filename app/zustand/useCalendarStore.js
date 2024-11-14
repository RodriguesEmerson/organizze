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
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
   ]
}))