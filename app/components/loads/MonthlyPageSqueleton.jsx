import { TableSkeleton } from "./TableSkeleton";


export function MonthlyPageSqueleton() {
   return (
      <div>
         <div className="flex flex-row gap-2 mb-2 justify-between">
            <SumaryBoxSkeleton text={'Despesas totais'} color={' text-red-800'} />
            <SumaryBoxSkeleton text={'Receitas totais'} color={' text-green-800'} />
            <SumaryBoxSkeleton text={'Saldo'} color={' text-blue-800'} />
            <SumaryBoxSkeleton />
         </div>

         <div className="flex w-full flex-row mb-2 gap-2">
            <BarGraphicYSkeleton />
            <BarGraphicYSkeleton />
            <ChartDoughnutSkeleton />
         </div>

         <div className="flex items-center justify-center border-b border-b-gray-400 my-3 mr-2">
            <h2 className="text-sm font-extrabold text-gray-500 mt-2">Tabelas</h2>
         </div>

         <div className="flex w-full flex-row mb-2 mt-2 gap-2">
            <TableSkeleton />
            <TableSkeleton />
         </div>
      </div>
   )
}

function SumaryBoxSkeleton({ text, color }) {
   return (
      <div className="relative z-[5] pl-1 flex items-center justify-center  h-28 shadow-md w-72 bg-white flex-1 rounded-md">
         {text &&
            <>
               <div className="w-9 mr-2">
                  <img src="/icons/expenses.png" alt="expenses-icon" />
               </div>
               <div className="h-[70%] flex flex-col items-start justify-center">
                  <span className="h-7 w-32 rounded-md animate-pulse mb-1 bg-gray-300"></span>
                  <p className="text-3xl font-extrabold text-gray-600">
                  </p>
                  <h4 className={`text-sm text-center -mt-1 ${color}`}>{text}</h4>
               </div>
            </>
         }
         {!text &&
            <div className="flex flex-col g-2">
               <span className="h-8 w-56 rounded-md animate-pulse mb-1 bg-gray-300"></span>
               <span className="h-8 w-32 rounded-md animate-pulse mb-1 bg-gray-300"></span>
            </div>

         }
      </div>
   )
}

function BarGraphicYSkeleton() {
   return (
      <div className="h-[300px] flex flex-row flex-1 items-center justify-center p-1 pr-2 bg-white shadow-md rounded-md">
         <div className="flex flex-row gap-2 items-end mr-5 border-b border-b-gray-300">
            <span className="h-20 w-16 rounded-md animate-pulse mb-1 bg-gray-300"></span>
            <span className="h-36 w-16 rounded-md animate-pulse mb-1 bg-gray-300"></span>
            <span className="h-14 w-16 rounded-md animate-pulse mb-1 bg-gray-300"></span>
            <span className="h-40 w-16 rounded-md animate-pulse mb-1 bg-gray-300"></span>
            <span className="h-32 w-16 rounded-md animate-pulse mb-1 bg-gray-300"></span>
         </div>
      </div>
   )
}

function ChartDoughnutSkeleton({size = 20}) {
   return (
      <div className="h-[300px] w-[230px] flex flex-row items-center justify-center p-1 pr-2 bg-white shadow-md rounded-md">
         <div className="flex items-center justify-center h-40 w-40 rounded-full animate-pulse bg-gray-300">
            <div className={`h-${size} w-${size} rounded-full bg-white`}></div>
         </div>
      </div>
   )
}
