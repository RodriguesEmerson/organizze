import { TotalMonthlyBox } from "@/app/components/TotalMonthlyBox";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";

export function IncomesTotal() {
   const entriesData = useEntriesDataStore(state => state.entriesData);

   const [incomes, setIncomes] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setIncomes(entriesData.sum.incomes_sum);
      }
   }, [entriesData.sum.incomes_sum]);

   return (
      <>
         < TotalMonthlyBox
            text='Receitas totais'
            textColor='text-green-800'
            value={incomes}
            icon={'/icons/incomes.png'}
         />
      </>
   )
}