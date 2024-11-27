'use client';

import { useTableStore } from "@/app/zustand/useTablesStore";
import { useSideBar } from "@/app/hooks/useSideBar";
import { Spinner } from "../spinner";
import { useState, memo } from "react";
import { useUtils } from "@/app/hooks/useUtils";
import { Select } from "@/app/components/selects/Select";

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
            <FormNewTable />
         {/* } */}
      </section>
   )
}

function TablesList(){
   const { sideBarHandler } = useSideBar();
   const { data, selectedTable, changeTable } = useTableStore((state) => state);
   console.log(selectedTable)
 
   const  tables = data ? sideBarHandler.getTables(data) : null;
   // const currentTable = sideBarHandler.getCurrentTable()

   ///CRIANDO AQUI
   function handleChangeTable(year){
      changeTable({...selectedTable, year: year})
   }

   if(!tables) return (
      <div className="flex items-center justify-center h-full">
         <Spinner />
      </div>
   )
   return (
      <div className="relative mt-8 bg-gray-200 text-gray-900 rounded-md">
         <div className="absolute right-0 -top-4 z-10">
            <Select 
               options={Object.keys(tables)} 
               label={''}  
               width={"70"}
               handleChangeTable={handleChangeTable}
            />
         </div>

         <ul className="flex flex-col gap-[2px]">
            {Object.keys(tables).map((year) => (
               <TablesListMonths key={year} tables={tables} year={year} />
            ))}
         </ul>
      </div>
   )
}

function TablesListMonths({ year, tables }) {
   const [expandUlYear, setExpandUlYear] = useState(false);
   const { changeTable } = useTableStore();
   const selectedTable = useTableStore((state) => state.selectedTable);
   const { toUpperFirstLeter } = useUtils();

   return (
      <li
         key={year}
         className={`w-full overflow-hidden transition-max-height duration-200 ease-in-out`}
         style={{ maxHeight: !expandUlYear ? '24px' : `${tables[year].length * 24 + 27}px` }}
      >
         <div className="flex flex-row h-6 gap-1 items-center mb-1 cursor-pointer rounded-md hover:bg-gray-300 transition-all"
            onClick={() => setExpandUlYear(!expandUlYear)}
         >
            <span className={`material-icons-outlined !text-lg transition-all ${expandUlYear && "rotate-180"}`}>
               expand_circle_down
            </span>
            <h3 className="font-semibold text-xs leading-7">{year}</h3>
            
         </div>
         <ul className="flex flex-col gap-[2px] ml-4 pl-1 pb-2 border-l border-l-gray-400">
            {tables[year].map((month, index) => (
               <li 
                  key={index}   
                  className={`cursor-pointer text-xs transition-all duration-200 w-fit px-2 py-[2px] rounded-md hover:bg-gray-300
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

function FormNewTable(){
   const months = useTableStore((state) => state.months);
   const currentYear = new Date().getFullYear();
   const years = [];

   for(let i = 0; i < 11; i++){
      years.push(currentYear - 5 + i)
   }

   return(
      <div className="flex flex-col bg-gray-200 p-1 rounded-md mt-2">
         
         <form action="">
            <div className="flex flex-row gap-1">
               <Select options={months} width="87" label={"Mês"}/>
               <Select options={years} width="67" label={"Ano"}/>
            </div>
            <button type="submit" className="bg-white text-gray-900 text-center p-1 rounded-md w-full mt-1 hover:text-gray-300 transition-all ">
               Criar
            </button>
         </form>
      </div>
   )
}