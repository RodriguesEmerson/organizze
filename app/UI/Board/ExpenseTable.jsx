import { Table } from "@/app/components/Table"

export default function ExpenseTable(){
   return(
      <div className="p-2 pb-0 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="text-center text-sm font-thin h-7 border-b-1 border-b-gray-200"
         >
            Despesas
         </div>
         <div className="overflow-y-auto table-scroll-style">
            <div className="pr-2 pb-2"
               style={{maxHeight: "calc(100vh - 110px)"}}
            >
               <Table table={'expenses'}/>   

            </div>

         </div>
      </div>
   )
}