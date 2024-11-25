export function ButtonAdd({ title, clickEvent }) {
   return (
      <button 
         className="flex flex-row items-center px-2 gap-1 text-xs bg-gray-900 hover:!text-gray-300 transition-all h-7 rounded-xl text-white"  
         onClick={() => clickEvent()} 
         title={`Adicionar nova ${title}`}
      >
         <span className="material-icons-outlined !text-xl !text-whit !text-start">add_circle</span>
         <p>{`${title}`}</p>
      </button>
   )
}

export function ButtonClose( props ) {
   return (
      <button {...props} >
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-7 h-7 !leading-7 text-center hover:bg-gray-300"
         >close</span>
      </button>
   )
}

export function ButtonSave({ onClick, text }) {
   return ( 
      <button type="submit"
         className="flex items-center justify-center w-full text-sm gap-1 px-2 h-8 bg-gray-900  !text-gray-300 rounded-md  hover:!text-gray-400 transition-all"
         onClick={onClick}
      >
         <span>{text}</span>
         <span className="material-icons-outlined !text-sm !text-start">playlist_add_check_circle</span>
      </button>
   )
}