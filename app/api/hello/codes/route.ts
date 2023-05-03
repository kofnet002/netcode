import { ICode } from "@/types/codes";
import { NextResponse } from "next/server";

const baseUrl = "http://localhost:8000/api/codes/"

export const getAllCodes = async() => {
    const res = await fetch(baseUrl, {cache:"no-cache"})
    const data = await res.json();
    return data;
}

export const addCode = async(data:ICode) =>{
    const res = await fetch(baseUrl, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body:JSON.stringify(data)
    })
    const _data = await res.json()
    return _data
}

export async function GET(request: Request) {
    const data = await getAllCodes();
  return NextResponse.json(data);
}