import { Chart, registerables } from "chart.js";
import { useChartDoughnut } from "../hooks/useChartDoughnut";
import { useEffect, useRef } from "react";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ChartDoughnut({ data }){
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
      <div className="w-[250px] h-[250px]">
         <canvas ref={chartRef} width="250" height="250" className=""></canvas>
      </div>
   )
}