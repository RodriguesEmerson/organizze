

export function PageModel({ title, children }){
   return(
      <section
         className="relative ml-44 pl-5 pt-3 pr-3"
         style={{ height: "calc(100% - 48px)" }}
      >
         <div className="sticky top-12 z-[10]  border-t-gray-300 h-8 bg-gray-900 text-white -mt-3  mb-2 text-center leading-8 -ml-[200px]" style={{ width: '100vw' }}>
            <h2>{ title }</h2>
         </div>
         <div className="absolute top-0 -left-44 h-24 w-[100vw] bg-gray-900 -z-[1]"></div> 

         { children }

      </section>
   )
}