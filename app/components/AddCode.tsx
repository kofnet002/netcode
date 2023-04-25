"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addCode } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const metadata = {
  title: "Add code",
};

const AddCode = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [noInput, setNoInput] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter()

  const handleRequired = (state: boolean) => {
    if (value == "") {
      setNoInput(state);
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    handleRequired(true);
    // close the modal after 2 seconds
    setTimeout(() => {
      handleRequired(false);
    }, 2000);

    await addCode({
      id: uuidv4(),
      text: value,
    });

    setValue("");
    setModalOpen(!modalOpen);
    router.refresh() // refresh the page to update the UI
  };
  return (
    <div>
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="btn btn-primary w-full"
      >
        Add code <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max"></div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {noInput && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! field is required</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
