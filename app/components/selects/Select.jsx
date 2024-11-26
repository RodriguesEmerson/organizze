import { useState } from "react"

export function Select({ options, width, label }){
   const [currentOption, setCurrentOption] = useState('');
   const [isOpen, setIsOpen] = useState(false);

   return(
      <div 
         className="relative text-xs w-fit transition-all" 
         onClick={()=> setIsOpen(!isOpen)}
         style={{width: `${width}px`}}
      >
         <span className="ml-1 font-semibold text-white">{label}</span>
         <div className="flex flex-row mb-[2px] cursor-pointer border-2 border-gray-300 rounded-md p-1 w-full">
            <input
               type="text"
               placeholder={label}
               name={label} 
               className="w-full outline-none caret-transparent cursor-pointer bg-transparent text-white"
               value= {currentOption}
               onChange={()=> {}}
            />
            <span className="material-icons !text-sm">keyboard_arrow_down</span>
         </div>
         <div 
           className="absolute bg-white shadow-xl border-gray-200 border overflow-hidden w-fit rounded-md transition-all"
           style={{height: `${isOpen ? 20.3 * options.length : 0}px`, border: !isOpen && "none"}}
         >
            <ul className="flex flex-col"
               style={{width: `${width}px`}}
            >
               {
                  options.map(option => (
                     <li 
                        key={option} 
                        className={`h-5 cursor-pointer px-1 pt-[2px] hover:bg-gray-200 transition-all
                           ${currentOption == option && "bg-gray-900 text-white hover:bg-gray-900"}
                        `}
                        onClick={()=> setCurrentOption(option)}
                     >
                        {option}
                     </li>
                  ))
               }
            </ul>
         </div>
      </div>
   )
}