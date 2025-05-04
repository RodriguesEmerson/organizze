'use client';

import { useUtils } from "@/app/hooks/useUtils";
import { useTableStore } from "@/app/zustand/useTablesStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function AvailableMonths({ year, availableMonths }) {
   const [expandMonthSelect, setExpandMonthSelect] = useState(false);
   const { changeTable } = useTableStore();

   const { toUpperFirstLeter } = useUtils();
   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');
   const monthURL = searchParams.get('month');

   return (
      <li
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: expandMonthSelect ? '24px' : `${availableMonths.length * 24 + 27}px` }}
      >
         <div className="flex flex-row h-6 gap-1 items-center mb-1 cursor-pointer hover:bg-gray-300 transition-all"
            onClick={() => { setExpandMonthSelect(!expandMonthSelect) }}
         >
            <span className={`material-icons-outlined !text-lg transition-all ${!expandMonthSelect && "rotate-180"}`}>
               expand_circle_down
            </span>
            <h3 className="font-semibold text-xs leading-7">{year}</h3>

         </div>
         <ul className="flex flex-col gap-[2px] ml-4 pl-1 pb-2 border-l border-l-gray-400">
            {availableMonths.map((month, index) => (
               <li
                  key={index}
                  className={`cursor-pointer text-xs transition-all duration-200 w-fit  rounded-sm hover:bg-gray-300
                     ${(yearURL == year && monthURL == month) && "!bg-cyan-600 text-white"}
                  `}
                  onClick={() => { changeTable(year, month) }}
               >
                  <Link
                     href={`/dashboard/monthly?year=${year}&month=${month}`}
                     className="px-2 py-[2px] block"
                  >
                     <span>{toUpperFirstLeter(month)}</span>
                  </Link>
               </li>
            ))}
         </ul>
      </li>
   )
}