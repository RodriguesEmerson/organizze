'use client'
import { PageModel } from "@/app/components/PageModel";
import { ModalNewRelease } from "@/app/components/Modal-NewRelease";
import ExpenseTable from "/app/UI/Board/ExpenseTable";
import IncomeTable from "/app/UI/Board/IncomeTable";
import { useUtils } from "@/app/hooks/useUtils";
import { ExpesesGraphic } from "@/app/UI/Board/ExpensesGraphic";
import { IncomesGraphic } from "@/app/UI/Board/IncomesGraphic";
import { useSearchParams } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useGetEntries } from "@/app/hooks/monthlyPageHooks/useGetEntries";
import { ModalEditEntry } from "@/app/components/modals/ModalEditEntry";
import { ToastNotifications } from "@/app/components/notificatons/ToastNotifications";
import { IncomesTotal } from "@/app/UI/Board/IncomesTotal";
import { BalanceTotal } from "@/app/UI/Board/BalanceTotal";
import { ExpensesTotal } from "@/app/UI/Board/ExpensesTotal";
import { GoalGraphic } from "@/app/UI/Board/GoalGraphic";
import { Spinner } from "@/app/components/loads/spinner";

export default function MonthlyDashBoard() {
   
   useAuthGuard(); //Checks if the user is Authenticated;

   const { toUpperFirstLeter } = useUtils();
   const searchParams = useSearchParams();
   const yearURL =searchParams.get('year');
   const monthURL= searchParams.get('month');
   const { entriesData } = useGetEntries(yearURL, monthURL);

   if (!entriesData) return (
      <div className="flex items-center justify-center h-[95vh]">
      </div>
   )
   
   return (
      <>
      <ModalEditEntry />
      <ToastNotifications />
      <PageModel title={`${toUpperFirstLeter(monthURL)} de ${yearURL}`}>
         {entriesData.loading && 
            <Spinner />
         }
         {entriesData.erro &&
            <div className=" flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${monthURL} de ${yearURL} não foram encontradas!`}</p>
            </div>
         }
         {entriesData.entries &&
            <div className="flex flex-col gap-2 pb-3 ">
               <div className="w-full h-full">
                  <div>
                     <div className="flex flex-row gap-2 mb-2 justify-between">

                        { <ExpensesTotal /> }

                        { <IncomesTotal /> }

                        { <BalanceTotal /> }

                        { <GoalGraphic /> }
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
      </PageModel>
      </>
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