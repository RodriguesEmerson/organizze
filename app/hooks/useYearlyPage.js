

export function useYearlyPage() {

   function getChartLablesAndValues(data, type){
      const lables = [];
      const values = [];

      for(const month in data){
         lables.push(month);
         values.push(data[month][type])
      }
 
      return { labels: lables, values: values };
   }

   return { getChartLablesAndValues }
}