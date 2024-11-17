import { memo } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { ChartDoughnut } from "@/app/components/ChartDoughnut";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const IncomesGraphic = memo (() => {

   const { getIncomesData } = useIncomesGraphic();

   return (
      <div className="flex flex-col items-center w-[350px] h-[300px] p-1 pr-2  bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[105%] -mt-1 mb-1 bg-green-800 h-8">
            <h2>Receitas por Categoria</h2>
         </div>

         <ChartDoughnut data={getIncomesData()} />
         
      </div>
   )
})