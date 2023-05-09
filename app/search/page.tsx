"use client";

import { searchNotes } from "@/api";
import { useSearchParams } from "next/navigation";
import Code from "../components/Code";
import Image from "next/image";

const SearchPage = async () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const codes = await searchNotes(encodedSearchQuery);

  return (
    <div className="mt-20">
      <div className="overflow-x-auto">
        {codes.length ? (
          <div className="flex flex-wrap items-center justify-center gap-5">
            {codes.map((code) => (
              <Code key={code.id} code={code} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "70vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/crying-emoji.gif"
              width={200}
              height={800}
              alt="sad emoji"
              priority
            />
            <p className="font-bold text-2xl">No matching query found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
