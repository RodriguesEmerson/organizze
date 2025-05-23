import { UserBoxSkeleton } from "@/app/components/loads/userBoxSkeleton";
import { useGetUserInfo } from "@/app/hooks/auth/useGetUserInfo"

export function UserBox() {
   const { userInfo } = useGetUserInfo();
   return (
      <section className="m-auto my-2 flex gap-1 py-2 px-1 flex-col justify-center items-center bg-gray-900 text-white rounded-md w-[95%]">
         {!userInfo &&
            <UserBoxSkeleton />
         }
         {userInfo && 
            <div className="flex flex-row w-full items-center justify-center gap-2">
               <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gray-900 to-cyan-600 overflow-hidden">
                  <img src={`${userInfo.image}`} alt="" />
               </div>
               <div className="text-xs">
                  <p className="">{userInfo.name}</p>
                  <p className="text-gray-400 text-[10px]">{userInfo.email}</p>
               </div>
            </div>
         }
      </section>
   )
}

