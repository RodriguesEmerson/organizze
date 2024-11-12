export function ButtonDeleteItem() {
   return (

      <button className="h-5 overflow-hidden hover:text-red-800 transition-all">
         <span className="material-icons-outlined !text-lg h-4 !text-start -mt-1">delete</span>
      </button>
   )
}
export function ButtonEditItem() {
   return (
      <button className="h-5 overflow-hidden hover:text-green-800 transition-all">
         <span className="material-icons-outlined !text-xl h-4 !text-start -mt-1">edit_note</span>
      </button>
   )
}

export function ButtonAdd({ title, clickEvent }) {
   return (
      <button onClick={() => clickEvent()} title={`Adicionar nova ${title}`}>
         <span className="material-icons-outlined !text-xl !text-gray-500 h-4 !text-start -mt-1 hover:!text-gray-700 transition-all">add_circle</span>
      </button>
   )
}

export function ButtonClose({ clickEvent }) {
   return (
      <button onClick={() => clickEvent()}>
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-8 h-8 !leading-8 text-center hover:bg-gray-200"
         >close</span>
      </button>
   )
}

export function ButtonSave({ clickEvent, type }) {
   return (
      <button type="submit"
         className="flex items-center justify-center w-full text-sm gap-1 px-2 h-8 bg-gray-900  !text-gray-300 rounded-md  hover:!text-gray-400 transition-all"
         onClick={(e) => clickEvent(e, type)}
      >
         <span>Adicionar</span>
         <span className="material-icons-outlined !text-sm !text-start">playlist_add_check_circle</span>
      </button>
   )
}