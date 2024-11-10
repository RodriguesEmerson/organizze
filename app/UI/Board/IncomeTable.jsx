import { ButtonAdd } from "@/app/components/buttons"
import { Table } from "@/app/components/Table"

export default function IncomeTable() {
   return (
      <div className="p-2 pb-0 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="relative text-center text-sm font-thin h-7 border-b-1 border-b-gray-200"
         >
            <h3>Receitas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd title={'Receita'}/>
            </div>
         </div>

         <div className="overflow-y-auto table-scroll-style">
            <div className="pr-2 pb-2"
               style={{ maxHeight: "calc(100vh - 110px)" }}
            >
               <Table table={'incomes'} />
            </div>
         </div>
      </div>
   )
}