/**
 * Botão reutilizável para ações de "Adicionar".
 *
 * @param {string} text - Texto exibido ao lado do ícone.
 * @param {object} props - Demais propriedades do botão (ex: onClick, disabled, etc).
 *
 * @returns {JSX.Element} Botão estilizado com ícone de adicionar (Material Icons).
 */
export function ButtonAdd({ text, ...props }) {
   return (
      <button 
         className="flex flex-row items-center px-2 gap-1 text-xs bg-cyan-600 hover:bg-cyan-700 transition-all h-8 rounded-md text-white"  
         {...props}
      >
         <span className="material-icons-outlined !text-xl !text-white !text-start">
            add_circle
         </span>

         <p>{text}</p>
      </button>
   );
}
