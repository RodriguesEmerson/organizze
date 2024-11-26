import { useEffect, useState } from "react"

export function CategorieSelect({ categories, defaultValue, name, value, setValue, formData }){
   
   const [openSelect, setOpenSelect] = useState(false);
   const [dropDownHeight, setDropDownHeight] = useState(0);

   useEffect(()=>{
      setDropDownHeight(`${28 * categories.length + 2}px`);
   },[categories])

   return(
      <div className=" relative" >
         <div 
            className="flex flex-row gap-1 items-center justify-between h-8 cursor-pointer w-32 pl-2 font-thin border border-gray-300 rounded-md"
            onClick={()=> {setOpenSelect(!openSelect)}}
         >
            <input
               className="outline-none w-[90%] bg-white max-w-full !cursor-pointer pointer-events-none"
               value={value}
               type="text"
               name={name}
               defaultValue={defaultValue}
               onChange={()=>{}}
            />
            <span className="material-icons">keyboard_arrow_down</span>
         </div>

         <div className={`absolute bg-white rounded-md shadow-xl mt-[1px] overflow-hidden transition-all`}
               style={{height: openSelect ? dropDownHeight : 0}}
         >
            <ul>
               {categories.map(item =>(
                  <li 
                     className={`flex flow-row items-center cursor-pointer px-2 gap-2 h-7 hover:bg-gray-200 transition-all 
                        ${value == item.categ && "bg-blue-900 text-white hover:bg-blue-900"}`} 
                     key={item.categ}
                     onClick={()=> {setValue({...formData, categ: item.categ}); setOpenSelect(false)}}
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