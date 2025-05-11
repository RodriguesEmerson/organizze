import { ButtonAdd } from "@/app/components/buttons/ButtonAdd"
import { Table } from "@/app/components/Table"
import { useEntriesDataStore } from "@/app/zustand/useEntriesDataStore";
import { useModalsHiddenStore } from "@/app/zustand/useModalsHiddenStore";

export default function IncomeTable() {
   const setShowInsertModal = useModalsHiddenStore((state) => state.setShowInsertModal);
   const setNewEntryType = useEntriesDataStore(state => state.setNewEntryType);

   return (
      <div className="flex-1 p-2 pb-0 rounded-md shadow-lg min-w-[527px] h-fit bg-white">
         <div
            className="relative text-center text-sm font-thin h-9 border-b-1 border-b-gray-200"
         >
            <h3 className="leading-9 text-base">Receitas</h3>
            <div className="absolute top-0 right-2">
               <ButtonAdd 
                  text={"Receita"} 
                  onClick={() => {
                     setShowInsertModal(true);
                     setNewEntryType('income');
                  }}
               />
            </div>
         </div>

         <div className=" table-scroll-style">
            <div className="pr-2 pb-2" >
               <Table type={'incomes'} />
            </div>
         </div>
      </div>
   )
}