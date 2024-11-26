import { ButtonAdd } from "@/app/components/buttons/ButtonAdd"
import { Table } from "@/app/components/Table"
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useTableStore } from "@/app/zustand/useTablesStore";

export default function IncomeTable() {

   const setShowAddReleaseModal = useModalsHiddenStore((state) => state.setShowAddReleaseModal);
   const  setNewReleaseType  = useTableStore((state) => state.setNewReleaseType);
   function handleAddReleaseType(){
      setNewReleaseType({title: 'Receita', type: 'incomes'})
      setShowAddReleaseModal();
   }
   return (
      <div className="flex-1 p-2 pb-0 rounded-md shadow-lg min-w-[527px] h-fit bg-white">
         <div
            className="relative text-center text-sm font-thin h-9 border-b-1 border-b-gray-200"
         >
            <h3 className="leading-9">Receitas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd clickEvent={handleAddReleaseType} title={"Receita"}/>
            </div>
         </div>

         <div className=" table-scroll-style">
            <div className="pr-2 pb-2"
               // style={{ maxHeight: "calc(100vh - 110px)" }}
            >
               <Table table={'incomes'} />
            </div>
         </div>
      </div>
   )
}