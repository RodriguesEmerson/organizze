import { Table } from "@/app/components/Table"

export default function IncomeTable() {
   return (
      <div className="p-2 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="bg-gray-300 -ml-2 -mt-2 w-[108%] leading-7 text-center text-sm h-7"
         >Receitas</div>

         <div className="overflow-y-auto table-scroll-style">
            <div className="pr-2"
               style={{ maxHeight: "calc(100vh - 110px)" }}
            >
               <Table table={'incomes'} />
            </div>
         </div>
      </div>
   )
}