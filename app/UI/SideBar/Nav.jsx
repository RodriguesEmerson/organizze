import Link from 'next/link';
import { usePathname } from 'next/navigation';


export function Nav(){
   const pathName = usePathname();

   const navLinks = [
      { ref: 'http://localhost:3000/dashboard/categories', text:'Gerenciar Categorias'}
   ]

   return(
      <nav>
         <ul>
            {navLinks.map(link => (
               <li key={link.ref} className={`h-7 text-xs hover:bg-gray-200 transition-all duration-300
                  ${pathName == '/dashboard/categories' && 'bg-gray-900 text-white hover:bg-gray-900'}
               `}>
                  <Link href={link.ref} className='h-full text-center leading-7 block border-b border-b-gray-300'>
                     {link.text}
                  </Link>
               </li>
            ))

            }
         </ul>
      </nav>
   )
}