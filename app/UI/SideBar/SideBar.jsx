'use client';

import { useState } from "react";

export default function SideBar(){
   const [openSideBar, setOpenSideBar] = useState(false);
   return(
      <section className={`absolute shadow-lg left-0 top-10 transition-all ${!openSideBar ? "w-12" : "w-52"}`} style={{height: 'calc(100% - 40px'}}>
         <div className="absolute flex items-center justify-center -right-3 top-4 h-7 w-7 bg-white rounded-full border border-gray-gray-200 cursor-pointer transition-all hover:bg-gray-200"
            onClick={()=> setOpenSideBar(!openSideBar)}
         >
             <span className="material-icons transition-all">{!openSideBar ?" chevron_right" : "chevron_left"}</span>
         </div>
      </section>
   )
}