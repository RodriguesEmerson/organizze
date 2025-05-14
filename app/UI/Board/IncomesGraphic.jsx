import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { Spinner } from "@/app/components/loads/spinner";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function IncomesGraphic() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [data, setData] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setData( entriesData.entries.all);
      }
   }, [entriesData.entries.all]);

   return (
      < IncomesGraphicBody data={data} />
   )
}

export const IncomesGraphicBody = memo(({ data }) => {

   const { getIncomesData } = useIncomesGraphic();

   return (
      <div className="!min-w-[536px] h-[300px] flex flex-1  flex-col items-center bg-white p-1 pr-2 shadow-md rounded-md overflow-hidden">
         {!data &&
            <Spinner />
         }
         {data &&
            <>
               <div className="flex items-center justify-center text-gray-900 text-xs mb-1 h-8">
                  <h2>Receitas por Categoria</h2>
               </div>
               <div className="flex w-full flex-row p-2 ">
                  <div className="flex-1 min-w-[400px] h-[250px] pt-4">
                     <ChartBar
                        data={{
                           labels: getIncomesData(data).labels,
                           datasets: [
                              {
                                 data: getIncomesData(data).values,
                                 backgroundColor: ['#316628'],
                              }
                           ],
                           orientation: 'x'
                        }}
                     />
                  </div>
               </div>
            </>
         }
      </div>
   )
})