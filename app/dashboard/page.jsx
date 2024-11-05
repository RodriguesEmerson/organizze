import ExpenseTable from "../UI/Board/ExpenseTable"

export default function DashBoard(){
   return(
      <section 
         className="ml-12 pl-5 pt-3 bg-gray-100"
         style={{height: "calc(100vh - 50px)"}}
      >
         <ExpenseTable />
      </section>
   )
}