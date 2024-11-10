import { ButtonClose, ButtonSave } from "./buttons"
import { Select } from "./Select"

export function ModalNewRelease({ title }) {
   const type = 'expenses'
   // desc": "Conta de Luz", "categ": "house", "date": "2024/02/03", "value": "200.00", "id": 2, "fixed": false 
   return (
      <div className="modal flex flex-col justify-between relative h-64 w-96 bg-white rounded-md shadow-lg p-2">
         <div className="text-center h-8 leading-8 text-sm">
            <h4>{`Adicionar nova ${title}`}</h4>
            <div className="absolute h-5 w-5 top-0 right-2">
               <ButtonClose />
            </div>
         </div>
         <div>
            <form className="text-sm text-gray-700">
               <div className="flex flex-col gap-[2px] mb-2">
                  <label className="pl-1">Descrição</label>
                  <input
                     className="h-7 pl-2 font-thin border border-gray-300 rounded-md focus-within:outline-1 focus-within:outline-gray-500" 
                     type="text" 
                     name="descricao"
                     autoFocus
                  />
               </div>
               <div className="flex flex-col gap-[2px] z-30">
                  <label>Categoria</label>
                  <Select name={"categoria"}/>
               </div>
               <div>
                  <label>Data</label>
                  <input type="text" name="data"/>
               </div>
               <div>
                  <label>Valor</label>
                  <input type="text" name="valor"/>
               </div>
               <div>
                  <label>Fixa</label>
                  <input type="text" name="fixa"/>
               </div>
            </form>
         </div>
         <div className="flex justify-center">
            <ButtonSave />
         </div>
      </div>
   )
}