export function useUtils() {
   function toUpperFirstLeter(str) {
      const strSpliced = [`${str.slice(0, 1).toUpperCase()}`, `${str.slice(1,)}`]
      return strSpliced.join("");
   }

   return { toUpperFirstLeter }
}