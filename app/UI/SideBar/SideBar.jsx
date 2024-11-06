'use client';

import { useTableStore } from "@/app/zustand/useTablesStore";
import { useSideBar } from "@/app/hooks/useSideBar";
import { useState, memo, use } from "react";

export default function SideBar() {
   const [openSideBar, setOpenSideBar] = useState(false)
   return (
      <section className={`absolute z-10 bg-white shadow-lg left-0 top-12 p-2 transition-all text-sm ${!openSideBar ? "w-12" : "w-44"}`} style={{ height: 'calc(100% - 48px' }}>
         <div className="absolute flex items-center justify-center -right-3 top-4 h-7 w-7 bg-white rounded-full border border-gray-gray-200 cursor-pointer transition-all hover:bg-gray-200"
            onClick={() => setOpenSideBar(!openSideBar)}
         >
            <span className="material-icons transition-all">{!openSideBar ? " chevron_right" : "chevron_left"}</span>
         </div>
         <TablesList />
      </section>
   )
}

const TablesList = memo(() =>{
   const { tables, data } = useTableStore((state) => state);
   const { sideBarHandler } = useSideBar();
   console.log(data)
   
   return (
      <div className="mt-10">
         <ul className="flex flex-col gap-[2px]">
            {Object.keys(tables).map((year) => (
               <TablesListMonths key={year} tables={tables} year={year} />
            ))}
         </ul>
      </div>
   )
})

function TablesListMonths({ year }) {
   const { tables } = useTableStore((state) => state);
   const [expandUlYear, setExpandUlYear] = useState(false);

   return (
      <li
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: !expandUlYear ? '24px' : `${tables[year].length * 24 + 24}px` }}
      >
         <div className="flex flex-row h-6 gap-1 items-center mb-1 cursor-pointer rounded-md hover:bg-gray-200 transition-all"
            onClick={() => setExpandUlYear(!expandUlYear)}
         >
            <span className={`material-icons-outlined !text-lg transition-all ${expandUlYear && "rotate-180"}`}>
               expand_circle_down
            </span>
            <h3 className="font-semibold">{year}</h3>
            
         </div>
         <ul className="ml-4 pl-1 border-l border-l-gray-400">
            {tables[year].map((month, index) => (
               <li 
                  key={index}   
                  className="cursor-pointer transition-all w-fit px-2 rounded-md hover:bg-gray-200"
                  onClick={()=> {}}
               >
                  <span>{month}</span>
               </li>
            ))}
         </ul>
      </li>

   )
}