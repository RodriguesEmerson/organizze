import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useChartBar } from "@/app/hooks/useCharBar";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ChartBar({ data }){ 
   const chartRef = useRef(null);
   const chartInstance = useRef(null);

   const { chartBarConfig, setchartData } = useChartBar();

   useEffect(() => {
      setchartData(data);

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, chartBarConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [chartBarConfig]);

   return (
         <canvas ref={chartRef} width="520" height="300" className=""></canvas>
   )
}