import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { useIncomesGraphic } from "@/app/hooks/useIncomesGraphic";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { Spinner } from "@/app/components/loads/spinner";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function IncomesGraphic () {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [data, setData] = useState(false);
   
   useEffect(() => {
      if(entriesData){
         setData({
            incomes: entriesData.entries.incomes,
            sum: entriesData.sum
         });
      }
   },[entriesData.sum]);

   return (
      < IncomesGraphicBody data={data} />
   )
}

export const IncomesGraphicBody = memo(({data}) => {

   const { getIncomesData } = useIncomesGraphic();

   return (
      <div className="!min-w-[636px] h-[300px] flex flex-1  flex-col items-center bg-white p-1 pr-2 shadow-md rounded-md overflow-hidden">
         {!data &&
            <Spinner />
         }
         {data && 
         <>
             <div className="flex items-center justify-center text-gray-900 text-xs w-[105%] mb-1 h-8">
               <h2>Receitas por Categoria</h2>
            </div>

            <div className="flex w-full flex-row p-2 ">
               <div className="min-w-[400px] flex-1 h-[250px] pt-4">
                  <ChartBar
                     data={{
                        labels: getIncomesData(data.incomes).labels,
                        datasets: [
                           {
                              data: getIncomesData(data.incomes).values,
                              backgroundColor: ['#316628'],
                           }
                        ],
                        orientation: 'x'
                     }}
                  />
               </div>

               <span className="h-[85%] mt-[2px] !w-[1px] rounded-sm mx-2 bg-gray-400"></span>
               <div className="relative pt-8">
                  <div className="absolute top-[52%] left-[29%]">
                     <p className="font-bold w-[85px] text-center text-xl leading-7">
                        {`${(data.sum.incomes_sum / (data.sum.expenses_sum + data.sum.incomes_sum) * 100).toFixed(2)}%`}
                     </p>
                  </div>
                  <div className="w-[200px] h-[200px]">
                     <ChartDoughnut data={{ labels: ['Receitas Totais'], values: [data.sum.incomes_sum, data.sum.expenses_sum], colors: ['#316628', '#D3D3D370'] }} size={{ w: '200', h: '200' }} />
                  </div>
               </div>
            </div>
         </>
         }
        

      </div>
   )
})