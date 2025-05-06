'use client';

import { Table } from "@/app/components/Table";
import { ButtonAdd } from "@/app/components/buttons/ButtonAdd";
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export default function ExpenseTable() {
   const setShowInsertModal = useModalsHiddenStore((state) => state.setShowInsertModal);
   const setNewEntryType = useEntriesDataStore(state => state.setNewEntryType);

   return (
      <div className="flex-1 table p-2 pb-0 rounded-md shadow-lg h-fit min-w-[527px] bg-white">
         <div
            className="relative mb-2 text-center text-sm font-thin h-9 border-b-1 border-b-gray-200"
         >
            <h3 className="leading-9 text-base">Despesas</h3>
            <div className="absolute top-0 right-1">
               <ButtonAdd
                  text={"Despesa"}
                  onClick={() => {
                     setShowInsertModal(true);
                     setNewEntryType('expense');
                  }}
               />
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
