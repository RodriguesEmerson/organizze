import { memo, useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js";
import { useTableStore } from "@/app/zustand/useTablesStore";
import { useSummaryGraphic } from "@/app/hooks/useSummaryGraphic";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const SummaryGraphic = memo (() => {
   const chartRef = useRef(null);
   const chartInstance = useRef(null); 
   const  data  = useTableStore((state) => state.data);

   const { summaryGraphicConfig } = useSummaryGraphic();

   useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, summaryGraphicConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [summaryGraphicConfig]);

   return (
      <div className="p-1 pr-2 w-[350px] bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[105%] -ml-1 -mt-1 mb-1 bg-blue-800 h-8">
            <h2>Resumo</h2>
         </div>
         <canvas ref={chartRef} width="350" height="300" className=""></canvas>
      </div>
   )
})