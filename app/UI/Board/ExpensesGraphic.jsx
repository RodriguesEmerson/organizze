import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js";
import { useExpensesGraphic } from "@/app/hooks/useExpensesGraphic";
import { useTableStore } from "@/app/zustand/useTablesStore";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ExpesesGraphic() {
   const chartRef = useRef(null);
   const chartInstance = useRef(null); 
   const { data } = useTableStore();

   const { getExpensesData, expensesGraphicConfig } = useExpensesGraphic();

   useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      // const ExpensesChart = new Chart(ctx, expensesGraphicConfig);
      chartInstance.current = new Chart(ctx, expensesGraphicConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [expensesGraphicConfig]);

   useEffect(()=> {
      //Update the graphic data.
      getExpensesData();
   },[data])

   return (
      <div className="p-1 pr-2 w-[500px] bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[103%] -ml-1 -mt-1 mb-1 bg-red-800 h-8">
            <h2>Despesas por Categoria</h2>
         </div>
         <canvas ref={chartRef} width="500" height="300" className=""></canvas>
      </div>
   )
}