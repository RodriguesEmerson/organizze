
import { useTable } from "../hooks/useTable";
import { Spinner } from "../UI/spinner";
import { useEntriesDataStore } from "../zustand/useEntriesDataStore";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { useTableStore } from "../zustand/useTablesStore";
import { useUtilsStore } from "../zustand/useUtilsStore";


export function Table({ tableType }) {
   const { tableHandler } = useTable();
   const tablesHeaders = ['Descrição', 'Categoria', 'Data', 'Valor'];
   const setEditingEntry = useTableStore((state) => state.setEditingEntry);
   const setNewReleaseType = useTableStore((state) => state.setNewReleaseType);
   const setShowAddReleaseModal = useModalsHiddenStore((state) => state.setShowAddReleaseModal);
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal)


   if (!entriesData) return <Spinner />
   return (
      <>
         <table className="text-gray-600 text-sm w-full overflow-x-hidden">
            <colgroup>
               <col style={{ width: "40%" }} />
               <col style={{ width: "10%" }} />
               <col style={{ width: "70px" }} />
               <col style={{ width: "60px" }} />
            </colgroup>
            <thead className="">
               <tr className="border-b-[1px] border-b-gray-400">
                  {tablesHeaders.map(colName => (
                     <th
                        key={colName}
                        scope="col"
                        className="text-center font-thin !text-[13px]"
                     >{colName}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {entriesData.entries[tableType].map(item => (
                  <tr
                     key={item.id}
                     className="h-10 border-t-[1px] border-t-gray-200 text-[13px] hover:bg-gray-100 transition-all cursor-pointer"
                     onClick={()=> {
                        setEditingEntry({...item, type: tableType});
                        setShowEditModal(true);
                     }}
                  >
                     <td className="pl-2 max-w-[120px] text-nowrap overflow-x-hidden text-ellipsis font-semibold text-gray-900">{item.description}</td>

                     <TdCategories icon={`/icons/c-${item.category}.png`} categ={item.category} />

                     <td className="relative text-center">
                        {`${new Date(item.date).toLocaleDateString('pt-br', { day: "2-digit", month: "short" })}`}
                        {item.end_date && <img className="absolute max-w-3 top-4 right-0" src="/icons/i-fixed.png"/>}
                     </td>
                     <td className="text-end pr-2 max-w-10">
                        {Number(item.value).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   )
}

function TdCategories({ icon, categ }) {
   const setTooltipInfoText = useUtilsStore((state) => state.setTooltipInfoText);

   return (
      <td className="relative" >
         <img
            src={icon} alt="icone categ"
            className="max-w-5 m-auto"
            onMouseEnter={(e) => setTooltipInfoText({categ: categ, e: e, show: true})}
            onMouseOut={(e) => setTooltipInfoText({categ: categ, e: e, show: false})}
         />
      </td>
   )
}
