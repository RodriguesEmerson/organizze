'use client';

import { PageModel } from "@/app/components/PageModel";
import { useSearchParams } from "next/navigation";
import { ChartBar } from "../../components/charts/ChartBar";
import { ChartLine } from "../../components/charts/ChartLine";
import { useUtils } from "../../hooks/useUtils";
import { useYearlyPage } from "../../hooks/useYearlyPage";
import { Spinner } from "@/app/components/loads/spinner";
import { useAuthGuard } from "../../hooks/auth/useAuthGuard";
import { useGetYearlySummary } from "@/app/hooks/entries/useGetYearlySummary";

/**
 * Componente principal do dashboard anual.
 * 
 * - Garante autenticação com useAuthGuard.
 * - Lê o parâmetro 'year' da URL.
 * - Obtém o resumo anual dos dados financeiros do ano selecionado.
 * - Renderiza informações financeiras e gráficos relacionados ao ano.
 */
export default function YearlyDashBoard() {

   // Verifica se o usuário está autenticado; redireciona se não estiver
   useAuthGuard();

   // Obtém o parâmetro 'year' da URL para definir o ano exibido
   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');

   // Hook que retorna o resumo financeiro do ano
   // Aqui está fixo '2025', ideal seria usar yearURL para dados dinâmicos
   const { yearlySummary } = useGetYearlySummary(yearURL);

   return (
      <PageModel title={`Relatório${yearURL ? ` de ${yearURL}` : ''}`}>
         {/* Caso o ano não esteja selecionado, exibe mensagem para o usuário */}
         {!yearURL &&
            <div className="z-10 text-white">
               <p>Selecione o mês ou ano que deseja vizualiar!</p>
            </div>
         }

         {/* Se ano estiver selecionado e os dados carregados, renderiza o conteúdo */}
         {(yearURL && yearlySummary) &&
         <>
            {/* Boxes com resumo de despesas, receitas e saldo */}
            <div className="flex flex-row gap-2">
               <BoxInfos type="expense" data={yearlySummary} />
               <BoxInfos type="income" data={yearlySummary} />
               <BoxInfos type="balance" data={yearlySummary} />
            </div>
            
            {/* Gráfico resumo detalhado por mês */}
            <SumaryChart data={yearlySummary}/>
         </>
         }
      </PageModel>
   )
}

/**
 * Componente que exibe as informações financeiras de um tipo (despesa, receita ou saldo)
 * em um box com valores, mês com maior valor e gráfico de linha mensal.
 * 
 * @param {Object} props
 * @param {'expense'|'income'|'balance'} props.type - Tipo da informação
 * @param {Object} props.data - Dados financeiros anuais
 */
const BoxInfos = ({ type, data }) => {
   const { toUpperFirstLeter, currencyFormat } = useUtils();
   const { getChartLablesAndValues } = useYearlyPage();

   // Prepara os dados do gráfico para o tipo informado
   const chartData = getChartLablesAndValues(data.months, type);

   // Configuração visual e textos para cada tipo
   const BoxConfig = {
      expense: { color: 'text-red-700', title: 'Despesas', chartColor: '#D91136' },
      income: { color: 'text-green-700', title: 'Receitas', chartColor: '#008000' },
      balance: { color: 'text-blue-700', title: 'Saldos', chartColor: '#1E90FF' }
   }

   // Enquanto os dados não carregarem, mostra spinner de loading
   if (!data || data.loading) {
      return <Spinner />
   }

   return (
      <div className="h-72 shadow-md relative min-w-80 flex-1 font-semibold text-gray-700 p-2 rounded-md bg-white">
         {/* Título do box com cor específica */}
         <h3 className={`text-sm font-thin ${BoxConfig[type].color}`}>
            {BoxConfig[type].title}
         </h3>

         {/* Valor total e ícone */}
         <div className="flex flex-row justify-between">
            <div className="mt-2">
               {/* Valor total formatado em moeda */}
               <span className="text-3xl">{currencyFormat(data.summary[type])}</span>
            </div>
            <img
               className="w-[60px] mr-2 -mt-1"
               src={`/icons/${type}B.png`}  // Ícone relacionado ao tipo (ex: expenseB.png)
               alt={`${BoxConfig[type].title} icon`}
            />
         </div>

         {/* Mês com maior valor e valor correspondente */}
         <div className="flex flex-col gap-1 mt-1">
            <span className="text-xs font-thin">
               Mês com a maior {BoxConfig[type].title.slice(0, -1)}: {toUpperFirstLeter(data.highestValues[type].month)}
            </span>
            <span className="font-bold">{currencyFormat(data.highestValues[type].value)}</span>
         </div>

         {/* Gráfico de linha mensal para esse tipo */}
         <MonthlyTypeChart color={`${BoxConfig[type].chartColor}`} chartData={chartData}/>
      </div>
   )
}

/**
 * Componente que exibe o gráfico de linha para os dados mensais.
 * 
 * @param {Object} props
 * @param {string} props.color - Cor principal da linha do gráfico
 * @param {Object} props.chartData - Dados formatados para o gráfico { labels: [], values: [] }
 */
function MonthlyTypeChart({ color, chartData }) {
   return (
      <div className="w-full h-[55%]">
         <ChartLine 
            data={{
               labels: chartData.labels, 
               values: chartData.values, 
               colors: [color],
               opacityColor: [`${color}15`]  // cor com transparência para efeito visual
            }}
         />
      </div>
   )
}

/**
 * Componente que exibe o gráfico de barras resumo com despesas, receitas e saldo mensal.
 * 
 * @param {Object} props
 * @param {Object} props.data - Dados financeiros anuais
 */
function SumaryChart({ data }) {
   const { getChartLablesAndValues } = useYearlyPage();

   // Prepara os dados para cada tipo
   const chartExpensesData = getChartLablesAndValues(data.months, 'expense');
   const chartIncomesData = getChartLablesAndValues(data.months, 'income');
   const chartBalanceData = getChartLablesAndValues(data.months, 'balance');

   return (
      <div className="w-full h-[335px] rounded-md shadow-xl bg-white mt-2 p-2">
         <p className="text-sm text-center">Detalhes de cada mês</p>
         <div className="w-full h-72">
            <ChartBar data={{
               labels: chartBalanceData.labels,
               datasets: [
                  {
                     label: 'Despesas',
                     data: chartExpensesData.values,
                     backgroundColor: ['#D9113699'] // Vermelho com transparência
                  },
                  {
                     label: 'Receitas',
                     data: chartIncomesData.values,
                     backgroundColor: ['#00800099'] // Verde com transparência
                  },
                  {
                     label: 'Saldo',
                     data: chartBalanceData.values,
                     backgroundColor: ['#1E90FF99'] // Azul com transparência
                  },
               ],
               orientation: 'x',  // gráfico horizontal
               showLabel: true,
               hiddenNumbers: false
            }}
               size={{ w: '500', h: '200' }}
            />
         </div>
      </div>
   )
}
