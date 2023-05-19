import { NextResponse, NextRequest } from "next/server";


const fetchCodes = async () => {
  const response = await fetch("http://localhost:3000/api/codes");
  const data = await response.json();
  return data;
};

export async function GET(request: NextRequest){
    const {searchParams} = new URL (request.url);
    const notes = await fetchCodes();
    console.log(searchParams);
    const query: any = searchParams.get('query');
    const filteredNotes = notes.filter((note: any) => {
        return (
            note.topic.toLowerCase().includes(query.toLowerCase()),
            note.code.toLowerCase().includes(query.toLowerCase()),
            note.author.toLowerCase().includes(query.toLowerCase()),
            note.url.toLowerCase().includes(query.toLowerCase()) 
        )
    });
    console.log(filteredNotes)
    return NextResponse.json(filteredNotes)
}