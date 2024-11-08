'use client'
import { usePage } from "/app/hooks/usePage";
import ExpenseTable from "/app/UI/Board/ExpenseTable"
import IncomeTable from "/app/UI/Board/IncomeTable"

export default function MonthlyDashBoard(){
   const { data } = usePage();

   return(
      <section 
         className="ml-12 pl-5 pt-3 bg-gray-100"
         style={{height: "calc(100vh - 50px)"}} 
      >
         <div className="flex flex-row gap-2 items-start">
            <ExpenseTable />
            <div>
               <IncomeTable />
            </div>
         </div>
      </section>
   )
}