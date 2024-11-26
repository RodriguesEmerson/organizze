import { memo } from "react"
import { useSummaryGraphic } from "@/app/hooks/useSummaryGraphic";
import { ChartPie } from "@/app/components/charts/ChartPie";

export const SummaryGraphic = memo (() => {

   const { totalExpenses, totalIncomes } = useSummaryGraphic();

   return (
      <div className="flex flex-col items-center w-[350px] h-[300px] p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[105%] -mt-1 mb-1 bg-blue-800 h-8">
            <h2>Resumo</h2>
         </div>

         <ChartPie data={{labels: ['Despesas', 'Receitas'], values: [totalExpenses, totalIncomes]}} />
         
      </div>
   )
})