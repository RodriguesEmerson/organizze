'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function UserBox() {
   const user = 'Emerson'
   const [showUserBox, setShowUseBox] = useState(false);
   return (
      <div className="relative bg-gray-900 cursor-pointer">
         <div className="flex flex-row items-center gap-1 p-1 px-2 rounded-md  hover:bg-gray-800 transition-all"
            onClick={()=> setShowUseBox(!showUserBox)}
         >
            <p>Olá, {user}.</p>
            <Image src={"/icons/user-1.png"} alt="user icon" width={35} height={35} />
         </div>
         {showUserBox &&
            <div className="absolute text-gray-700 rounded-md shadow-md w-full h-10 py-1">
               <Link href={"/"}>
                  <div className="flex items-center px-2 gap-2 mt-1 hover:bg-gray-200 transition-all">
                     <span className="material-icons !text-lg text-red-700">logout</span>
                     <span>Sair</span>
                  </div>
               </Link>
            </div>
         }
      </div>
   )
}