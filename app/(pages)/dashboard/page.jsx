'use client';

import { PageModel } from "@/app/components/PageModel";
import { useSearchParams } from "next/navigation";
import { ChartBar } from "../../components/charts/ChartBar";
import { ChartLine } from "../../components/charts/ChartLine";
import { useUtils } from "../../hooks/useUtils";
import { useYearlyPage } from "../../hooks/useYearlyPage";
import { Spinner } from "../../UI/spinner";
import { useAuthGuard } from "../../hooks/auth/useAuthGuard";
import { useGetYearlySumary } from "@/app/hooks/entries/useGetYearlySumary";

export default function YearlyDashBoard() {

   useAuthGuard();

   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');
   const { yearlySummary } = useGetYearlySumary('2025');

   return (
      <PageModel title={`Relatório${yearURL ? ` de ${yearURL}` : ''}`}>
         {!yearURL &&
            <div className="z-10 text-white">
               <p>Selecione o mês ou ano que deseja vizualiar!</p>
            </div>
         }
         {(yearURL && yearlySummary) &&
         <>
            <div className="flex flex-row gap-2">
               <BoxInfos type="expense" data={yearlySummary} />
               <BoxInfos type="income" data={yearlySummary} />
               <BoxInfos type="balance" data={yearlySummary} />
            </div>
            
            <SumaryChart data={yearlySummary}/>
         </>
         }
      </PageModel>
   )
}

const BoxInfos = ({ type, data }) => {
   const { toUpperFirstLeter, currencyFormat } = useUtils();
   const { getChartLablesAndValues } = useYearlyPage();

   const chartData = getChartLablesAndValues(data.months, type);
   const BoxConfig = {
      expense: { color: 'text-red-700', title: 'Despesas', chartColor: '#D91136' },
      income: { color: 'text-green-700', title: 'Receitas', chartColor: '#008000' },
      balance: { color: 'text-blue-700', title: 'Saldos', chartColor: '#1E90FF' }
   }

   if (!data || data.loading) {
      return <Spinner />
   }

   return (
      <div className="h-72 shadow-md relative min-w-80 flex-1 font-semibold text-gray-700 p-2 rounded-md bg-white">
         <h3 className={`text-sm font-thin ${BoxConfig[type].color}`}
         >{BoxConfig[type].title}</h3>
         <div className="flex flex-row justify-between">
            <div className="mt-2">
               <span className="text-3xl">{currencyFormat(data.summary[type])}</span>
            </div>
            <img
               className="w-[60px] mr-2 -mt-1"
               src={`/icons/${type}B.png`}
               alt="expenses icon"
            />
         </div>
         <div className="flex flex-col gap-1 mt-1">
            <span className="text-xs font-thin">
               Mês com a maior {BoxConfig[type].title.slice(0, -1)}: {toUpperFirstLeter(data.highestValues[type].month)}
            </span>
            <span className="font-bold">{currencyFormat(data.highestValues[type].value)}</span>
         </div>
         <MonthlyTypeChart color={`${BoxConfig[type].chartColor}`} chartData={chartData}/>
      </div>
   )
}

function MonthlyTypeChart({ color, chartData }) {
   return (
      <div className="w-full h-[55%]">
         <ChartLine 
            data={{
               labels: chartData.labels, 
               values: chartData.values, 
               colors: [color],
               opacityColor: [`${color}15`]
            }}
         />
      </div>
   )
}

function SumaryChart({ data }) {
   const { getChartLablesAndValues } = useYearlyPage();

   const chartExpensesData = getChartLablesAndValues(data.months, 'expense');
   const chartIncomesData = getChartLablesAndValues(data.months, 'income');
   const chartBalanceData = getChartLablesAndValues(data.months, 'balance');

   return (
      <div className="w-full h-[335px] rounded-md shadow-xl bg-white mt-2 p-2">
         <p className="text-sm text-center">Detalhes de cada mês</p>
         <div className="w-full h-72">
            <ChartBar data={{
               labels: chartBalanceData.labels,
               datasets: [
                  {
                     label: 'Despesas',
                     data: chartExpensesData.values,
                     backgroundColor: ['#D9113699']
                  },
                  {
                     label: 'Receitas',
                     data: chartIncomesData.values,
                     backgroundColor: ['#00800099']
                  },
                  {
                     label: 'Saldo',
                     data: chartBalanceData.values,
                     backgroundColor: ['#1E90FF99']
                  },
               ],
               orientation: 'x',
               showLabel: true,
               hiddenNumbers: false
            }}
               size={{ w: '500', h: '200' }}
            />
         </div>
      </div>
   )
}