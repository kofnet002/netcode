import { FC } from "react";
import { ICode } from "@/types/codes";
import Code from "./Code";
import Image from "next/image";

interface CodeListProps {
  codes: ICode[];
}

const CodeList: FC<CodeListProps> = ({ codes }) => {
  return (
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
          <p className="font-bold text-2xl">You don't have any codes yet!</p>
        </div>
      )}
    </div>
  );
};

export default CodeList;
