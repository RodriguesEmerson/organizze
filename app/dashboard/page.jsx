'use client';

import { useSearchParams } from "next/navigation";
import { ChartBar } from "../components/charts/ChartBar";
import { ChartLine } from "../components/charts/ChartLine";
import { useUtils } from "../hooks/useUtils";
import { useYearlyPage } from "../hooks/useYearlyPage";
import { Spinner } from "../UI/spinner";
import { useAuthGuard } from "../hooks/auth/useAuthGuard";

export default function YearlyDashBoard() {
   
   useAuthGuard();

   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');

   return (
      <section
         className="relative ml-44 pl-5 pt-3 pr-3 bg-gray-200"
         style={{ height: "calc(100% - 48px)" }}
      >
         {!yearURL &&
            <div>
               <p>Selecione a tabela que deseja vizualiar!</p>
            </div>
         }
         {yearURL &&
            <>
               <div className="sticky top-12 z-[11]  border-t-gray-300 h-8 bg-gray-900 text-white -mt-3  mb-2 text-center leading-8 -ml-[200px]" style={{ width: '100vw' }}>
                  {`Relatório de ${yearURL}`}
               </div>
               <div className="absolute top-0 -left-44 h-24 w-[100vw] bg-gray-900 !z-[0]"></div>

               <div className="flex flex-row gap-2">
                  <BoxInfos type="expenses" title="Despesas" color={'#D91136'} />
                  <BoxInfos type="incomes" title="Receitas" color={'#008000'} />
                  <BoxInfos type="sumary" title="Saldos" color={'#1E90FF'} />
               </div>

               <SumaryChart />
            </>
         }
      </section>
   )
}

const BoxInfos = ({ type, title, color }) => {
   const { yearlyPageHandler } = useYearlyPage();
   const { toUpperFirstLeter, currencyFormat } = useUtils();

   const boxData = type !== "sumary"
      ? yearlyPageHandler.getInfos(type)
      : yearlyPageHandler.getYearlySumary();


   if (!boxData) {
      return <Spinner />
   }
   return (
      <div className="h-72 shadow-xl relative min-w-80 flex-1 font-semibold text-gray-700 p-2 rounded-md bg-white">
         <h3 className="text-sm text-red-800 font-thin"
            style={{ color: `${color}` }}
         >{title}</h3>
         <div className="flex flex-row justify-between">
            <div className="mt-2">
               <span className="text-3xl">{currencyFormat(boxData.total)}</span>
            </div>
            <img
               className="w-[60px] mr-2 -mt-1"
               src={`/icons/${type}B.png`}
               alt="expenses icon"
            />
         </div>
         <div className="flex flex-col gap-1 mt-1">
            <span className="text-xs font-thin">Mês com a maior {title.slice(0, -1)}: {toUpperFirstLeter(boxData.greaterValue.month)}</span>
            <span className="font-bold">{currencyFormat(boxData.greaterValue.value)}</span>
         </div>
         <div className="w-full h-[55%]">
            <ChartLine data={{ labels: boxData.shortLabels, values: boxData.values, colors: [color], opacityColor: [`${color}40`] }} />
         </div>
      </div>
   )
}

function SumaryChart() {
   const { yearlyPageHandler } = useYearlyPage();

   const expensesData =  yearlyPageHandler.getInfos("expenses");
   const incomesData =  yearlyPageHandler.getInfos("incomes");
   const sumaryData = yearlyPageHandler.getYearlySumary();

   return (
      <div className="w-full h-[335px] rounded-md shadow-xl bg-white mt-2 p-2">
         <p className="text-sm text-center">Detalhes de cada mês</p>
         <div className="w-full h-72">
            <ChartBar data={{
               labels: sumaryData.labels,
               datasets: [
                  {
                     label: 'Despesas',
                     data: expensesData?.values,
                     backgroundColor: ['#D9113699']
                  },
                  {
                     label: 'Receitas',
                     data: incomesData?.values ,
                     backgroundColor: ['#00800099']
                  },
                  {
                     label: 'Saldo',
                     data: sumaryData?.values,
                     backgroundColor: ['#1E90FF99']
                  },
               ],
               orientation: 'x',
               showLabel: true,
               hiddenNumbers: true
            }}
               size={{ w: '500', h: '200' }}
            />
         </div>
      </div>
   )
}