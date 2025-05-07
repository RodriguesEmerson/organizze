export 
function TableSkeleton() {
   return (
      <div className="h-fit flex flex-col flex-1 items-center justify-center p-1 pr-2 bg-white shadow-md rounded-md">
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-40 rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-full rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-full rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-full rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-full rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
         <div className="flex w-full flex-col gap-2 items-end border-b border-b-gray-300">
            <span className="block h-7 w-full rounded-md animate-pulse my-1 bg-gray-300"></span>
         </div>
      </div>
   )
}