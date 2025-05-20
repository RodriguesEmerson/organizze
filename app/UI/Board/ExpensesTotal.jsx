import { TotalMonthlyBox } from "@/app/components/TotalMonthlyBox";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";

export function ExpensesTotal() {
   const entriesData = useEntriesDataStore(state => state.entriesData);

   const [expenses, setExpenses] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setExpenses(entriesData.sum.expenses_sum);
      }
   }, [entriesData.sum.expenses_sum]);

   return (
      <>
         < TotalMonthlyBox 
            text='Despesas totais' 
            textColor='text-red-800' 
            value={expenses} 
            icon={'/icons/expenses.png'}
         />
      </>
   )
}