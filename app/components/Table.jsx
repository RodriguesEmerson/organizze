import { useTable } from "../hooks/useTable";
import { Spinner } from "../UI/spinner";

export function Table({ table }){
   const { tableHandler, tablesHeaders } = useTable();
   const data = tableHandler.getSelectedMonthData();

   if(!data) return <Spinner />
   return (
      <table className="text-gray-600 text-sm w-96">
         <colgroup>
            <col style={{width: "120px"}} />
            <col style={{width: "30px"}} />
            <col style={{width: "60px"}} />
            <col style={{width: "60px"}} />
         </colgroup>
         <thead className="hidden">
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
               <tr key={item.id} className="h-8 border-t-[1px] border-t-gray-300 text-[13px] hover:bg-gray-100 transition-all cursor-pointer">
                  <td className="pl-1 max-w-[120px] text-nowrap overflow-x-hidden text-ellipsis">{item.desc}</td>
                  <td className="flex items-center justify-center pt-[6px]">
                     <img 
                        src={`/icons/c-${item.categ}.png`} alt="icone categ" 
                        className="max-w-5"
                     />
                  </td>
                  <td className="text-center">
                     {`${new Date(item.date).toLocaleDateString('pt-br', {day: "2-digit", month: "short"})}`}
                  </td>
                  <td className="text-end pr-1 max-w-10">
                     { Number(item.value).toLocaleString('pt-BR', {style: "currency", currency: "BRL"}) }
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}