import { useState } from "react"
import { Spinner } from "../loads/spinner";
import { useGetCategories } from "@/app/hooks/categories/useCategoreisHandler";

export function CategorieSelect({ defaultValue, name, value, setValue, formData, type, categoriesList }){
   
   const [openSelect, setOpenSelect] = useState(false);
   const { categories } = categoriesList ? categoriesList : useGetCategories(type);
   
   return(
      <div className=" relative" >
         <div 
            className={`flex flex-row gap-1 items-center justify-between h-8 cursor-pointer pl-2 font-thin border border-gray-300 rounded-md ${categoriesList ? 'w-14' : 'w-32'}`}
            onClick={()=> {setOpenSelect(!openSelect);}}
         >
            {categoriesList &&
               <img className="w-5 h-5" 
                  src={`/icons/${formData.image}`} alt="" />
            }
            {!categoriesList &&
               <input
                  className="outline-none w-[90%] bg-white max-w-full !cursor-pointer pointer-events-none"
                  value={value}
                  type="text"
                  name={name}
                  defaultValue={defaultValue}
                  onChange={()=>{}}
               />
            }
            <span className="material-icons">keyboard_arrow_down</span>
         </div>

         <div className={`absolute bg-white rounded-md shadow-xl mt-[1px] overflow-hidden transition-all`}
               style={{height: openSelect ? `${28 * categories.length + 2}px` : 0}}
         >
            <ul>
               {!categories && 
                  <Spinner />
               }
               {categories[0] == 'erro' 
                  ? <li>
                        <p className="text-[10px] text-red-800">Erro ao buscar categorias</p>
                     </li>
                  : categories && 
                     categories.map(item =>(
                     <li 
                        key={categoriesList ? item : item.name}  
                        className={`flex flow-row items-center cursor-pointer px-2 gap-2 h-7 hover:bg-gray-200 transition-all 
                           ${value == item.name && "bg-blue-900 text-white hover:bg-blue-900"}`} 
                        onClick={()=> {
                           categoriesList
                              ? setValue({...formData, image: `c-${item}.png`})
                              : setValue({...formData, category: item.image});
                              setOpenSelect(false);
                        }}
                     >
                        <img className="w-5 h-5" 
                        src={`/icons/${categoriesList && 'c-'}${categoriesList ? item : item.image}${categoriesList && '.png'}`} alt="" />
                        {item.name}
                     </li>
                  ))
               }
            </ul>
         </div>
      </div>
   )
}