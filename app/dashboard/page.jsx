import ExpenseTable from "../UI/Board/ExpenseTable"
import RevenueTable from "../UI/Board/RevenueGraphic"

export default function DashBoard(){
   return(
      <section 
         className="ml-12 pl-5 pt-3 bg-gray-100"
         style={{height: "calc(100vh - 50px)"}}
      >
         <div className="flex flex-row gap-2">
            <ExpenseTable />
            <div>
               <RevenueTable />
            </div>
         </div>
      </section>
   )
}