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

export default function MonthlyDashBoard() {
   const { data } = usePage();
   const { selectedTable } = useTableStore();
   const { tableHandler } = useTable();
   const { showAddReleaseModal, setHiddenAllModals } = useModalsHiddenStore();
   const table = tableHandler.getSelectedMonthData();
   const { toUpperFirstLeter } = useUtils();
   let initialClick = false;

   if (!data) return <Spinner />
   return (
      <section
         className="ml-9 pl-5 pt-3 bg-gray-200"
         style={{ height: "calc(100vh - 48px)" }}
      >
         {showAddReleaseModal &&
            <div 
               className=" absolute flex justify-center items-center bg-black bg-opacity-75 top-0 left-0 h-full w-full z-[11]"
               onMouseDown={(e)=> {
                  initialClick = e.target.closest(".modal");
               }}
               onMouseUp={(e)=> {
                  if(!e.target.closest(".modal") && !initialClick){
                     setHiddenAllModals();
                  }
               }}
            >
               <ModalNewRelease title={"Despesa"}/>
            </div>
         }

         <div className="border-b-[1px] border-b-gray-300 h-8 bg-white text-gray-900 -mt-3 -ml-5 mb-2 text-center leading-8">
            {`${toUpperFirstLeter(selectedTable?.month)} de ${selectedTable?.year}`}
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
            <div>
               <ExpesesGraphic />
            </div>
         </div>
         }
         
      </section>
   )
}