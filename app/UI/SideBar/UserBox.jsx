

export function UserBox(){
   const data = {img: '', name: 'Emerson Rodrigues', email: 'emerson@teste.com'}
   return(
      <section className="m-auto my-2 flex gap-1 py-2 px-1 flex-col justify-center items-center bg-gray-900 text-white rounded-md w-[95%]">
         <div className="flex flex-row w-full items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gray-900 to-cyan-600">
            </div>
            <div className="text-xs">
               <p className="">{data.name}</p>
               <p className="text-gray-400 text-[10px]">{data.email}</p>
            </div>
         </div>
      </section>
   )
}