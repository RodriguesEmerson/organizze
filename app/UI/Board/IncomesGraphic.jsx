import { memo } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { ChartDoughnut } from "@/app/components/ChartDoughnut";
import { useSummaryGraphic } from "@/app/hooks/useSummaryGraphic";
import { ChartBar } from "@/app/components/ChartBar";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const IncomesGraphic = memo (() => {

   const { getIncomesData } = useIncomesGraphic();
   const { totalExpenses, totalIncomes } = useSummaryGraphic();

   return (
      <div className="!min-w-[636px] h-[300px] flex flex-col items-center p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[105%] -mt-1 mb-1 bg-green-800 h-8">
            <h2>Receitas por Categoria</h2>
         </div>

         <div className="flex flex-row p-2">
            <ChartBar data={{...getIncomesData(), colors: ['#316628']}} />
            <span className="h-[85%] mt-[2px] w-1 rounded-sm mx-2 bg-green-900"></span>
            <div className="pt-8">
               <div className="w-[200px] h-[200px]">
                  <ChartDoughnut data={{ labels: ['Despesas Totais'], values: [totalIncomes, totalExpenses], colors: ['#316628', '#D3D3D370']}}  size={{w: '200', h: '200'}}/>
               </div>
            </div>
         </div>
         
      </div>
   )
})