
import { useTable } from "../hooks/useTable";
import { Spinner } from "../UI/spinner";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { useTableStore } from "../zustand/useTablesStore";
import { useUtilsStore } from "../zustand/useUtilsStore";


export function Table({ table }) {
   const { tableHandler, tablesHeaders } = useTable();
   const data = tableHandler.getSelectedMonthData();
   const setEditingRelease = useTableStore((state) => state.setEditingRelease);
   const setNewReleaseType = useTableStore((state) => state.setNewReleaseType);
   const setShowAddReleaseModal = useModalsHiddenStore((state) => state.setShowAddReleaseModal);

   if (!data) return <Spinner />
   return (
      <>
         <table className="text-gray-600 text-sm w-[500px] overflow-x-hidden">
            <colgroup>
               <col style={{ width: "150px" }} />
               <col style={{ width: "30px" }} />
               <col style={{ width: "70px" }} />
               <col style={{ width: "60px" }} />
            </colgroup>
            <thead className="hidden">
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
               {data[table].map(item => (
                  <tr
                     key={item.id}
                     className="h-10 border-t-[1px] border-t-gray-200 text-[13px] hover:bg-gray-100 transition-all cursor-pointer"
                     onClick={()=> {
                        setEditingRelease({...item});
                        setNewReleaseType({ title: table == "expenses" ? "Despesa" : "Receita", type: table });
                        setShowAddReleaseModal();
                     }}
                  >
                     <td className="pl-1 max-w-[120px] text-nowrap overflow-x-hidden text-ellipsis font-semibold text-gray-900">{item.desc}</td>

                     <TdCategories icon={`/icons/c-${item.categ}.png`} categ={item.categ} />

                     <td className="relative text-center">
                        {`${new Date(item.date).toLocaleDateString('pt-br', { day: "2-digit", month: "short" })}`}
                        {item.endDate && <img className="absolute max-w-3 top-4 right-0" src="/icons/i-fixed.png"/>}
                     </td>
                     <td className="text-end pr-1 max-w-10">
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
      <td
         className="relative"
         >
         <img
            src={icon} alt="icone categ"
            className="max-w-5 m-auto"
            onMouseEnter={(e) => setTooltipInfoText({categ: categ, e: e, show: true})}
            onMouseOut={(e) => setTooltipInfoText({categ: categ, e: e, show: false})}
         />

      </td>
   )
}
