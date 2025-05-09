import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { useExpensesGraphic } from "@/app/hooks/useExpensesGraphic";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { Spinner } from "@/app/components/loads/spinner";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ExpesesGraphic() {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [data, setData] = useState(false);

   useEffect(() => {
      if (entriesData) {
         setData({
            expenses: entriesData.entries.expenses,
         });
      }
   }, [entriesData.entries.expenses]);

   return (
      < ExpesesGraphicBody data={data} />
   )
}

const ExpesesGraphicBody = memo(({ data }) => {
   const { getExpensesData } = useExpensesGraphic();
   return (
      <div className="!min-w-[536px] h-[300px] flex flex-col flex-1 items-center p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         {!data &&
            <Spinner />
         }
         {data &&
            <>
               <div className="flex items-center justify-center text-gray-900 text-xs mb-1 h-8">
                  <h2>Despesas por Categoria</h2>
               </div>
               <div className="flex w-full flex-row p-2">
                  <div className="flex-1 min-w-[400px] h-[250px] pt-4">
                     <ChartBar
                        data={{
                           labels: getExpensesData(data.expenses).labels,
                           datasets: [
                              {
                                 data: getExpensesData(data.expenses).values,
                                 backgroundColor: ['#D91136'],
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