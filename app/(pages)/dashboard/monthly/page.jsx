'use client'

import { PageModel } from "@/app/components/PageModel";
import { useUtils } from "@/app/hooks/useUtils";
import { ExpesesGraphic } from "@/app/UI/Board/ExpensesGraphic";
import { IncomesGraphic } from "@/app/UI/Board/IncomesGraphic";
import { useSearchParams } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/auth/useAuthGuard";
import { useGetEntries } from "@/app/hooks/entries/useGetEntries";
import { ModalEditEntry } from "@/app/components/modals/ModalEditEntry";
import { ToastNotifications } from "@/app/components/notificatons/ToastNotifications";
import { IncomesTotal } from "@/app/UI/Board/IncomesTotal";
import { BalanceTotal } from "@/app/UI/Board/BalanceTotal";
import { ExpensesTotal } from "@/app/UI/Board/ExpensesTotal";
import { GoalGraphic } from "@/app/UI/Board/GoalGraphic";
import { MonthlyPageSqueleton } from "@/app/components/loads/MonthlyPageSqueleton";
import { ModalInsertEntry } from "@/app/components/modals/ModalInsertEntry";
import { memo } from "react";
import { SummaryGraphic } from "@/app/UI/Board/SummaryGraphic";
import { ModalConfirmAction } from "@/app/components/modals/ModalConfirmAction";
import EntriesTable from "@/app/UI/Board/EntriesTable";

/**
 * Componente principal do dashboard mensal.
 * 
 * - Garante que o usuário está autenticado com useAuthGuard, caso contrário redireciona para login.
 * - Obtém ano e mês via query params da URL usando useSearchParams.
 * - Busca os lançamentos financeiros correspondentes ao mês e ano via hook useGetEntries.
 * - Atualiza a tabela selecionada no Zustand para controlar o mês atual do calendário.
 * - Exibe modais globais para edição, inserção e confirmação de ações.
 * - Renderiza o layout principal com totais, gráficos e tabela de lançamentos.
 *
 * @returns {JSX.Element} O dashboard mensal.
 */

export default function MonthlyDashBoard() {
   // Verifica se o usuário está autenticado; redireciona se não estiver
   useAuthGuard();
   const { toUpperFirstLeter } = useUtils();


   // Obtém os parâmetros year e month da URL
   const searchParams = useSearchParams();
   const yearURL = searchParams?.get('year');
   const monthURL = searchParams?.get('month');

   // Hook que busca os lançamentos para o ano e mês informados
   const { entriesData } = useGetEntries(yearURL, monthURL);

   return (
      <>
         {/* Modais globais usados em toda a página */}
         <ModalEditEntry />
         <ModalInsertEntry />
         <ToastNotifications />
         <ModalConfirmAction text={'Lançamento'} />

         {/* Caso esteja carregando ou não tenha dados, exibe esqueleto de carregamento */}
         {(entriesData?.loading || !entriesData) &&
            < PageModel title={`${toUpperFirstLeter(monthURL)} de ${yearURL}`}>
               <MonthlyPageSqueleton />
            </PageModel>
         }
         {/* Caso haja erro, exibe mensagem 404 personalizada */}
         {
            entriesData?.erro &&
            <div className=" flex items-center justify-center h-[95%] text-gray-900">
               <span className="text-3xl font-bold">404</span>
               <span className="inline-block h-12 w-[2px] mx-2 bg-gray-900"></span>
               <p>{`As finanças de ${monthURL} de ${yearURL} não foram encontradas!`}</p>
            </div>
         }

         {/* Caso existam lançamentos, renderiza o dashboard completo */}
         {entriesData?.entries &&
            <MonthlyDashBoardBody entriesData={entriesData} monthURL={monthURL} yearURL={yearURL}/>
         }

      </>
   )
}

const MonthlyDashBoardBody = memo(({ entriesData, monthURL, yearURL }) => {
   const { toUpperFirstLeter } = useUtils();

   return (
      <>
         {/* Estrutura principal da página com título dinâmico */}
         < PageModel title={`${toUpperFirstLeter(monthURL)} de ${yearURL}`}>
            <div className="flex flex-col gap-2 pb-3 ">
               <div className="w-full h-full">
                  <div>
                     <div className="flex flex-row mb-2 gap-2 justify-between">
                        {/* Totais */}
                        <ExpensesTotal />
                        <IncomesTotal />
                        <BalanceTotal />
                        <GoalGraphic />
                     </div>
                  </div>

                  <div className="w-full flex flex-col gap-2 justify-between xl:flex-row">
                     {/* Gráficos das despesas, receitas e resumo */}
                     <ExpesesGraphic expenses={entriesData.entries.expenses} sumary={entriesData.sum} />
                     <div className="w-full flex flex-col gap-2 items-stretch lg:flex-row">
                        <IncomesGraphic incomes={entriesData.entries.incomes} sumary={entriesData.sum} />
                        <SummaryGraphic />
                     </div>
                  </div>

                  <hr className="bg-gray-400 h-[1.5px] my-2" />
               </div>

               {/* Tabelas com lançamentos */}
               <Tables />
            </div>
         </ PageModel>
      </>
   )
})

/**
 * Componente para exibir as tabelas de lançamentos.
 * Atualmente renderiza somente EntriesTable.
 *
 * @returns {JSX.Element} Container com tabelas.
 */
function Tables() {
   return (
      <div className="tables !relative justify-stretch flex flex-row gap-2">
         {/* Possíveis futuras tabelas comentadas */}
         {/* <TooltipInfo /> */}
         {/* <ExpenseTable /> */}
         {/* <IncomeTable /> */}
         <EntriesTable />
      </div>
   )
}
