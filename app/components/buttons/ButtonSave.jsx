export function ButtonSave({ text, children, ...props }) {
   return ( 
      <button type="button"
         className="flex items-center justify-center min-w-[90px] w-full text-sm gap-1 px-2 h-8 bg-cyan-600  text-white rounded-md  hover:bg-cyan-700 transition-all"
         {...props}
      >
         {children 
            ? children 
            :  <>
                  <span>{text}</span>
                  <span className="material-icons-outlined !text-sm !text-start">playlist_add_check_circle</span>
               </>
         }
         
         
      </button>
   )
}