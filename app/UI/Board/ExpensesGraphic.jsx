import { memo} from "react"
import { Chart, registerables } from "chart.js";
import { useExpensesGraphic } from "@/app/hooks/useExpensesGraphic";
import { ChartBar } from "@/app/components/ChartBar";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const ExpesesGraphic = memo(() => {
   const { getExpensesData } = useExpensesGraphic();
   return (
      <div className="!min-w-[450px] h-[300px] flex flex-col items-center p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[104%] -mt-1 mb-1 bg-red-800 h-8">
            <h2>Despesas por Categoria</h2>
         </div>
         <ChartBar data={getExpensesData()} />
      </div>
   )
}) 