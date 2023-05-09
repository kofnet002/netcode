
import AddCode from "./components/AddCode";
import CodeList from "./components/CodeList";
import { getNotes } from "@/api";

const HomePage = async () => {
  
  const notes = await getNotes();

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
