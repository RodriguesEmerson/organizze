'use client';
import Link from "next/link";
import { Select } from "@/app/components/selects/Select";
import { useSearchParams } from "next/navigation";
import { AvailableMonths } from "./AvailableMonths";
import { useState } from "react";

export function AvailableYears({ availableTables }){
   
   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');
   const monthURL = searchParams.get('month');

   const [formData, setFormData] = useState({ year: yearURL });

   if(!formData.year){
      setFormData({year: Object.keys(availableTables)[0]});
      return;
   }
   return (
      <div className="relative text-gray-900 border-t border-b border-gray-300">
         <div className="absolute right-2 -top-3 z-10">{/**Select */}
            <Select
               options={Object.keys(availableTables)}
               width={"60"}
               label={""}
               name="year"
               form={{ formData, setFormData }}
               value={formData.year}
            />
         </div>
         <div className="flex flex-col gap-[2px]">
            <AvailableMonths key={formData.year} year={formData.year} availableMonths={availableTables[formData.year]} />
         </div>
         
            
      </div>
   )
}
