import { Table } from "@/app/components/Table"

export default function ExpenseTable(){
   return(
      <div className="p-2 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="bg-gray-400 -ml-2 -mt-2 w-[108%] leading-7 text-center text-sm h-7"
         >Despesas</div>
         <Table />
      </div>
   )
}