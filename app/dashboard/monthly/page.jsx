'use client'
import { ModalNewRelease } from "@/app/components/Modal-NewRelease";
import { useTable } from "@/app/hooks/useTable";
import { Spinner } from "@/app/UI/spinner";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useTableStore } from "@/app/zustand/useTablesStore";
import { usePage } from "/app/hooks/usePage";
import ExpenseTable from "/app/UI/Board/ExpenseTable";
import IncomeTable from "/app/UI/Board/IncomeTable";
import { useUtils } from "@/app/hooks/useUtils";
import { ExpesesGraphic } from "@/app/UI/Board/ExpensesGraphic";
import { IncomesGraphic } from "@/app/UI/Board/IncomesGraphic";
import { SummaryGraphic } from "@/app/UI/Board/SummaryGraphic";
import { useCallback } from "react";

export default function MonthlyDashBoard() {
   const { data, getTotalExpenses, getTotalIncomes, getBalance  } = usePage();
   const { tableHandler } = useTable();

   const selectedTable  = useTableStore((state) => state.selectedTable);
   const showAddReleaseModal = useModalsHiddenStore((state) => state.showAddReleaseModal);
   const setHiddenAllModals = useModalsHiddenStore((state) => state.setHiddenAllModals);
   
   const table = tableHandler.getSelectedMonthData();

   const { toUpperFirstLeter } = useUtils();
   let initialClick = false;

   if (!data) return <Spinner />
   return (
      <section
         className="ml-9 pl-5 pt-3 bg-gray-200"
         style={{ height: "calc(100% - 48px)" }}
      >
         {showAddReleaseModal &&
            <div 
               className=" absolute flex justify-center items-center bg-black bg-opacity-75 top-0 left-0 h-full w-full z-[30]"
               onMouseDown={(e)=> {
                  initialClick = e.target.closest(".modal");
               }}
               onMouseUp={(e)=> {
                  if(!e.target.closest(".modal") && !initialClick){
                     setHiddenAllModals();
                  }
               }}
            >
               <ModalNewRelease />
            </div>
         }

         <div className="sticky top-12 z-[11] border-b-[1px] border-b-gray-300 h-8 bg-white text-gray-900 -mt-3 -ml-5 mb-2 text-center leading-8">
            {`${toUpperFirstLeter(selectedTable?.month)} de ${selectedTable?.year}`}
         </div>
         {!table 
            ?
            <div className=" flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${selectedTable.month} de ${selectedTable.year} não foram encontradas!`}</p>
            </div>
            :
            <div className="flex flex-col gap-2 pb-3">
              
               <div className="w-full h-full">
                  

                  <div className="flex flex-row gap-2">
                     <ExpesesGraphic />
                     <IncomesGraphic />
                     <div>
                        <div className="flex flex-col gap-2">

                           <div className="h-28 w-48 bg-gradient-to-r from-red-800 to-red-900 text-white rounded-md pt-3">
                              <h4 className="text-sm text-center ">Total Despesas</h4>
                              <div className="h-[70%] flex items-center justify-center">
                                 <p className="text-3xl font-extrabold">{getTotalExpenses()}</p>
                              </div>
                           </div>

                           <div className="h-28 w-48 bg-gradient-to-r from-green-800 to-green-900 text-white rounded-md pt-3">
                              <h4 className="text-sm text-center ">Total Receitas</h4>
                              <div className="h-[70%] flex items-center justify-center">
                                 <p className="text-3xl font-extrabold">{getTotalIncomes()}</p>
                              </div>
                           </div>

                           <div className="h-28 w-48 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md pt-3">
                              <h4 className="text-sm text-center ">Saldo</h4>
                              <div className="h-[70%] flex items-center justify-center">
                                 <p className="text-3xl font-extrabold">{getBalance()}</p>
                              </div>
                           </div>
                        </div>
                        <div>

                        </div>
                     </div>
                     <SummaryGraphic />
                  </div>

                  <div className="flex items-center justify-center border-b border-b-gray-400 my-3 mr-2">
                     <h2 className="text-2xl font-extrabold text-gray-500 mt-2">Tabelas</h2> 
                  </div>
               </div>
               <div className="flex flex-row gap-2">
                  <ExpenseTable />
                  <IncomeTable />
               </div>
            </div>
         }
         
      </section>
   )
}