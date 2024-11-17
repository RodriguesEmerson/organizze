import { usePage } from "./usePage";

export function useSummaryGraphic() {

   const { getTotalExpenses, getTotalIncomes } = usePage();
   const totalExpenses = (getTotalExpenses(true));
   const totalIncomes = (getTotalIncomes(true));

   return { totalExpenses, totalIncomes };
}