import { NextResponse } from "next/server";

export async function GET(request){
   
   try {
      const res = await fetch("http://localhost:3000/db/db.json", {
         method: "GET",
         cache: "no-store"
      });
      if(!res){
         throw new Error("Fanha ao buscar os dados!")
      }
      const data = await res.json();
      return NextResponse.json(data);
   } catch (error) {
      console.log('error')
   }

}