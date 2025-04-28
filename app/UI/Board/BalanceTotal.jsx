import { useUtils } from "@/app/hooks/useUtils";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";


export function BalanceTotal(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const { currencyFormat } = useUtils();
   
   const [balance, setBalance] = useState(false);

   useEffect(() => {
      if(entriesData){
         setBalance(entriesData.sum.balance);
      }
   },[entriesData.sum.balance]);

   return(
      <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
         {!entriesData &&
            <Spinner />
         }
         {entriesData && 
            <>
            <div className="w-9">
               <img src="/icons/balance.png" alt="balance-icon" />
            </div>
            <div className="h-[70%] flex flex-col items-start justify-center">
               <p className="text-3xl font-extrabold text-gray-600">
                  {currencyFormat(balance)}
               </p>
               <h4 className="text-sm text-center -mt-1 text-blue-800">Saldo</h4>
            </div>
             </>
         }
      </div>
   )
}