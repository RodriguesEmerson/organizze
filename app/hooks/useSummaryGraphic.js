import { useMonthlyPage } from "./useMonthlyPage";

export function useSummaryGraphic() {

   const { getTotalExpenses, getTotalIncomes } = useMonthlyPage();
   const totalExpenses = (getTotalExpenses(true));
   const totalIncomes = (getTotalIncomes(true));

   return { totalExpenses, totalIncomes };
}