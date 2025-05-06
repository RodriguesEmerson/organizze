export function ButtonAdd({ text, ...props }) {
   return (
      <button 
         className="flex flex-row items-center px-2 gap-1 text-xs bg-cyan-600 hover:bg-cyan-700 transition-all h-8 rounded-md  text-white"  
         title={`Adicionar nova ${text}`}
         {...props}
      >
         <span className="material-icons-outlined !text-xl !text-whit !text-start">add_circle</span>
         <p>{`${text}`}</p>
      </button>
   )
}