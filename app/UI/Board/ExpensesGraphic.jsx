import { memo } from "react"
import { Chart, registerables } from "chart.js";
import { useExpensesGraphic } from "@/app/hooks/useExpensesGraphic";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { useSummaryGraphic } from "@/app/hooks/useSummaryGraphic";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const ExpesesGraphic = memo(() => {
   const { totalExpenses, totalIncomes } = useSummaryGraphic();
   const { getExpensesData } = useExpensesGraphic();

   return (
      <div className="!min-w-[636px] h-[300px] flex flex-col items-center p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-gray-900 text-xs w-[104%] mb-1 h-8">
            <h2>Despesas por Categoria</h2>
         </div>
         <div className="flex flex-row p-2">

            <div className="w-[400px] h-[250px] pt-4">
               <ChartBar
                  data={{
                     labels: getExpensesData().labels,
                     datasets: [
                        {
                           data: getExpensesData().values,
                           backgroundColor: ['#D91136'],
                        }
                     ],
                     orientation: 'x'
                  }}
               />
            </div>
            <span className="h-[85%] mt-[2px] w-[1px] rounded-sm mx-2 bg-gray-400"></span>
            <div className=" relative pt-8">
               <div className="absolute top-[52%] left-[29%]">
                  <p className="font-bold w-[85px] text-center text-xl leading-7">
                     {totalExpenses && `${(totalExpenses / (totalExpenses + totalIncomes) * 100).toFixed(2)}%`}
                  </p>
               </div>
               <div className="w-[200px] h-[200px]">
                  <ChartDoughnut
                     data={{
                        labels: ['Despesas Totais'],
                        labels: ['Despesas Totais'],
                        values: [totalExpenses, totalIncomes],
                        colors: ['#D91136', '  #D3D3D370']
                     }}
                     size={{ w: '200', h: '200' }}
                  />
               </div>
            </div>

         </div>
      </div>
   )
}) 