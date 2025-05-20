
/**
 * 
 * @param {string} text - Texto que será exibido abaixo do valor para informar o tipo de dado exibido. 
 * @param {string} textColor - Cor do text, deve chegar no padrao Next. Ex: text-red-800. 
 * @param {number} value - Valor que será exibo no formato BRL. 
 * @param {string} icon - Ícone referente a informação a ser mostrada. 
 * 
 * @returns {JSX.Element} - Componente contendo as imformações acima.
 */

import { useUtils } from "../hooks/useUtils"

export function TotalMonthlyBox({ text, textColor, value, icon }) {
   const { currencyFormat } = useUtils();
   return (
      <div
         className="z-[5] flex flex-col items-center p-1 gap-4 justify-center h-28 shadow-md w-72 flex-1 bg-white text-white rounded-md pt-3 lg:flex-row">
         <div className="w-6 md:w-9">
            <img src={icon} alt="icon" />
         </div>
         <div className="h-[70%] flex flex-col items-start justify-center">
            <p className="text-xl font-extrabold text-gray-600 md:text-3xl">
               {currencyFormat(value)}
            </p>
            <h4 className={`text-xs w-full text-center -mt-1 ${textColor}  md:text-sm`}>{text}</h4>
         </div>
      </div>
   )
}