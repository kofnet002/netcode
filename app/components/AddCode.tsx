"use client";


import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddCode = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data: session } = useSession()

  const [note, setNote] = useState({
    id: "",
    topic: "",
    code: "",
    url: "",
    author: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      fetch("http://localhost:8000/api/codes/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf8",
          Authorization: `Bearer ${session?.user.access}`,
        },
        body: JSON.stringify({
          id: null,
          topic: note.topic,
          code: note.code,
          url: note.url,
          author: note.author,
          created: null,
        })
      })

      router.refresh(); // refresh the page to update the UI

      setNote({
        id: "",
        topic: "",
        code: "",
        url: "",
        author: "",
      });
      setModalOpen(false)
    } catch (error) {
      console.log("Something went wrong", error);
    }


  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="btn btn-primary w-full"
      >
        <AiOutlinePlus className="mr-1" size={18} /> Add code
      </button>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max"></div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">Add new note</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title / topic ..."
              className="input input-bordered w-full"
              name="topic"
              value={note.topic}
              onChange={handleChange}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Note / Code..."
              name="code"
              value={note.code}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              placeholder="URL (optional)"
              className="input input-bordered w-full"
              name="url"
              value={note.url}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Author (optional)"
              className="input input-bordered w-full"
              name="author"
              value={note.author}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn mt-3">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCode;
