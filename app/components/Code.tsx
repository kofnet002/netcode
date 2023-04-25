"use client";
import { ICode } from "@/types/codes";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteCode, editCode } from "@/api";

interface CodeProps {
  code: ICode;
}

const Code: React.FC<CodeProps> = ({ code }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [codeToEdit, setCodeToEdit] = useState<string>(code.text);
  const router = useRouter();

  const handleDeleteCode = async (id: string) => {
    await deleteCode(id)
    setOpenModalDelete(!openModalDelete)
    router.refresh();
  }

  const handleSubmitUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editCode({
      id: code.id,
      text: codeToEdit,
    });
    setOpenModalEdit(!openModalEdit);
    router.refresh(); // refresh the page to update the UI
  };

  return (
    <tr key={code.id}>
      <td className="w-full">{code.text}</td>
      <td className="flex gap-5 items-center">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          size={20}
          className="cursor-pointer hover:text-green-600"
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitUpdate}>
            <h3 className="font-bold text-lg text-center">Update code</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={codeToEdit}
                onChange={(e) => setCodeToEdit(e.target.value)}
              />
            </div>
            <button type="submit" className="btn mt-3 flex items-center justify-center">
              Update
            </button>
          </form>
        </Modal>

        <FiTrash2 onClick={() => setOpenModalDelete(!openModalDelete)} size={20} className="cursor-pointer hover:text-red-600" />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg text-center mt-3">
            Are you sure, you want to delete <br/>
            "{codeToEdit}" ?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteCode(code.id)} className="btn text-center">Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Code;
