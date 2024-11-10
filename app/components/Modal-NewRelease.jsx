import { ButtonClose } from "./buttons"

export function ModalNewRelease({ title }){
   const type = 'expenses'
   return (
      <div className="modal relative h-64 w-96 bg-white rounded-md shadow-lg">
         <div className="text-center h-8 leading-8 text-sm">
            <h4>{`Adicionar nova ${title}`}</h4>
            <div className="absolute h-5 w-5 top-0 right-2">
               <ButtonClose />
            </div>
         </div>
      </div>
   )
}