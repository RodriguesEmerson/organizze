import { useUtils } from "@/app/hooks/useUtils";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";

export function IncomesTotal(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const { currencyFormat } = useUtils();
   
   const [incomes, setIncomes] = useState(false);

   useEffect(() => {
      if(entriesData){
         setIncomes(entriesData.sum.incomes_sum);
      }
   },[entriesData.sum.incomes_sum]);

   return(
      <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
         {!entriesData &&
            <Spinner />
         }
         {entriesData && 
            <>
            <div className="w-9">
               <img src="/icons/incomes.png" alt="incomes-icon"  />
            </div>
            <div className="h-[70%] flex flex-col items-start justify-center">
               <p className="text-3xl font-extrabold text-gray-600">
                  {currencyFormat(incomes)}
               </p>
               <h4 className="text-sm text-center -mt-1 text-green-800">Receitas totais</h4>
            </div>
             </>
         }
      </div>
   )
}