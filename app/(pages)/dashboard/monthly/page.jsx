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
import { TooltipInfo } from "@/app/components/TooltipInfo";
import { FloatOkNotification } from "@/app/components/FloatOkNotification";
import { useSearchParams } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useGetEntries } from "@/app/hooks/monthlyPageHooks/useGetEntries";
import { ModalEditEntry } from "@/app/components/modals/ModalEditEntry";
import { ToastNotifications } from "@/app/components/notificatons/ToastNotifications";

export default function MonthlyDashBoard() {
   
   useAuthGuard(); //Checks if the user is Authenticated;
   

   const { toUpperFirstLeter, currencyFormat } = useUtils();
   const searchParams = useSearchParams();
   const yearURL =searchParams.get('year');
   const monthURL= searchParams.get('month');
   const { entriesData } = useGetEntries(yearURL, monthURL);

   
   if (!entriesData) return (
      <div className="flex items-center justify-center h-[95vh]">
         <Spinner />
      </div>
   )

   return (
      <section
         className="relative ml-44 pl-5 pt-3 pr-3"
         style={{ height: "calc(100% - 48px)" }}
      >

         <ModalEditEntry />
         <ToastNotifications />

         <div className="sticky top-12 z-[11]  border-t-gray-300 h-8 bg-gray-900 text-white -mt-3  mb-2 text-center leading-8 -ml-[200px]" style={{ width: '100vw' }}>
            {`${toUpperFirstLeter(monthURL)} de ${yearURL}`}
         </div>

         <div className="absolute top-0 -left-44 h-24 w-[100vw] bg-gray-900 !z-[0]"></div>

         {!entriesData
            ?
            <div className=" flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${monthURL} de ${yearURL} não foram encontradas!`}</p>
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
                              <p className="text-3xl font-extrabold text-gray-600">
                                 {currencyFormat(entriesData.sum.expenses_sum)}
                              </p>
                              <h4 className="text-sm text-center -mt-1 text-red-800">Despesas totais</h4>
                           </div>
                        </div>

                        <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
                           <div className="w-9">
                              <img src="/icons/incomes.png" alt="incomes-icon" />
                           </div>
                           <div className="h-[70%] flex flex-col items-start justify-center">
                              <p className="text-3xl font-extrabold text-gray-600">
                                 {currencyFormat(entriesData.sum.incomes_sum)}
                              </p>
                              <h4 className="text-sm text-center -mt-1 text-green-800">Receitas totais</h4>
                           </div>
                        </div>

                        <div className="z-[5] flex items-center gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3">
                           <div className="w-9">
                              <img src="/icons/balance.png" alt="balance-icon" />
                           </div>
                           <div className="h-[70%] flex flex-col items-start justify-center">
                              <p className="text-3xl font-extrabold text-gray-600">
                                 {currencyFormat(entriesData.sum.balance)}
                              </p>
                              <h4 className="text-sm text-center -mt-1 text-blue-800">Saldo</h4>
                           </div>
                        </div>

                        <div className="relative z-[5] flex pl-1  h-28 shadow-md w-72 bg-white flex-1 text-white rounded-md overflow-hidden">
                           <div className="w-[250px] h-[130px]">
                              {/*Labels, values, colors, orientation*/}
                              <ChartBar
                                 data={{
                                    labels: ['Meta', ''],
                                    values: [4000, entriesData.sum.balance],
                                    colors: ['#047857',
                                       (entriesData.sum.balance) >= 4000 
                                          ? "#6ee7b7" 
                                          : (entriesData.sum.balance) < 0 ? "#D91136" : "#a4a4a4" ,
                                    ],
                                    orientation: 'y'
                                 }}
                              />
                           </div>
                           <div className="absolute flex flex-row text-center w-10 right-7 top-11 text-gray-500">
                              <span className="text-xl font-semibold">
                                 {(entriesData.sum.balance >= 0
                                    ? `${(entriesData.sum.balance / 4000 * 100).toFixed(0)}`
                                    : '0')
                                 }%
                              </span>
                              <span className="text-xs rotate-90 -ml-7">Concluídos</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="w-full flex flex-row gap-2 justify-between">
                     <ExpesesGraphic expenses={entriesData.entries.expenses} sumary={entriesData.sum}/>
                     <IncomesGraphic incomes={entriesData.entries.incomes} sumary={entriesData.sum}/>
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
         {/* <TooltipInfo /> */}
         <ExpenseTable />
         <IncomeTable />
      </div>
   )
}