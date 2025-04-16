export function useUtils() {
   function toUpperFirstLeter(str) {
      const strSpliced = [`${str.slice(0, 1).toUpperCase()}`, `${str.slice(1,)}`]
      return strSpliced.join("");
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

   return { toUpperFirstLeter, currencyFormat, gerarCUID }
}