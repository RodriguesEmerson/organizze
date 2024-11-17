import { useTable } from "./useTable";

export function useIncomesGraphic() {
   const { tableHandler } = useTable();
   const data = tableHandler.getSelectedMonthData().incomes;

   function getIncomesData() {
      if (data) { 
         const incomesData = {};
         data.forEach(income => {
            incomesData[income.categ]
               ? incomesData[income.categ] = Number(incomesData[income.categ]) + Number(income.value)
               : incomesData[income.categ] = Number(income.value);
         });
         const categoriesNames = Object.keys(incomesData);
         const categoriesValues = Object.values(incomesData);

         return { labels: categoriesNames, values: categoriesValues };
      }
   }
   
   return { getIncomesData };
}