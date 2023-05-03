import AddCode from "./components/AddCode";
import CodeList from "./components/CodeList";
import { getAllCodes } from "./api/hello/codes/route";
import { ICode } from "@/types/codes";
import { getNotes } from "@/api";

const HomePage = async () => {

  const codes = await getNotes();
  // console.log("All codes", codes)
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Codes</h1>
        <AddCode />
      </div>
      <CodeList codes={codes} />
    </main>
  );
};

export default HomePage;
