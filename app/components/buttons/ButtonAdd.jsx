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