import { ChartBar } from "@/app/components/charts/ChartBar";
import { Spinner } from "@/app/components/loads/spinner";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { memo, useEffect, useState } from "react";

export function GoalGraphic(){
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [sum, setSum] = useState(false);
   
   useEffect(() => {
      if(entriesData){
         if(entriesData?.sum.expenses_sum != sum?.expenses_sum || entriesData?.sum.incomes_sum != sum?.incomes_sum){
            setSum(entriesData.sum);
         }
      }
   },[entriesData.sum]);

   return(
      <GoalGraphicBody sum={sum} />
   )
}

const GoalGraphicBody = memo(({sum}) =>{
   return(
      <div className="relative z-[5] flex pl-1  h-28 shadow-md w-72 bg-white flex-1 text-white rounded-md overflow-hidden">
         {!sum &&
            <Spinner />
         }
         {sum && 
         <>
            <div className="w-[250px] h-[130px]">
               {/*Labels, values, colors, orientation*/}
               <ChartBar
                  data={{
                     labels: ['Meta', ''],
                     values: [4000, sum.balance],
                     colors: ['#047857',
                        (sum.balance) >= 4000 
                           ? "#6ee7b7" 
                           : (sum.balance) < 0 ? "#D91136" : "#a4a4a4" ,
                     ],
                     orientation: 'y'
                  }}
               />
            </div>
            <div className="absolute flex flex-row text-center w-10 right-7 top-11 text-gray-500">
               <span className="text-xl font-semibold">
                  {(sum.balance >= 0
                     ? `${(sum.balance / 4000 * 100).toFixed(0)}`
                     : '0')
                  }%
               </span>
               <span className="text-xs rotate-90 -ml-7">Concluídos</span>
            </div>
         </>
         }
      </div>
   )
})