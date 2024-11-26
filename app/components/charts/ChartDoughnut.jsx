import { useChartDoughnut } from "@/app/hooks/useChartDoughnut";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ChartDoughnut({ data, size }){
   const chartRef = useRef(null);
   const chartInstance = useRef(null); 

   const { chartDoughnutConfig, setchartData } = useChartDoughnut();

   useEffect(() => {
      setchartData(data)
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, chartDoughnutConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [chartDoughnutConfig]);

   return (
         <canvas ref={chartRef} width={size?.w} height={size?.h} className=""></canvas>
   )
}