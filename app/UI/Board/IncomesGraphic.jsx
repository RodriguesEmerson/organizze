import { memo, useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { useTableStore } from "@/app/zustand/useTablesStore";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export const IncomesGraphic = memo (() => {
   const chartRef = useRef(null);
   const chartInstance = useRef(null); 

   const { incomesGraphicConfig } = useIncomesGraphic();

   useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, incomesGraphicConfig);

      // Cleanup para evitar problemas com múltiplos gráficos
      return () => {
         chartInstance.current.destroy();
      }
   }, [incomesGraphicConfig]);

   // useEffect(()=> {
   //    //Update the graphic data.
   //    getIncomesData();
   // },[data])

   return (
      <div className="p-1 pr-2 w-[350px] bg-white shadow-md rounded-md overflow-hidden">
         <div className="flex items-center justify-center text-white text-xs w-[105%] -ml-1 -mt-1 mb-1 bg-green-800 h-8">
            <h2>Receitas por Categoria</h2>
         </div>
         <canvas ref={chartRef} width="350" height="300" className=""></canvas>
      </div>
   )
})