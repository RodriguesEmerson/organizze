import { useState } from "react"
import { useTableStore } from "../zustand/useTablesStore";

export function Select({ name, categories }){
   
   const [option, setOption]  = useState("*Selecione*");
   const [openSelect, setOpenSelect] = useState(false);
   return(
      <div className=" relative" >
         <div 
            className="flex flex-row gap-1 items-center justify-between h-8 cursor-pointer w-32 pl-2 font-thin border border-gray-300 rounded-md"
            onClick={()=> {setOpenSelect(!openSelect)}}
         >
            <input
               className="outline-none w-[90%] bg-white max-w-full !cursor-pointer pointer-events-none"
               value={option}
               type="text"
               name={name}
               onChange={()=> {}}
            />
            <span className="material-icons">keyboard_arrow_down</span>
         </div>

         <div className={`absolute bg-white rounded-md shadow-xl mt-[1px] overflow-hidden transition-all ${!openSelect ? "h-0" : "h-[225px]"}`}>
            <ul>
               {categories.map(item =>(
                  <li 
                     className={`flex flow-row items-center cursor-pointer px-2 gap-2 h-7 hover:bg-gray-200 transition-all ${option == item.categ && "bg-gray-200"}`} 
                     key={item.categ}
                     onClick={()=> {setOption(item.categ); setOpenSelect(false)}}
                  >
                     <img className="w-5 h-5" src={`/icons/c-${item.icon}.png`} alt="" />
                     {item.categ}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}