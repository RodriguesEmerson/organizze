'use client';

import { useChartLine } from "@/app/hooks/charts/useChartLine";
import { Chart, registerables } from "chart.js";
import { useEffect, useRef } from "react";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ChartLine({ data }){ 
   const chartRef = useRef(null);
   const chartInstance = useRef(null);

   const { chartLineConfig, setchartData } = useChartLine();

   useEffect(() => {
      setchartData(data);

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, chartLineConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [chartLineConfig]);

   return (
         <canvas ref={chartRef} width="520" height="300" className=""></canvas>
   )
}