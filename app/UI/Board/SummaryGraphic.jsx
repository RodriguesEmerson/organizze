import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { ChartDoughnutSkeleton } from "@/app/components/loads/MonthlyPageSqueleton";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function SummaryGraphic() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [sum, setSum] = useState(false);

   useEffect(() => {
      if (entriesData) {
         if (entriesData?.sum.expenses_sum != sum?.expenses_sum || entriesData?.sum.incomes_sum != sum?.incomes_sum) {
            setSum(entriesData.sum);
         }
      }
   }, [entriesData.sum]);

   return (
      <>
         {!sum &&
            < ChartDoughnutSkeleton />
         }
         {sum &&
            < SummaryGraphicBody sum={sum} />
         }
      </>
   )
}

export const SummaryGraphicBody = memo(({ sum }) => {
   return (
      <div className="!min-w-[200px] h-[300px] flex flex-1  flex-col items-center bg-white p-1 pr-2 shadow-md rounded-md overflow-hidden">
         <>
            <div className="flex items-center justify-center text-gray-900 text-xs mb-1 h-8">
               <h2>Resumo</h2>
            </div>
            <div className="flex w-full p-2 ">
               {(sum.expenses_sum == 0 && sum.incomes_sum == 0) &&
                  <div className="content-center h-52 text-xs">
                     <p className="text-center">Ainda não há informações a serem exibidas.</p>
                  </div>
               }
               {(sum.expenses_sum != 0 || sum.incomes_sum != 0) &&
                  <div className="relative pt-2">
                     <div className="w-[200px] h-[200px]">
                        <ChartDoughnut
                           data={{
                              labels: ['Receitas Totais', 'Despesas Totais'],
                              values: [sum.incomes_sum, sum.expenses_sum],
                              colors: ['#316628', '#D91136'],
                              onlyFirsValue: false,
                           }}
                           size={{ w: '200', h: '200' }}
                        />
                     </div>
                     <div className="absolute flex flex-row justify-between -bottom-10 left-0 w-full">
                        <div className="text-center">
                           <span className="font-bold w-[85px] text-center text-sm leading-7 text-red-800">
                              {`${(sum.expenses_sum / (sum.expenses_sum + sum.incomes_sum) * 100).toFixed(2)}%`}
                           </span>
                           <span className="text-xs block -mt-2">Despesas</span>
                        </div>
                        <div className="text-center">
                           <span className="font-bold w-[85px] text-center text-sm leading-7 text-green-800">
                              {`${(sum.incomes_sum / (sum.expenses_sum + sum.incomes_sum) * 100).toFixed(2)}%`}
                           </span>
                           <span className="text-xs block -mt-2">Receitas</span>
                        </div>
                     </div>
                  </div>
               }
            </div>
         </>
      </div>
   )
})