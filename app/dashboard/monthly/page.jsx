'use client'
import { useTableStore } from "@/app/zustand/useTablesStore";
import { usePage } from "/app/hooks/usePage";
import ExpenseTable from "/app/UI/Board/ExpenseTable"
import IncomeTable from "/app/UI/Board/IncomeTable"
import { useTable } from "@/app/hooks/useTable";
import { Spinner } from "@/app/UI/spinner";
import { useModalsHidden } from "@/app/zustand/useModalsHidden";
import { ModalNewRelease } from "@/app/components/Modal-NewRelease";

export default function MonthlyDashBoard() {
   const { data } = usePage();
   const { selectedTable } = useTableStore();
   const { tableHandler } = useTable();
   const table = tableHandler.getSelectedMonthData();
   const { showAddReleaseModal, setHiddenAllModals } = useModalsHidden();

   if (!data) return <Spinner />
   return (
      <section
         className="ml-9 pl-5 pt-3 bg-gray-200"
         style={{ height: "calc(100vh - 48px)" }}
      >
         {showAddReleaseModal &&
            <div 
               className=" absolute flex justify-center items-center bg-black bg-opacity-65 top-0 left-0 h-full w-full z-20"
               onClick={(e)=> {
                  !e.target.closest(".modal") &&
                  setHiddenAllModals()}
               }
            >
               <ModalNewRelease title={"Despesa"}/>
            </div>
         }

         <div className="border-b-[1px] border-b-gray-300 h-8 bg-white text-gray-900 -mt-3 -ml-5 mb-2 text-center leading-8">
            {`${selectedTable?.month} de ${selectedTable?.year}`}
         </div>
         {!table 
            ?
            <div className="flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${selectedTable.month} de ${selectedTable.year} não foram encontradas!`}</p>
            </div>
            :
            <div className="flex flex-row gap-2 items-start">
            <ExpenseTable />
            <div>
               <IncomeTable />
            </div>
         </div>
         }
         
      </section>
   )
}