import { ICode } from "./types/codes"

  export const getNotes = async () => {
    const res = await fetch("http://localhost:8000/api/codes/",{cache:"no-store"})
    const data = await res.json()
    // console.log(data)
    return data
  }

  export const addNote = async (body:ICode) => {
    const res = await fetch("http://localhost:8000/api/codes/",{
      method: "POST",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf8"
      },
      body:JSON.stringify(body)
    })
    return await res.json()
  }

  export const updateNote = async (id: number, body: ICode) => {
    const res = await fetch(`http://localhost:8000/api/codes/${id}/`,{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(body)
      
    })
    return await res.json()
  }

  export const deleteNote = async (id: number) => {
     await fetch(`http://localhost:8000/api/codes/${id}/`,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      }
    })
  }