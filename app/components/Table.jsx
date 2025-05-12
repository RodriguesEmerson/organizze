
import { useEffect, useState } from "react";
import { useUtils } from "../hooks/useUtils";
import { useEntriesDataStore } from "../zustand/useEntriesDataStore";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { useTableStore } from "../zustand/useTablesStore";
import { useUtilsStore } from "../zustand/useUtilsStore";
import { Spinner } from "./loads/spinner";

export function Table({ type }) {
   const tablesHeaders = ['Descrição', 'Categoria', 'Data', 'Valor'];
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [entries, setEntries] = useState(false);

   useEffect(() => {
      if(entriesData){
         setEntries(entriesData.entries[type]);
      }
   },[entriesData.entries[type]]);

   if (!entries) return <Spinner />
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
               {entries.map(entry => (
                  <TableTr key={entry.id} entry={entry} type={type}/>
               ))}
            </tbody>
         </table>
      </>
   )
}

function TableTr({ entry, type }){
   const { convertDateToDM } = useUtils();
   const setEditingEntry = useTableStore((state) => state.setEditingEntry);
   const toAnimateEntry = useTableStore((state) => state.toAnimateEntry);
   const setToAnimateEntry = useTableStore((state) => state.setToAnimateEntry);
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const [animate, setAnimate] = useState('');

   if(toAnimateEntry == entry.id){
      if(!animate){
         setAnimate(true);
         setTimeout(() => {
            setToAnimateEntry(false);
            setAnimate('');
         }, 3000);
      }
   }

   return(
      <tr
         key={entry.id}
         className={`h-10 border-t-[1px] border-t-gray-200 text-[13px] hover:bg-gray-100 transition-all cursor-pointer
         ${animate && 'animate-fadeIn'}`}
         onClick={()=> {
            setEditingEntry({...entry, type: type});
            setShowEditModal(true);
         }}
      >
         <td className="pl-2 max-w-[120px] text-nowrap overflow-x-hidden text-ellipsis font-semibold text-gray-900">{entry.description}</td>

         <TableTd icon={`/icons/${entry.icon}`} categ={entry.category} />

         <td className="relative text-center">
            {convertDateToDM(entry.date)}
            {entry.end_date && <img className="absolute max-w-3 top-4 right-0" src="/icons/i-fixed.png"/>}
         </td>
         <td className="text-end pr-2 max-w-10">
            {Number(entry.value).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
         </td>
      </tr>
   )
}

function TableTd({ icon, categ }) {
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
