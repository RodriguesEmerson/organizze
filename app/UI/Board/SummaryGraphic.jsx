import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { Spinner } from "@/app/components/loads/spinner";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function SummaryGraphic() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [data, setData] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setData({
            sum: entriesData.sum
         });
      }
   }, [entriesData.sum]);

   return (
      < SummaryGraphicBody data={data} />
   )
}

export const SummaryGraphicBody = memo(({ data }) => {
   return (
      <div className="!min-w-[200px] h-[300px] flex flex-1  flex-col items-center bg-white p-1 pr-2 shadow-md rounded-md overflow-hidden">
         {!data &&
            <Spinner />
         }
         {data &&
            <>
               <div className="flex items-center justify-center text-gray-900 text-xs mb-1 h-8">
                  <h2>Resumo</h2>
               </div>
               <div className="flex w-full flex-row p-2 ">
                  <div className="relative pt-2">
                     <div className="w-[200px] h-[200px]">
                        <ChartDoughnut 
                           data={{ 
                              labels: ['Receitas Totais', 'Despesas Totais'], 
                              values: [data.sum.incomes_sum, data.sum.expenses_sum],
                              colors: ['#316628', '#D91136'] 
                           }} 
                           size={{ w: '200', h: '200' }} 
                        />
                     </div>
                     <div className="absolute flex flex-row justify-between -bottom-10 left-0 w-full">
                        <div className="text-center">
                           <span className="font-bold w-[85px] text-center text-sm leading-7 text-red-800">
                              {`${(data.sum.expenses_sum / (data.sum.expenses_sum + data.sum.incomes_sum) * 100).toFixed(2)}%`}
                           </span>
                           <span className="text-xs block -mt-2">Despesas</span>
                        </div>
                        <div className="text-center">
                           <span className="font-bold w-[85px] text-center text-sm leading-7 text-green-800">
                              {`${(data.sum.incomes_sum / (data.sum.expenses_sum + data.sum.incomes_sum) * 100).toFixed(2)}%`}
                           </span>
                           <span className="text-xs block -mt-2">Receitas</span>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         }
      </div>
   )
})