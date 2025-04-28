import { useUtils } from "@/app/hooks/useUtils";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";

export function ExpensesTotal(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const { currencyFormat } = useUtils();
   
   const [expenses, setExpenses] = useState(false);

   useEffect(() => {
      if(entriesData){
         setExpenses(entriesData.sum.expenses_sum);
      }
   },[entriesData.sum.expenses_sum]);

   return(
      <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
         {!entriesData &&
            <Spinner />
         }
         {entriesData && 
            <>
            <div className="w-9">
               <img src="/icons/expenses.png" alt="expenses-icon" />
            </div>
            <div className="h-[70%] flex flex-col items-start justify-center">
               <p className="text-3xl font-extrabold text-gray-600">
                  {currencyFormat(expenses)}
               </p>
               <h4 className="text-sm text-center -mt-1 text-red-800">Despesas totais</h4>
            </div>
             </>
         }
      </div>
   )
}