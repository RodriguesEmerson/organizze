import { useState } from "react";



export function IconSelect({ currentIcon, setFormData, formData, icons }){
   
   const [openSelect, setOpenSelect] = useState(false);
   
   return(
      <div className=" relative" >
         <div 
            className={`flex flex-row gap-1 items-center justify-between h-8 cursor-pointer pl-2 font-thin border border-gray-300 rounded-md w-14`}
            onClick={()=> {setOpenSelect(!openSelect);}}
         >
            <img className="w-5 h-5"  src={`/icons/${formData.icon}`} alt={`${formData.icon}'s icon`} />
            <span className="material-icons">keyboard_arrow_down</span>
         </div>

         <div className={`absolute bg-white rounded-md shadow-xl mt-[1px] overflow-hidden transition-all`}
               style={{height: openSelect ? `${28 * icons.length + 2}px` : 0}}
         >
            <ul>
               {!icons && 
                  <Spinner />
               }
               {
                  icons.map(icon =>(
                  <li 
                     key={icon}  
                     className={`flex flow-row items-center cursor-pointer px-2 gap-2 h-7 hover:bg-gray-200 transition-all 
                        ${currentIcon == icon && "bg-blue-900 text-white hover:bg-blue-900"}`} 
                     onClick={()=> {
                        setFormData({...formData, icon: icon})
                        setOpenSelect(false);
                     }}
                  >
                     <img className="w-5 h-5" 
                      src={`/icons/${icon}`} alt={`${icon}'s icon`} />
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}