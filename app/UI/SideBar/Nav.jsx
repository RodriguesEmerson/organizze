import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
   
export function Nav({year}){
   const pathName = usePathname();
   const searchParams = useSearchParams();
   const yearURL = searchParams.get('year');

   const navLinks = [
      { ref: 'http://localhost:3000/dashboard/categories', text:'Gerenciar Categorias', icon: 'category', path: '/dashboard/categories'},
   ]

   return(
      <nav>
         <ul className='flex flex-col p-1 gap-[2px]'>
            {navLinks.map(link => (
               <li key={link.ref} className={` hover:bg-gray-200 transition-all duration-300 rounded-md
                  ${(pathName == link.path) && 'bg-gray-900 text-white hover:bg-gray-900 font-thin'}
               `}>
                  <Link href={link.ref} className='flex flex-row gap-1 pl-2 items-center h-8 text-xs'>
                  <span className='material-icons-outlined'>{link.icon}</span>
                     {link.text}
                  </Link>
               </li>
            ))}

            <li key={'yearlyDashboardLink'} className={` hover:bg-gray-200 transition-all duration-300 rounded-md
               ${(pathName == '/dashboard' && yearURL == year) && 'bg-gray-900 text-white hover:bg-gray-900 font-thin'}
            `}>
               <Link href={`/dashboard?year=${year}`} className='flex flex-row gap-1 pl-2 items-center h-8 text-xs'>
               <span className='material-icons-outlined'>leaderboard</span>
                  {`Ver relatório de ${year}`}
               </Link>
            </li>
         </ul>
      </nav>
   )
}