
import { useSearchParams } from 'next/navigation'
import { useTableStore } from '../zustand/useTablesStore';

export function useYearlyPage() {
   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');
   const data = useTableStore(state => state.data);

   const yearlyPageHandler = {
      getInfos: function (type, sumary) {
         if (!data || !yearURL) return;
         const yearData = data[yearURL];

         if (!yearData) return console.log('Não encotrado!');

         //Objeto que terá todos valores de cada mês do ano selecionado.
         const monthsData = {};

         //Faz um loop em cada mês do ano selecionado.
         for (const month in yearData.months) {
            //Pega o valor de cada item no mês.
            const monthValues = yearData.months[month][type].map(item => item.value);
            //Soma todos os valores.
            monthsData[month] = this.reduceValues(monthValues);
         }

         const boxData = this.createBoxData(monthsData);

         // //Guarda as informações para serem usadas no no gráfico resumo.
         if (sumary) {
            return ({  monthsData: monthsData });
         };

         return boxData;
      },

      getYearlySumary: function () {
         const monthlyTotal = {};
         const expenses = this.getInfos('expenses', true);
         const incomes = this.getInfos('incomes', true);

         for (const month in expenses?.monthsData) {
            monthlyTotal[month] = Number(incomes.monthsData[month]) - Number(expenses.monthsData[month]);
         };

         const boxData = this.createBoxData(monthlyTotal);

         return boxData;
      },
      
      createBoxData: function (monthsData) {
         //Cria um array com todos os meses encotrados no ano.
         const labels = Object.keys(monthsData);
         const shortLabels = labels.map(month => month = month.slice(0, 3));

         //Cria um arry com todos os valores dos meses.
         const values = Object.values(monthsData);

         //Pega o mês com o maio valor.
         const greaterValue = { month: '', value: 0 }
         for (const month in monthsData) {
            if (monthsData[month] > greaterValue.value) {
               greaterValue.month = month;
               greaterValue.value = monthsData[month];
            }
         };

         const total = this.reduceValues(values);

         return { labels, shortLabels, values, greaterValue, total };
      },

      reduceValues: function (values) {
         return values.reduce((acc, cur) => Number(acc) + Number(cur), 0);
      }
   }

   return { yearlyPageHandler }

}