export function ButtonClose({ color = 'white', ...props }) {
   return (
      <button {...props} >
         <span
            className={`material-icons !text-base ${`text-${color}-600`} absolute top-1 right-2 cursor-pointer rounded-lg w-7 h-7 !leading-7 text-center transition-all hover:bg-white hover:bg-opacity-50`}
         >close</span>
      </button>
   )
}
