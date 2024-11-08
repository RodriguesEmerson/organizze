'use client';

import { useTable } from "../hooks/useTable";
import { Spinner } from "../UI/spinner";

export function Table({ table }){
   const { tableHandler, tablesHeaders } = useTable();
   const data = tableHandler.getSelectedMonthData();
   console.log(useTable())

   if(!data) return <Spinner />
   const dados = {
      titulo: 'Despesas', 
      headers: ['Descrição', 'Categ.', 'Data', 'Valor'],
      expenses: [
         {desc: 'Teste-1', categ: 'house', date: '2024/11/04', value: '1234,56', id: 123},
         {desc: 'Teste-2', categ: 'house', date: '2024/11/04', value: '1234,56', id: 456},
         {desc: 'Teste-3', categ: 'house', date: '2024/11/04', value: '1234,56', id: 789},
         {desc: 'Teste-4', categ: 'house', date: '2024/11/04', value: '1234,56', id: 910}
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
         </colgroup>
         <thead>
            <tr className="border-b-[1px] border-b-gray-400">
            {tablesHeaders.map(colName => (
               <th 
                  key={colName} 
                  scope="col" 
                  className="text-center font-thin !text-[13px]"
               >{colName}</th>
            ))}
            </tr>
         </thead>
         <tbody>
            {data[table].map(item => (
               <tr key={item.id} className="h-7 border-b-[1px] border-b-gray-300 text-[13px]">
                  <td className="pl-1">{item.desc}</td>
                  <td className="flex items-center justify-center pt-1">
                     <img 
                        src={`/icons/c-${item.categ}.png`} alt="icone categ" 
                        className="max-w-5"
                     />
                  </td>
                  <td className="text-center">
                     {`${new Date(item.date).toLocaleDateString('pt-br', {day: "2-digit", month: "short"})}`}
                  </td>
                  <td className="text-end">{item.value}</td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}