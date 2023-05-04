import AddCode from "./components/AddCode";
import CodeList from "./components/CodeList";
import { getNotes } from "@/api";
import Navbar from "./components/Navbar";

const HomePage = async () => {
  const codes = await getNotes();
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto mt-4">
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold my-3">My Notes</h1>
          <AddCode />
        </div>
        <CodeList codes={codes} />
      </main>
    </>
  );
};

export default HomePage;
