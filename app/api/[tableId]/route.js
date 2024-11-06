import { NextResponse } from "next/server";

export function GET({ params }){
   const { tableId } = params;
   console.log(tableId)
}