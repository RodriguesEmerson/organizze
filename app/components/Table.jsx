import { useEffect, useState } from "react";
import { useUtils } from "../hooks/useUtils";
import { useEntriesDataStore } from "../zustand/useEntriesDataStore";
import { useModalsHiddenStore } from "../zustand/useModalsHiddenStore";
import { useTableStore } from "../zustand/useTablesStore";
import { useUtilsStore } from "../zustand/useUtilsStore";
import { Spinner } from "./loads/spinner";
import { Switch } from "@mui/material";
import { useUpdateEffected } from "../hooks/entries/useUpdateEffeced";

/**
 * Componente que exibe uma tabela de lançamentos (despesas ou receitas).
 * Recebe um tipo (expense ou income) para personalizar comportamentos.
 * Usa dados do Zustand para pegar os lançamentos e exibir.
 * 
 * @param {Object} props
 * @param {string} props.type - Tipo do lançamento, ex: 'expense' ou 'income'
 * @returns {JSX.Element} Tabela com os lançamentos
 */
export function Table({ type }) {
   const tablesHeaders = ['Descrição', 'Categoria', 'Data', 'Fixa', 'Valor', 'Efetivado'];
   const entriesData = useEntriesDataStore(state => state.entriesData);
   const [entries, setEntries] = useState(false);

   useEffect(() => {
      if(entriesData){
         setEntries(entriesData.entries.all);
      }
   }, [entriesData.entries.all]);

   if (!entries) return <Spinner />;

   return (
      <>
         <table className="text-gray-600 text-sm w-full overflow-x-hidden">
            <colgroup>
               <col style={{ width: "40%" }} />
               <col style={{ width: "80px" }} />
               <col style={{ width: "80px" }} />
               <col style={{ width: "80px" }} />
               <col style={{ width: "70px" }} />
               <col style={{ width: "30px" }} />
            </colgroup>
            <thead>
               <tr className="border-b-[1px] border-b-gray-400">
                  {tablesHeaders.map(colName => (
                     <th
                        key={colName}
                        scope="col"
                        className="text-center font-thin !text-[13px]"
                     >
                        {colName}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {entries.map(entry => (
                  <TableTr key={entry.id} entry={entry} type={type} />
               ))}
            </tbody>
         </table>
      </>
   )
}

/**
 * Linha da tabela que representa um lançamento individual.
 * Aplica animação de fadeIn se a linha for a animada no estado global.
 * Abre modal de edição ao clicar.
 * 
 * @param {Object} props
 * @param {Object} props.entry - Objeto contendo dados do lançamento
 * @param {string} props.type - Tipo do lançamento (expense/income)
 * @returns {JSX.Element} Linha da tabela com dados do lançamento
 */
function TableTr({ entry, type }) {
   const { convertDateToDM } = useUtils();
   const setEditingEntry = useTableStore((state) => state.setEditingEntry);
   const toAnimateEntry = useTableStore((state) => state.toAnimateEntry);
   const setToAnimateEntry = useTableStore((state) => state.setToAnimateEntry);
   const setShowEditModal = useModalsHiddenStore(state => state.setShowEditModal);
   const [animate, setAnimate] = useState('');

   // Controla animação da linha se for a selecionada para animação
   if(toAnimateEntry === entry.id){
      if(!animate){
         setAnimate(true);
         setTimeout(() => {
            setToAnimateEntry(false);
            setAnimate('');
         }, 3000);
      }
   }

   return(
      <tr
         key={entry.id}
         className={`h-10 border-t-[1px] border-t-gray-200 text-[13px] hover:bg-gray-100 transition-all cursor-pointer
         ${animate && 'animate-fadeIn'} ${entry.type === 'expense' ? 'text-red-800' : 'text-green-700'}`}
         onClick={() => {
            setEditingEntry({...entry, type: entry.type});
            setShowEditModal(true);
         }}
      >
         <td className="pl-2 max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis font-semibold">
            {entry.description}
         </td>

         <TableTd icon={`/icons/${entry.icon}`} categ={entry.category} />

         <td className="relative text-center">
            {convertDateToDM(entry.date)}
         </td>
         <td className="relative text-center">
            {entry.end_date ? convertDateToDM(entry.end_date) : 'não'}
         </td>
         <td className="pr-2 max-w-10 text-center">
            {Number(entry.value).toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}
         </td>
         <EffetivedSwitch effected={entry.effected} entry={entry} />
      </tr>
   )
}

/**
 * Componente da célula que exibe o ícone da categoria e o nome da categoria.
 * Também controla a exibição de tooltip via Zustand no hover da imagem.
 * 
 * @param {Object} props
 * @param {string} props.icon - URL do ícone da categoria
 * @param {string} props.categ - Nome da categoria
 * @returns {JSX.Element} Célula da tabela com ícone e nome da categoria
 */
function TableTd({ icon, categ }) {
   const setTooltipInfoText = useUtilsStore((state) => state.setTooltipInfoText);

   return (
      <td className="flex flex-row gap-2 leading-10 items-center">
         <img
            src={icon} alt="icone categ"
            className="max-w-5 max-h-5"
            onMouseEnter={(e) => setTooltipInfoText({ categ: categ, e: e, show: true })}
            onMouseOut={(e) => setTooltipInfoText({ categ: categ, e: e, show: false })}
         />
         <span>{categ}</span>
      </td>
   )
}

/**
 * Componente que exibe o switch para marcar um lançamento como efetivado ou não.
 * Chamará o hook para atualizar o estado no backend e no Zustand.
 * Exibe um spinner enquanto a atualização está em andamento.
 * 
 * @param {Object} props
 * @param {Object} props.entry - Objeto do lançamento
 * @param {boolean} props.effected - Indica se o lançamento está efetivado
 * @returns {JSX.Element} Célula da tabela com o switch para efetivado
 */
function EffetivedSwitch({ entry, effected }) {
   const { updateEffected, updateStatus } = useUpdateEffected();

   return (
      <td className="text-center"
         onClick={(e) => {
            e.stopPropagation();
            if (!updateStatus.loading) {
               updateEffected(entry, !effected)
            }
         }}
      >
         {updateStatus?.loading
            ? <Spinner />
            : <Switch color="success" defaultChecked={effected} />
         }
      </td>
   )
}
