export function ButtonClose( props ) {
   return (
      <button {...props} >
         <span
            className="material-icons !text-base text-gray-600 absolute top-1 right-2 cursor-pointer rounded-lg w-7 h-7 !leading-7 text-center hover:bg-gray-300"
         >close</span>
      </button>
   )
}
