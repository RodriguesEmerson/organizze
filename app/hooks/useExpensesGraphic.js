import { useTable } from "./useTable";

export function useExpensesGraphic() {
   // const { tableHandler } = useTable();
   // const data = tableHandler.getSelectedMonthData().expenses;
   function getExpensesData(expenses) {
      if (expenses) {
         const expensesData = {};
         expenses.forEach(expense => {
            expensesData[expense.category]
               ? expensesData[expense.category] = Number(expensesData[expense.category]) + Number(expense.value)
               : expensesData[expense.category] = Number(expense.value);
         });
         const categoriesNames = Object.keys(expensesData);
         const categoriesValues = Object.values(expensesData);

         return { labels: categoriesNames, values: categoriesValues }
      }
   }
   return { getExpensesData };
}