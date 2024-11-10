'use client'
import { useTableStore } from "@/app/zustand/useTablesStore";
import { usePage } from "/app/hooks/usePage";
import ExpenseTable from "/app/UI/Board/ExpenseTable"
import IncomeTable from "/app/UI/Board/IncomeTable"

export default function MonthlyDashBoard(){
   const { data } = usePage();
   const { selectedTable } = useTableStore();

   return(
      <section 
         className="ml-9 pl-5 pt-3 bg-gray-200"
         style={{height: "calc(100vh - 48px)"}} 
      >
         <div className="border-b-[1px] border-b-gray-300 h-8 bg-white text-gray-900 -mt-3 -ml-5 mb-2 text-center leading-8">
            {`${selectedTable?.month} de ${selectedTable?.year}`}
         </div>
         <div className="flex flex-row gap-2 items-start">
            <ExpenseTable />
            <div>
               <IncomeTable />
            </div>
         </div>
      </section>
   )
}