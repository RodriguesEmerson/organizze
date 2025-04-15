// 'use client'
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import { AvailableYears } from "./AvailableYears";
import { useAvailablesTables } from "@/app/hooks/sideBar/useAvailableTables";
// import { use } from "react";


export async function SideBarBody({year, month}){
   const { getAvailableTables } = useAvailablesTables();
   const data = await getAvailableTables();
   console.log(data)

   
   
   
   // const [availableTables, setAvailableTables] = useState(false);
   
   // useEffect(() => {
   //    const getData = async () =>{
   //       // const data = await getAvailableTables();
   //       console.log(data)
   //       if(data){
   //          setAvailableTables(data);
   //       }
   //    }

   //    getData()
   // }, [])

      return (
         <>Tste</>
      )

   // console.log(availableTables)
   
   // if(!year || !month){
   //    <div>
   //       <p>Selecione a tabela que deseja vizualiar!</p>
   //       {/* {availableTables && <AvailableYears year={availableTables} />} */}
   //    </div>
   //    return;
   // }
}