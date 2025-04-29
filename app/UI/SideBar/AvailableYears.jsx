'use client';
import Link from "next/link";
import { Spinner } from "@/app/components/loads/spinner";
import { Select } from "@/app/components/selects/Select";
import { useSearchParams } from "next/navigation";
import { AvailableMonths } from "./AvailableMonths";
import { useState } from "react";

export function AvailableYears({ availableTables }){
   
   const searchParams = useSearchParams();
   const year = searchParams.get('year');
   const monthURL = searchParams.get('month');

   const [formData, setFormData] = useState({ year: year });

   if(!formData.year){
      setFormData({year: Object.keys(availableTables)[0]});
      return;
   }
   return (
      <div className="relative mt-4 pb-1 text-gray-900 border-t border-b border-gray-300">
         <div className="absolute right-0 -top-4 z-10">
            <Select
               options={Object.keys(availableTables)}
               width={"70"}
               label={""}
               name="year"
               form={{ formData, setFormData }}
               value={formData.year}
            />
         </div>
         <ul className="flex flex-col gap-[2px]">
            <AvailableMonths key={formData.year} year={formData.year} availableMonths={availableTables[formData.year]} />
         </ul>
         {year &&
            <Link
               href={`/dashboard?year=${formData.year}`}
               className={`w-full mt-1 h-7 rounded-sm flex items-center justify-center text-gray-900 text-xs bg-gray-400 hover:bg-gray-500 transition-all duration-300
                  ${(year === formData.year && !monthURL) && " !bg-gray-900 text-white"}
               `}
            >
               <p>{`Ver relatório de ${year}`}</p>
            </Link>
         }
      </div>
   )
}
