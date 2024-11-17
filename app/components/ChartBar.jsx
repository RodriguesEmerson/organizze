import { useRef, useEffect } from "react";
import { useChartBar } from "../hooks/useCharBar";
import { Chart, registerables } from "chart.js";

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
      <div className="w-[400px] h-[300px] pt-4">
         <canvas ref={chartRef} width="520" height="300" className=""></canvas>
      </div>
   )
}