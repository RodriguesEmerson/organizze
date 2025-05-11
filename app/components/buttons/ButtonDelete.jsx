export function ButtonDelete({ text, children,  ...props }) {
   return (
      <button 
         className="flex flex-row items-center justify-center px-2 gap-1 text-xs transition-all h-8 rounded-md  text-red-700 border border-red-700 hover:bg-red-50"  
         {...props}
      >
         {children 
            ? children 
            :  <>
                  <p>{text}</p>
                  <span className="material-icons-outlined text-[18px] !text-start">delete</span>
               </>
         }
         
      </button>
   )
}