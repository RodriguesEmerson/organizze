'use client';

import { useTableStore } from "@/app/zustand/useTablesStore";
import { useSideBar } from "@/app/hooks/useSideBar";
import { Spinner } from "../spinner";
import { useState, memo } from "react";
import { useUtils } from "@/app/hooks/useUtils";

export default function SideBar() { 
   const [openSideBar, setOpenSideBar] = useState(true);

   return (
      <section className={`fixed ml-2 mt-2 rounded-md z-[12] bg-white shadow-2xl left-0 top-12 p-2 transition-all text-sm border-t border-t-white ${!openSideBar ? "w-12" : "w-44"}`} style={{ height: 'calc(100% - 65px' }}>
         {/* <div className="absolute flex items-center justify-center -right-3 top-4 h-7 w-7 bg-white rounded-full border border-gray-gray-200 cursor-pointer transition-all hover:bg-gray-200"
            onClick={() => setOpenSideBar(!openSideBar)}
         >
            <span className="material-icons transition-all">{!openSideBar ? " chevron_right" : "chevron_left"}</span>
         </div> */}
         {/* {openSideBar && */}
            <TablesList />
         {/* } */}
      </section>
   )
}

const TablesList = memo(() =>{
   const { sideBarHandler } = useSideBar();
   const { data } = useTableStore((state) => state);
 
   const  tables = data ? sideBarHandler.getTables(data) : null;
   
   if(!tables) return (
      <div className="flex items-center justify-center h-full">
         <Spinner />
      </div>
   )
   return (
      <div className="mt-10 bg-gray-200 text-gray-900 rounded-md">
         <ul className="flex flex-col gap-[2px]">
            {Object.keys(tables).map((year) => (
               <TablesListMonths key={year} tables={tables} year={year} />
            ))}
         </ul>
      </div>
   )
})

function TablesListMonths({ year, tables }) {
   const [expandUlYear, setExpandUlYear] = useState(false);
   const { changeTable } = useTableStore();
   const selectedTable = useTableStore((state) => state.selectedTable);
   const { toUpperFirstLeter } = useUtils();

   return (
      <li
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: !expandUlYear ? '24px' : `${tables[year].length * 24 + 24}px` }}
      >
         <div className="flex flex-row h-6 gap-1 items-center mb-1 cursor-pointer rounded-md hover:bg-gray-300 transition-all"
            onClick={() => setExpandUlYear(!expandUlYear)}
         >
            <span className={`material-icons-outlined !text-lg transition-all ${expandUlYear && "rotate-180"}`}>
               expand_circle_down
            </span>
            <h3 className="font-semibold">{year}</h3>
            
         </div>
         <ul className="ml-4 pl-1 pb-2 border-l border-l-gray-400">
            {tables[year].map((month, index) => (
               <li 
                  key={index}   
                  className={`cursor-pointer transition-all duration-200 w-fit px-2 rounded-md hover:bg-gray-300
                     ${(selectedTable.year == year && selectedTable.month == month) && "!bg-gray-900 text-white"}
                  `}
                  onClick={()=> {changeTable(year, month)}}
               >
                  <span>{toUpperFirstLeter(month)}</span>
               </li>
            ))}
         </ul>
      </li>

   )
}