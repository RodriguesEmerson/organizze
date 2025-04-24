'use client';

import { Table } from "@/app/components/Table";
import { ButtonAdd } from "@/app/components/buttons/ButtonAdd";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";
import { useTableStore } from "@/app/zustand/useTablesStore";

export default function ExpenseTable() {
   const setShowAddReleaseModal = useModalsHiddenStore((state) => state.setShowAddReleaseModal);
   const setNewReleaseType = useTableStore((state) => state.setNewReleaseType);

   function handleAddReleaseType() {
      setNewReleaseType({ title: 'Despesa', type: 'expenses' });
      setShowAddReleaseModal();
   }
   return (
      <div className="flex-1 table p-2 pb-0 rounded-md shadow-lg h-fit min-w-[527px] bg-white">
         <div
            className="relative text-center text-sm font-thin h-9 border-b-1 border-b-gray-200"
         >
            <h3 className="leading-9">Despesas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd clickEvent={handleAddReleaseType} title={"Despesa"} />
            </div>
         </div>
         <div className="table-scroll-style">
            <div className="pr-2 pb-2">
               <Table tableType={'expenses'} />
            </div>

         </div>
      </div>
   )
}