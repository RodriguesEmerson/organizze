import { useTable } from "./useTable";

export function useExpensesGraphic() {
   const { tableHandler } = useTable();
   const data = tableHandler.getSelectedMonthData().expenses;
   function getExpensesData() {
      if (data) {
         const expensesData = {};
         data.forEach(expense => {
            expensesData[expense.categ]
               ? expensesData[expense.categ] = Number(expensesData[expense.categ]) + Number(expense.value)
               : expensesData[expense.categ] = Number(expense.value);
         });
         const categoriesNames = Object.keys(expensesData);
         const categoriesValues = Object.values(expensesData);

         return { labels: categoriesNames, values: categoriesValues }
      }
   }
   return { getExpensesData };
}