export function ButtonDelete( props ) {
   return ( 
      <button
         className="flex items-center justify-center w-full gap-1 px-2 h-8  !text-gray-700 rounded-md  hover:!text-red-700 transition-all"
         {...props}
      >
         <span className="material-icons-outlined text-[20px] !text-start">delete</span>
      </button>
   )
}