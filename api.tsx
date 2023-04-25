import { ICode } from "./types/codes";

const baseUrl = "http://localhost:8000";

export const getAllTodos = async (): Promise<ICode[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todos = await res.json();
  return todos;
};

export const addCode = async (code: ICode): Promise<ICode> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(code),
  });
  const newCode = await res.json();
  return newCode;
};

export const editCode = async (code: ICode): Promise<ICode> => {
  const res = await fetch(`${baseUrl}/tasks/${code.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(code),
  });
  const updateCode = await res.json();
  return updateCode;
};

export const deleteCode = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
