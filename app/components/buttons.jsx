export function ButtonDeleteItem(){
   return(

      <button className="h-5 overflow-hidden hover:text-red-800 transition-all">
         <span className="material-icons-outlined !text-lg h-4 !text-start -mt-1">delete</span>
      </button>
   )
}
export function ButtonEditItem(){
   return(

      <button className="h-5 overflow-hidden hover:text-green-800 transition-all">
         <span className="material-icons-outlined !text-xl h-4 !text-start -mt-1">edit_note</span>
      </button>
   )
}