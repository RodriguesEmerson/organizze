import Image from "next/image";
import Link from "next/link";
import { UserBox } from "./UserBox";

export default function Header(){
 
   return(
      <section className="sticky top-0 z-30 bg-gray-900 h-12 flex items-center  justify-between px-3 text-white">
         <Link href="/">
            <Image src={"/images/logo.png"} alt="logo" width={200} height={33} placeholder="blur" blurDataURL="/images/logo.png"/>
         </Link>
        <UserBox />
      </section>
   ) 
}