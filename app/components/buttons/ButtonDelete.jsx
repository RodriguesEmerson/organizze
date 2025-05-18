/**
 * Botão reutilizável para ações de "Excluir" ou "Deletar".
 *
 * @param {string} text - Texto exibido ao lado do ícone (usado quando `children` não é fornecido).
 * @param {React.ReactNode} children - Conteúdo personalizado para o botão (substitui o conteúdo padrão se fornecido).
 * @param {object} props - Demais propriedades padrão de um botão (ex: onClick, disabled, etc).
 *
 * @returns {JSX.Element} Botão estilizado com ícone de lixeira (Material Icons), com ou sem conteúdo customizado.
 */
export function ButtonDelete({ text, children, ...props }) {
   return (
      <button 
         className="flex w-full flex-row items-center justify-center px-2 gap-1 text-xs transition-all h-8 rounded-md text-red-700 border border-red-700 hover:bg-red-50"  
         {...props}
      >
         {children 
            ? children 
            :  <>
                  <p>{text}</p>
                  <span className="material-icons-outlined text-[18px] !text-start">delete</span>
               </>
         }
      </button>
   );
}
