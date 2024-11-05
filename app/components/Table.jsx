import { ButtonDeleteItem, ButtonEditItem } from "./buttons"
export function Table({ data }){
   const dados = {
      titulo: 'Despesas',
      headers: ['Descrição', 'Categ.', 'Data', 'Valor'],
      infos: [
         {descricao: 'Teste-1', categoria: 'house', data: '2024/11/04', valor: '1234,56', id: 123},
         {descricao: 'Teste-2', categoria: 'house', data: '2024/11/04', valor: '1234,56', id: 456},
         {descricao: 'Teste-3', categoria: 'house', data: '2024/11/04', valor: '1234,56', id: 789},
         {descricao: 'Teste-4', categoria: 'house', data: '2024/11/04', valor: '1234,56', id: 910}
      ]
   }
   return (
      <table className="text-black text-sm w-96">
         <colgroup>
            <col style={{width: "120px"}} />
            <col style={{width: "60px"}} />
            <col style={{width: "60px"}} />
            <col style={{width: "70px"}} />
            <col style={{width: "20px"}} />
            <col style={{width: "20px"}} />
         </colgroup>
         <thead>
            <tr className="border-b-[1px] border-b-gray-400">
            {dados.headers.map(colName => (
               <th 
                  key={colName} 
                  scope="col" 
                  className="text-center font-thin !text-[13px]"
               >{colName}</th>
            ))}
            </tr>
         </thead>
         <tbody>
            {dados.infos.map(item => (
               <tr key={item.id} className="h-7 border-b-[1px] border-b-gray-300 text-[13px]">
                  <td className="pl-1">{item.descricao}</td>
                  <td className="flex items-center justify-center pt-1">
                     <img 
                        src={`/icons/c-${item.categoria}.png`} alt="icone categoria" 
                        className="max-w-5"
                     />
                  </td>
                  <td className="text-center">
                     {`${new Date(item.data).toLocaleDateString('pt-br', {day: "2-digit", month: "short"})}`}
                  </td>
                  <td className="text-end">{item.valor}</td>
                  <td className="text-center align-middle pl-2 pt-1">
                     <ButtonEditItem />
                  </td>
                  <td className="text-center align-middle pt-1">
                     <ButtonDeleteItem />
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}