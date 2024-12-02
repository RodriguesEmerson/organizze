import { ChartLine } from "../components/charts/ChartLine"

export default function YearlyDashBoard(){
   return (
      <section
         className="relative ml-44 pl-5 pt-3 pr-3 bg-gray-200"
         style={{ height: "calc(100% - 48px)" }}
      > 
         <div className="h-72 shadow-xl relative w-80 font-semibold text-gray-700 p-2 rounded-md bg-white">
            <h3 className="text-sm text-red-800 font-thin">Despesas</h3>
            <div className="flex flex-row justify-between">
               <div className="mt-2">
                  <span className="text-3xl">R$ 5.567,89</span>
               </div>
               <img
                  className="w-[70px] mr-2 -mt-1"
                  src="/icons/expensesB.png"
                  alt="expenses icon"
               />
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-xs font-thin">Mês a maior despesa: MÊS</span>
               <span className="font-bold">R$ 1.234,56</span>
            </div>
            <div>
               <ChartLine data={{labels: ['jan', 'fev', 'mar', 'abr', 'mai'], values: ['123', '321', '123', '567', '543'], colors: ['#D91136'], opacityColor: ['#D9113640']}} />
            </div>
         </div>
         
      </section>
   )
}