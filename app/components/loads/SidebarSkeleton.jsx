

export function SidebarSkeleton(){
   return(
      <div className="p-2 flex gap-2 flex-col">
         <div className="flex justify-between border-t border-t-gray-300 pt-1">
            <span className="block w-24 h-6 rounded-md bg-gray-300 animate-pulse"></span>
            <span className="block w-16 h-6 rounded-md  bg-gray-300 animate-pulse"></span>
         </div>
         <div className="pl-3">
            <ul className="flex flex-col gap-1 border-l border-l-gray-300 pl-2">
               <li><span className="block w-24 h-5 rounded-md bg-gray-300 animate-pulse"></span></li>
               <li><span className="block w-16 h-5 rounded-md bg-gray-300 animate-pulse"></span></li>
               <li><span className="block w-20 h-5 rounded-md bg-gray-300 animate-pulse"></span></li>
               <li><span className="block w-16 h-5 rounded-md bg-gray-300 animate-pulse"></span></li>
            </ul>
         </div>
         <div>
            <ul className="flex flex-col">
               <li className="border-t border-t-gray-300 py-1">
                  <span className="block w-full h-5 rounded-md bg-gray-300 animate-pulse"></span>
               </li>
               <li className="border-t border-t-gray-300 py-1">
                  <span className="block w-full h-5 rounded-md bg-gray-300 animate-pulse"></span>
               </li>
               <li className="border-t border-t-gray-300 py-1">
                  <span className="block w-full h-5 rounded-md bg-gray-300 animate-pulse"></span>
               </li>
            </ul>
         </div>
         
      </div>
   )
}