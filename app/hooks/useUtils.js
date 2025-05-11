export function useUtils() {
   function toUpperFirstLeter(str) {
      try{
         const strSpliced = [`${str.slice(0, 1).toUpperCase()}`, `${str.slice(1,)}`]
         return strSpliced.join("");
      }catch{
         return str;
      }
   }

   function currencyFormat(value){
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
   }

   function gerarCUID() {
      const timestamp = Date.now().toString(36); // Base36 para reduzir o tamanho
      const randomPart = Math.random().toString(36).substring(2, 10); // Parte aleatória
      const uniquePart = performance.now().toString(36).replace('.', ''); // Para evitar colisões
      return `c${timestamp}${randomPart}${uniquePart}`;
   }

   function convertDateToYMD(date){
      if(!date) return null;
      const splitedDate = date.split('/');
      return `${splitedDate[2]}-${splitedDate[1]}-${splitedDate[0]}`
   }

   function convertDateToDM(date){
      return new Date(date + 'T00:00:00').toLocaleDateString('pt-br', { day: "2-digit", month: "short" })
   }

   function convertDateToDMY(date){
      return new Date(date + 'T00:00:00').toLocaleDateString('pt-br', { day: "2-digit", month: "2-digit", year: 'numeric'})
   }

   function getMonthName(date, caracters, format){
      let dateToGetMonth = date;
      if(format == 'br'){
         const splicedDate = date.split((/\/|\-/));
         dateToGetMonth = `${splicedDate[2]}-${splicedDate[1]}-${splicedDate[0]}`;
      }
      const monthName = new Date(dateToGetMonth + 'T00:00:00').toLocaleDateString('pt-br', { month: "long"});
      if(caracters){ return monthName.slice(0, caracters)}
      return monthName;
   }

   function convertValueToNumeric(value){
      const valueWithoutPoint = value.replace('.', '');
      return Number(valueWithoutPoint.replace(',', '.'));
   }

   return { toUpperFirstLeter, currencyFormat, gerarCUID, convertDateToYMD, convertValueToNumeric, convertDateToDM, convertDateToDMY, getMonthName }
}