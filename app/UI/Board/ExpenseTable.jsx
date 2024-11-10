'use client';

import { Table } from "@/app/components/Table";
import { ButtonAdd } from "@/app/components/buttons";
import { useModalsHidden } from "@/app/zustand/useModalsHidden";

export default function ExpenseTable(){
   const { setShowAddReleaseModal, showAddReleaseModal } = useModalsHidden();
   
   return(
      <div className="p-2 pb-0 rounded-md shadow-lg w-fit bg-white overflow-hidden">
         <div
            className="relative text-center text-sm font-thin h-7 border-b-1 border-b-gray-200"
         >
            <h3>Despesas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd clickEvent={setShowAddReleaseModal} title={'Despesa'}/>
            </div>
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