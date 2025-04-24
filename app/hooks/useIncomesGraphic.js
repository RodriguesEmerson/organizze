import { useTable } from "./useTable";

export function useIncomesGraphic() {

   function getIncomesData(incomes) {
      if (incomes) { 
         const incomesData = {};
         incomes.forEach(income => {
            incomesData[income.category]
               ? incomesData[income.category] = Number(incomesData[income.category]) + Number(income.value)
               : incomesData[income.category] = Number(income.value);
         });
         const categoriesNames = Object.keys(incomesData);
         const categoriesValues = Object.values(incomesData);

         return { labels: categoriesNames, values: categoriesValues };
      }
   }
   
   return { getIncomesData };
}