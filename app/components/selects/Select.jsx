import { useEffect, useState } from "react"

export function Select({ options, width, label, name, form, ...props }){
   const [currentOption, setCurrentOption] = useState(props.value);
   const [isOpen, setIsOpen] = useState(false);

   if(!options) return <></>
   return(
      <div 
         className={`relative text-xs w-fit transition-all`} 
         onClick={()=> setIsOpen(!isOpen)}
         style={{width: `${width}px`}}
      >
         <span className="ml-1 font-semibold text-gray-900">{label}</span>
         <div className="flex flex-row mb-[2px] h-6 cursor-pointer border border-gray-300 bg-gray-200 rounded-md p-1 w-full">
            <input
               className="w-full outline-none caret-transparent cursor-pointer bg-transparent text-gray-900"
               placeholder={label ? label : "*Selecione*"}
               autoComplete="off"
               type="text"
               name={name}   
               value= {currentOption}
               readOnly
               {...props}
               
            />
            <span className="material-icons !text-sm -mt-[2px]">keyboard_arrow_down</span>
         </div>
         <div 
           className="absolute bg-white shadow-xl border-gray-200 border overflow-hidden w-fit rounded-md transition-all"
           style={{height: `${isOpen ? 20.3 * options.length : 0}px`, border: !isOpen && "none"}}
         >
            <ul className="flex flex-col"
               style={{width: `${width}px`, height: height ? `${height}px` : "auto"}}
            >
               {
                  options.map(option => (
                     <li 
                        key={option} 
                        className={`h-5 cursor-pointer px-1 pt-[2px] hover:bg-gray-200 transition-all
                           ${currentOption == option && "bg-gray-900 text-white hover:bg-gray-900"}
                        `}
                        onClick={()=> {
                           setCurrentOption(option);
                           form.setFormData({...form.formData, [name]: option})
                        }}
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