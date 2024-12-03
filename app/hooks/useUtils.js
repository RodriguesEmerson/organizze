export function useUtils() {
   function toUpperFirstLeter(str) {
      const strSpliced = [`${str.slice(0, 1).toUpperCase()}`, `${str.slice(1,)}`]
      return strSpliced.join("");
   }

   function currencyFormat(value){
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
   }

   return { toUpperFirstLeter, currencyFormat }
}