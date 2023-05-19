"use client"

import { ICode } from "@/types/codes";
import AddCode from "./components/AddCode";
import CodeList from "./components/CodeList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const HomePage = () => {
  const baseUrl = "http://localhost:8000/api/codes/";

  const { data: session } = useSession();

  const [notes, setNotes] = useState<ICode[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (session?.user?.access) {
        const res = await fetch(baseUrl, {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.access}`,
          },
        });

        if (res.status === 200) {
          const data = await res.json();
          setNotes(data);
        } else {
          console.log("Something went wrong, failed to retrieve notes");
        }
      }
    };

    fetchNotes();
  }, [session]);


  return (
    <div>
      <h1 className="text-2xl font-bold my-3 text-center">My Notes</h1>
      <AddCode />
      <div className="max-w-8xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-5"></div>
        <CodeList codes={notes} />
      </div>
    </div>
  );
};

export default HomePage;
