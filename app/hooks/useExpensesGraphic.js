import { useTable } from "./useTable";

export function useExpensesGraphic() {

   function getExpensesData(expenses) {
      if (expenses) {
         const expensesData = {};
         
         //Agrupa as categorias com seus respectivos valores somados.
         expenses.forEach(expense => {
            if(expense.type == 'expense'){
               expensesData[expense.category]
                  ? expensesData[expense.category] = Number(expensesData[expense.category]) + Number(expense.value)
                  : expensesData[expense.category] = Number(expense.value);
            }
         });

         const categoriesNames = Object.keys(expensesData);
         const categoriesValues = Object.values(expensesData);

         return { labels: categoriesNames, values: categoriesValues }
      }
   }
   return { getExpensesData };
}