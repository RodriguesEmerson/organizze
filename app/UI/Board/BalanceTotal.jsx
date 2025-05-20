import { TotalMonthlyBox } from "@/app/components/TotalMonthlyBox";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useEffect, useState } from "react";


export function BalanceTotal() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [balance, setBalance] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setBalance(entriesData.sum.balance);
      }
   }, [entriesData.sum.balance]);

   return (
      <>
         < TotalMonthlyBox
            text='Saldo'
            textColor='text-blue-800'
            value={balance}
            icon={'/icons/balance.png'}
         />
      </>

   )
}