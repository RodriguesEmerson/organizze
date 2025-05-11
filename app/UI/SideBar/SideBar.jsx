'use client';  
import { usePathname } from 'next/navigation';
import { AvailableYears } from "./AvailableYears";
import { Spinner } from "@/app/components/loads/spinner";
import { UserBox } from './UserBox';
import { Nav } from './Nav';
import { useToastNotifications } from '@/app/zustand/useToastNotifications';
import { useSignout } from '@/app/hooks/auth/signout';
import { useAuthStatus } from '@/app/zustand/useAuthStatus';
import { useUtils } from '@/app/hooks/useUtils';
import { useGetAvailablesTables } from '@/app/hooks/entries/useGetAvailableTables';

export default function SideBar() {
   const pathName = usePathname()
   const isAuthenticated = useAuthStatus(state => state.isAuthenticated);
   if( pathName === '/signin' ) return;

   const { availableTables } = useGetAvailablesTables();
   const setNotifications = useToastNotifications(state => state.setNotifications);
   const setAuth = useAuthStatus(state => state.setAuth);
   const { gerarCUID } = useUtils();
   
   return (
      <section className={`fixed z-[12] bg-white rounded-md shadow-2xl left-0 top-12 transition-all text-sm border-t border-t-white w-[185px]`} style={{ height: 'calc(100% - 45px' }}>
         <UserBox />
         {!availableTables &&
            <Spinner />
         }
         {availableTables && 
            <>
               <AvailableYears availableTables={availableTables}/>
               <Nav />
            </>
         }
         <div className='absolute bottom-4 left-0 w-full'>
            <button className='flex flex-row justify-center items-center m-auto gap-1 text-red-700 bg-red-100 w-[90%] py-[2px] rounded-md hover:bg-red-200 transition-all'
               onClick={() => {useSignout(setAuth, setNotifications, gerarCUID)}}
            >
               <p>Sair</p>
               <span className='material-icons-outlined text-base'>logout</span>
            </button>
         </div>

      </section>
   )
}

