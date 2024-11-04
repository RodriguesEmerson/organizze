'use client';

import { useState, memo } from "react";

export default function SideBar() {
   const [openSideBar, setOpenSideBar] = useState(true);
   return (
      <section className={`absolute z-10 shadow-lg left-0 top-10 p-2 transition-all text-sm ${!openSideBar ? "w-12" : "w-52"}`} style={{ height: 'calc(100% - 40px' }}>
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
   const options = {
      2024: ['Novembro', 'Dezembro'],
      2025: ['Janeiro', 'Fevereiro'],
   }
   
   return (
      <div className="mt-10">
         <ul className="flex flex-col gap-[2px]">
            {Object.keys(options).map((year) => (
               <TablesListMonths key={year} options={options} year={year} />
            ))}

         </ul>
      </div>
   )
})

function TablesListMonths({ options, year }) {
   const [expandUlYear, setExpandUlYear] = useState(false);
   return (
      <li
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: !expandUlYear ? '24px' : `${options[year].length * 24 + 24}px` }}
         onClick={() => setExpandUlYear(!expandUlYear)}
      >
         <div className="flex flex-row h-6 gap-1 items-center mb-1 cursor-pointer rounded-md hover:bg-gray-200 transition-all">
            <span className={`material-icons-outlined !text-lg transition-all ${expandUlYear && "rotate-180"}`}>expand_circle_down</span>
            <h3 className="font-semibold">{year}</h3>
         </div>
         <ul className="ml-4 pl-1 border-l border-l-gray-400">
            {options[year].map((month, index) => (
               <li 
                  key={index}   
                  className="cursor-pointer transition-all w-fit px-2 rounded-md hover:bg-gray-200"
               >
                  <span>{month}</span>
               </li>
            ))}
         </ul>
      </li>

   )
}