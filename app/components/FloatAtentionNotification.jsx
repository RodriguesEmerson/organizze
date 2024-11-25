export function FloatAtentionNotification({ releaseMensage }){
   return(
      <div className="absolute bg-white p-2 rounded-md w-40 transition-all">
         <span className="material-icons !text-red-900 -ml-1 -mt-1">{releaseMensage.type}</span>
         <p className="text-sm -mt-1">
            {releaseMensage.noti}
         </p>
         <div className="w-5 absolute -bottom-[7px] -left-[7px] rotate-45">
            <img src="/icons/arrowNoti.png" alt="" />
         </div>
      </div>
   )
}