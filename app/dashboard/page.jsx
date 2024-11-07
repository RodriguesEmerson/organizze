'use client'
import { usePage } from "../hooks/usePage";
import ExpenseTable from "../UI/Board/ExpenseTable"
import IncomeTable from "../UI/Board/IncomeTable"

export default function DashBoard(){
   const { data } = usePage();

   return(
      <section 
         className="ml-12 pl-5 pt-3 bg-gray-100"
         style={{height: "calc(100vh - 50px)"}} 
      >
         <div className="flex flex-row gap-2">
            <ExpenseTable />
            <div>
               <IncomeTable />
            </div>
         </div>
      </section>
   )
}