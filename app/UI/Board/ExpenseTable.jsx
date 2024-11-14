'use client';

import { Table } from "@/app/components/Table";
import { ButtonAdd } from "@/app/components/buttons";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useTableStore } from "@/app/zustand/useTablesStore";

export default function ExpenseTable(){
   const { setShowAddReleaseModal, showAddReleaseModal } = useModalsHiddenStore();
   const { setNewReleaseType } = useTableStore();
   function handleAddReleaseType(){
      setNewReleaseType({title: 'Despesa', type: 'expenses'})
      setShowAddReleaseModal();
   }
   
   return(
      <div className="p-2 pb-0 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="relative text-center text-sm font-thin h-7 border-b-1 border-b-gray-200"
         >
            <h3>Despesas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd clickEvent={handleAddReleaseType}/>
            </div>
         </div>
         <div className="overflow-y-auto overflow-x-hidden table-scroll-style">
            <div className="pr-2 pb-2"
               style={{maxHeight: "calc(100vh - 135px)"}}
            >
               <Table table={'expenses'}/>   
            </div>

         </div>
      </div>
   )
}