export function UserBoxSkeleton() {
   return (
      <div className="flex flex-row w-full items-center gap-1">
         <div className="h-10 w-10 rounded-full bg-gradient-to-tr bg-gray-500 animate-pulse">
         </div>
         <div className="flex flex-col gap-1">
            <span className="block w-24 h-4 bg-gray-500 animate-pulse rounded-sm"></span>
            <span className="block w-28 h-3 bg-gray-500 animate-pulse rounded-sm"></span>
         </div>
      </div>
   )
}