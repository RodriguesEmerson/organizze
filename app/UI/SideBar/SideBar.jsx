'use client';  
import { usePathname } from 'next/navigation';
import { AvailableYears } from "./AvailableYears";
import { useAvailablesTables } from "@/app/hooks/sideBar/useAvailableTables";
import { useState, useEffect } from "react";
import { Spinner } from "@/app/components/loads/spinner";
import { Nav } from './Nav';

export default function SideBar() {
   const pathName = usePathname()
   if(pathName === '/signin') return;
   
   const { availableTables } = useAvailablesTables();
   const [data, setData] = useState(false);
   
   useEffect(() => {
      if(Object.entries(availableTables).length > 0){
         setData(availableTables)
      }
   }, [availableTables])
   
   return (
      <section className={`fixed z-[12] bg-white shadow-2xl left-0 top-12 transition-all text-sm border-t border-t-white w-[185px]`} style={{ height: 'calc(100% - 45px' }}>
         {!data &&
            <Spinner />
         }
         {data && 
            <>
               <AvailableYears availableTables={data}/>
               <Nav />
            </>
         }
        
      </section>
   )
}

