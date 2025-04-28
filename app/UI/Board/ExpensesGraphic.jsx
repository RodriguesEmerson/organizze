import { memo, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js";
import { useExpensesGraphic } from "@/app/hooks/useExpensesGraphic";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { ChartDoughnut } from "@/app/components/charts/ChartDoughnut";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { Spinner } from "@/app/components/loads/spinner";

//Registra todos os componentes e plugins necessários para o Chart.js funcionar corretamente.
Chart.register(...registerables);

export function ExpesesGraphic () {
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [data, setData] = useState(false);
   
   useEffect(() => {
      if(entriesData){
         setData({
            expenses: entriesData.entries.expenses,
            sum: entriesData.sum
         });
      }
   },[entriesData.sum]);

   return (
      < ExpesesGraphicBody data={data} />
   )
}

const ExpesesGraphicBody = memo(({data}) => {
   const { getExpensesData } = useExpensesGraphic();

   return (
      <div className="!min-w-[636px] h-[300px] flex flex-col flex-1 items-center p-1 pr-2 bg-white shadow-md rounded-md overflow-hidden">
         {!data &&
            <Spinner />
         }
         {data && 
         <>
            <div className="flex items-center justify-center text-gray-900 text-xs mb-1 h-8">
            <h2>Despesas por Categoria</h2>
            </div>
            <div className="flex w-full flex-row p-2">
               <div className="min-w-[400px]  h-[250px] pt-4">
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
               <span className="h-[85%] mt-[2px] w-[1px] rounded-sm mx-2 bg-gray-400"></span>
               <div className=" relative pt-8">
                  <div className="absolute top-[52%] left-[29%]">
                     <p className="font-bold w-[85px] text-center text-xl leading-7">
                        {`${(data.sum.expenses_sum / (data.sum.expenses_sum + data.sum.incomes_sum) * 100).toFixed(2)}%`}
                     </p>
                  </div>
               <div className="w-[200px] h-[200px]">
                     <ChartDoughnut
                        data={{
                           labels: ['Despesas Totais'],
                           labels: ['Despesas Totais'],
                           values: [data.sum.expenses_sum, data.sum.incomes_sum],
                           colors: ['#D91136', '  #D3D3D370']
                        }}
                        size={{ w: '200', h: '200' }}
                     />
                  </div>
               </div>
            </div>
         </>
         }
      </div>
   )
}) 