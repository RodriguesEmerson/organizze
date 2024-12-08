'use client'
import { ModalNewRelease } from "@/app/components/Modal-NewRelease";
import { useTable } from "@/app/hooks/useTable";
import { Spinner } from "@/app/UI/spinner";
import { useTableStore } from "@/app/zustand/useTablesStore";
import { useMonthlyPage } from "/app/hooks/useMonthlyPage";
import ExpenseTable from "/app/UI/Board/ExpenseTable";
import IncomeTable from "/app/UI/Board/IncomeTable";
import { useUtils } from "@/app/hooks/useUtils";
import { ExpesesGraphic } from "@/app/UI/Board/ExpensesGraphic";
import { IncomesGraphic } from "@/app/UI/Board/IncomesGraphic";
import { ChartBar } from "@/app/components/charts/ChartBar";
import { useSummaryGraphic } from "@/app/hooks/useSummaryGraphic";
import { TooltipInfo } from "@/app/components/TooltipInfo";
import { FloatOkNotification } from "@/app/components/FloatOkNotification";
import { useSearchParams } from "next/navigation";


export default function MonthlyDashBoard() {
   const { data, getTotalExpenses, getTotalIncomes, getBalance } = useMonthlyPage();
   const { tableHandler } = useTable();
   const { totalExpenses, totalIncomes } = useSummaryGraphic();

   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');
   const monthURL = searchParams.get('month');

   const selectedTable = useTableStore((state) => state.selectedTable);
   const table = tableHandler.getSelectedMonthData();
   const { toUpperFirstLeter } = useUtils();
   
   if (!data) return (
      <div className="flex items-center justify-center h-[95vh]">
         <Spinner />
      </div>
   )
   const monthlyGoal = data[yearURL].monthlyGoal;
   return (
      <section
         className="relative ml-44 pl-5 pt-3 pr-3"
         style={{ height: "calc(100% - 48px)" }}
      >
         <ModalNewRelease />
         <FloatOkNotification />

         <div className="sticky top-12 z-[11]  border-t-gray-300 h-8 bg-gray-900 text-white -mt-3  mb-2 text-center leading-8 -ml-[200px]" style={{ width: '100vw' }}>
            {`${toUpperFirstLeter(monthURL)} de ${yearURL}`}
         </div>

         <div className="absolute top-0 -left-44 h-24 w-[100vw] bg-gray-900 !z-[0]"></div>

         {!table
            ?
            <div className=" flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${selectedTable.month} de ${selectedTable.year} não foram encontradas!`}</p>
            </div>
            :
            <div className="flex flex-col gap-2 pb-3 ">

               <div className="w-full h-full">

                  <div>
                     <div className="flex flex-row gap-2 mb-2 justify-between">

                        <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
                           <div className="w-9">
                              <img src="/icons/expenses.png" alt="expenses-icon" />
                           </div>
                           <div className="h-[70%] flex flex-col items-start justify-center">
                              <p className="text-3xl font-extrabold text-gray-600">{getTotalExpenses()}</p>
                              <h4 className="text-sm text-center -mt-1 text-red-800">Despesas totais</h4>
                           </div>
                        </div>

                        <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
                           <div className="w-9">
                              <img src="/icons/incomes.png" alt="incomes-icon" />
                           </div>
                           <div className="h-[70%] flex flex-col items-start justify-center">
                              <p className="text-3xl font-extrabold text-gray-600">{getTotalIncomes()}</p>
                              <h4 className="text-sm text-center -mt-1 text-green-800">Receitas totais</h4>
                           </div>
                        </div>

                        <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
                           <div className="w-9">
                              <img src="/icons/balance.png" alt="balance-icon" />
                           </div>
                           <div className="h-[70%] flex flex-col items-start justify-center">
                              <p className="text-3xl font-extrabold text-gray-600">{getBalance()}</p>
                              <h4 className="text-sm text-center -mt-1 text-blue-800">Saldo</h4>
                           </div>
                        </div>

                        <div className="relative z-[5] flex pl-1  h-28 shadow-md w-72 bg-white flex-1 text-white rounded-md overflow-hidden">
                           <div className="w-[250px] h-[130px]">
                              {/*Labels, values, colors, orientation*/}
                              <ChartBar
                                 data={{
                                    labels: ['Meta', 'Atual'],
                                    values: [monthlyGoal, totalIncomes - totalExpenses],
                                    colors: ['#047857',
                                       (totalIncomes - totalExpenses) >= monthlyGoal 
                                          ? "#6ee7b7" 
                                          : (totalIncomes - totalExpenses) < 0 ? "#D91136" : "#a4a4a4" ,
                                    ],
                                    orientation: 'y'
                                 }}
                              />
                           </div>
                           <div className="absolute flex flex-row text-center w-10 right-7 top-11 text-gray-500">
                              <span className="text-xl font-semibold">
                                 {(totalIncomes && totalExpenses) && (totalIncomes - totalExpenses >= 0
                                    ? `${((totalIncomes - totalExpenses) / monthlyGoal * 100).toFixed(0)}`
                                    : '0')
                                 }%
                              </span>
                              <span className="text-xs rotate-90 -ml-7">Concluídos</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-full flex flex-row gap-2 justify-between">
                     <ExpesesGraphic />
                     <IncomesGraphic />
                  </div>

                  <div className="flex items-center justify-center border-b border-b-gray-400 my-3 mr-2">
                     <h2 className="text-sm font-extrabold text-gray-500 mt-2">Tabelas</h2>
                  </div>
               </div>
               <Tables />
            </div>
         }

      </section>
   )
}

function Tables() {
   return (
      <div className="tables !relative justify-stretch flex flex-row gap-2">
         <TooltipInfo />
         <ExpenseTable />
         <IncomeTable />
      </div>
   )
}