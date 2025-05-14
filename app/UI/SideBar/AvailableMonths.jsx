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
      <div
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: expandMonthSelect ? '24px' : `${(availableMonths.length + 1) * (24 + 27)}px` }}
      >
         <div className="flex flex-row h-6 gap-1 items-start mb-1 p-1 pl-2">
            <h3 className="font-semibold text-xs leading-6">Ano selecionado:</h3>
         </div>
         <ul className="flex flex-col gap-[2px] ml-4 pl-1 pb-2 border-l border-l-gray-400">
            {availableMonths.map((month, index) => (
               <li
                  key={index}
                  className={`cursor-pointer text-xs transition-all duration-200 w-fit  rounded-[4px] hover:bg-gray-300
                     ${(yearURL == year && monthURL == month) && "!bg-gray-900 text-white"}
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
            <li className={`flex flex-row gap-1 cursor-pointer py-[2px] px-2 text-xs transition-all duration-200 w-fit  rounded-[4px] hover:bg-gray-300`}>
               <p>Criar nova tabela</p><span className="material-icons-outlined text-sm h-3 -mt-[2px]">add_circle</span>
            </li>
         </ul>
      </div>
   )
}