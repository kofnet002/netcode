import { NextRequest, NextResponse } from "next/server";

const fetchNotes = async () => {
  const res = await fetch("http://localhost:8000/api/codes/");
  const data = await res.json();
  return data;
}


  export async function GET(request: NextRequest) {
    const data = await fetchNotes();
    return NextResponse.json(data);
  }