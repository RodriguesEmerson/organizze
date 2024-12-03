'use client';

import { useYearlyPage } from "../hooks/useYearlyPage";
import { ChartLine } from "../components/charts/ChartLine"
import { Spinner } from "../UI/spinner";
import { useUtils } from "../hooks/useUtils";

export default function YearlyDashBoard() {

   return (
      <section
         className="relative ml-44 pl-5 pt-3 pr-3 bg-gray-200"
         style={{ height: "calc(100% - 48px)" }}
      >
         <div className="flex flex-row gap-2">
            <BoxInfos type="expenses" title="Despesas" color={'#D91136'} />
            <BoxInfos type="incomes" title="Receitas" color={'#008000'} />
         </div>

      </section>
   )
}

const BoxInfos = ({ type, title, color }) => {
   const { yearlyPageHandler } = useYearlyPage();
   const boxData = yearlyPageHandler.getInfos(type);
   const { toUpperFirstLeter, currencyFormat } = useUtils();

   if (!boxData) {
      return <Spinner />
   }
   return (
      <div className="h-72 shadow-xl relative w-80 font-semibold text-gray-700 p-2 rounded-md bg-white">
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
         <div className="flex flex-col gap-1">
            <span className="text-xs font-thin">Mês com a maior {title.slice(0, -1)}: {toUpperFirstLeter(boxData.greaterValue.month)}</span>
            <span className="font-bold">{currencyFormat(boxData.greaterValue.value)}</span>
         </div>
         <div>
            <ChartLine data={{ labels: boxData.shortLabels, values: boxData.values, colors: [color], opacityColor: [`${color}40`] }} />
         </div>
      </div>
   )
}