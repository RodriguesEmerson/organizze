import { useGetCategories } from "@/app/hooks/categories/useGetCategories";
import { useEffect, useState } from "react";
import { Spinner } from "../loads/spinner";
import { useCategoriesDataStore } from "@/app/zustand/useCategoriesDataStore";

export function CategorieSelect({ defaultValue, name, value, setValue, formData, type }){
   
   const [openSelect, setOpenSelect] = useState(false);
   const categories = useCategoriesDataStore(state => state.categories);
   const { getCategories } = useGetCategories();
   const categoriesLoadedType = useCategoriesDataStore(state => state.categoriesLoadedType);
   const setCategoriesLoadedType = useCategoriesDataStore(state => state.setCategoriesLoadedType);

   if (categoriesLoadedType != type) {
      getCategories(type);
      setCategoriesLoadedType(type);
   }

   return(
      <div className=" relative" >
         <div 
            className={`flex flex-row gap-1 items-center justify-between h-8 cursor-pointer pl-2 font-thin border border-gray-300 rounded-md w-40`}
            onClick={()=> {setOpenSelect(!openSelect);}}
         >
            <input
               className="outline-none w-[90%] bg-white max-w-full !cursor-pointer pointer-events-none"
               value={value}
               type="text"
               name={name}
               defaultValue={defaultValue}
               onChange={()=>{}}
               readOnly
            />
            <span className="material-icons">keyboard_arrow_down</span>
         </div>

         <div className={`absolute bg-white rounded-md shadow-xl mt-[1px] overflow-hidden transition-all`}
               style={{height: openSelect ? `${28 * categories.length + 2}px` : 0}}
         >
            <ul>
               {!categories && 
                  <Spinner />
               }
               {categories && 
                     categories.map(item =>(
                     <li 
                        key={item.name}  
                        className={`flex flow-row items-center cursor-pointer px-2 gap-2 h-7 hover:bg-gray-200 transition-all 
                           ${value == item.name && "bg-blue-900 text-white hover:!bg-blue-900"}`} 
                        onClick={()=> {
                           setValue({...formData, category: item.name, icon: item.icon});
                           setOpenSelect(false);
                        }}
                     >
                        <img className="w-5 h-5" 
                        src={`/icons/${item.icon}`} alt="" />
                        {item.name}
                     </li>
                  ))
               }
            </ul>
         </div>
      </div>
   )
}