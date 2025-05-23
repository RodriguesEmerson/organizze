/**
 * Botão reutilizável para ações de "Salvar" com ícone do Material Icons.
 * 
 * Pode receber conteúdo personalizado através do `children`, substituindo o layout padrão.
 *
 * @param {string} text - Texto a ser exibido no botão (usado se `children` não for fornecido).
 * @param {React.ReactNode} children - Conteúdo personalizado opcional. Substitui o ícone e texto padrão.
 * @param {object} props - Demais propriedades padrão de um botão (ex: onClick, disabled, title, etc).
 *
 * @returns {JSX.Element} Botão estilizado com texto e ícone de salvar.
 */
export function ButtonSave({ text, children, ...props }) {
   return ( 
      <button type="button"
         className="flex items-center justify-center min-w-[90px] w-full text-sm gap-1 px-2 h-8 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-all"
         {...props}
      >
         {children 
            ? children 
            :  <>
                  <span>{text}</span>
                  <span className="material-icons-outlined !text-sm !text-start">playlist_add_check_circle</span>
               </>
         }
      </button>
   )
}
