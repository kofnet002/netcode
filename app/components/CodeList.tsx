import { FC } from "react";
import { ICode } from "@/types/codes";
import Code from "./Code";
import Image from "next/image";

interface CodeListProps {
  codes: ICode[];
}

const CodeList: FC<CodeListProps> = ({ codes }) => {
  console.log("codes", codes.length);
  return (
    <div className="overflow-x-auto">
      {codes.length ? (
        <div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tasks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code) => (
                <Code code={code} />
              ))}
            </tbody>
          </table>
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
            priority
            width={200}
            height={800}
            alt="sad emoji"
          />
          <p className="font-bold text-2xl">You don't have any codes yet!</p>
        </div>
      )}
    </div>
  );
};

export default CodeList;
