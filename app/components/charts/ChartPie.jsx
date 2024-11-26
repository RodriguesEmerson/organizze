import { useChartPie } from "@/app/hooks/useChartPie";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ChartPie({ data }) {
   const chartRef = useRef(null);
   const chartInstance = useRef(null);

   const { chartPiecConfig, setchartData } = useChartPie();

   useEffect(() => {
      setchartData(data)
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, chartPiecConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [chartPiecConfig]);

   return (
      <div className="w-[250px] h-[250px]">
         <canvas ref={chartRef} width="250" height="250" className=""></canvas>
      </div>
   )
}