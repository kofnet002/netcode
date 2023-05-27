"use client";


import { ICode } from "@/types/codes";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
// import { deleteNote, updateNote } from "@/api";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { decodedToken } from "./Token";

interface CodeProps {
  code: ICode;
}

const Code: React.FC<CodeProps> = ({ code }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalView, setOpenModalView] = useState<boolean>(false);



  const [codeToEdit, setCodeToEdit] = useState({
    id: code.id,
    topic: code.topic,
    code: code.code,
    url: code.url,
    author: code.author,
  });

  const router = useRouter();
  const { data: session } = useSession()
  const dToken: any = decodedToken(session?.user.access)

  const handleDeleteCode = async (id: number) => {
    // await deleteNote(code.id);
    try {
      const res = await fetch(`http://localhost:8000/api/codes/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.access}`
        }
      })
      setOpenModalDelete(false)
      router.refresh();
      return res.json()
    } catch (error) {
      console.log("Something went wrong ", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const name = e.target.name;
    const value = e.target.value;
    setCodeToEdit({ ...codeToEdit, [name]: value });
  };

  const handleSubmitUpdate: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      if (session?.user?.access) {

        const res = await fetch(`http://localhost:8000/api/codes/${code.id}/`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${session?.user.access}`
          },
          body: JSON.stringify({
            user: dToken.user_id,
            id: null,
            topic: codeToEdit.topic,
            code: codeToEdit.code,
            url: codeToEdit.url,
            author: codeToEdit.author,
            created: null,
          })

        })

        setCodeToEdit({
          id: "",
          topic: "",
          code: "",
          url: "",
          author: "",
        });

        setOpenModalEdit(!openModalEdit);
        router.refresh(); // refresh the page to update the UI

        return await res.json()

        // await updateNote(code.id, {
        //   id: null,
        //   topic: codeToEdit.topic,
        //   code: codeToEdit.code,
        //   url: codeToEdit.url,
        //   author: codeToEdit.author,
        //   created: null,
        // });


      }
    } catch (error) {
      console.log("Something went wrong during update", error);
    }

  };
  return (
    <div className="card_ w-7 bg-base-100 shadow-xl">
      <Image
        src={`http://localhost:8000/${code.picture}`}
        width={200}
        height={800}
        alt="code"
        priority
      />
      <h3>{code.topic.substring(0, 20)}...</h3>
      <p className="description">{code.code.substring(0, 30)}...</p>
      <div className="focus-content">
        <p className="flex gap-3 justify-between">
          <span>{code.created}</span>
          <p className="flex gap-2 justify-end items-center">
            <FiEye className="cursor-pointer hover:text-green-600" size={20} />
            <FiEdit
              onClick={() => setOpenModalEdit(true)}
              size={20}
              className="cursor-pointer hover:text-green-600"
            />
            <FiTrash2
              onClick={() => setOpenModalDelete(!openModalDelete)}
              size={20}
              className="cursor-pointer hover:text-red-600"
            />
          </p>
        </p>
      </div>

      {/* ===================== EDIT MODAL =========================== */}

      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form onSubmit={handleSubmitUpdate}>
          <h3 className="font-bold text-lg mb-4 text-center">Update Note</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Title / topic ..."
              className="input input-bordered w-full"
              name="topic"
              defaultValue={code?.topic}
              onChange={handleChange}
            />
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Note / Code..."
              name="code"
              defaultValue={code.code}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              placeholder="URL (optional)"
              className="input input-bordered w-full"
              name="url"
              defaultValue={code.url}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Author (optional)"
              className="input input-bordered w-full"
              name="author"
              defaultValue={code.author}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn mt-3">
            Submit
          </button>
        </form>
      </Modal>

      {/* ===================== DELETE MODAL =========================== */}

      <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
        <h3 className="text-lg text-center mt-3">
          Are you sure, you want to delete <br />{" "}
          <span className="font-black"> "{codeToEdit.topic}" </span> ?
        </h3>
        <div className="modal-action">
          <button
            onClick={() => handleDeleteCode(code.id)}
            className="btn text-center"
          >
            Yes
          </button>
        </div>
      </Modal>

      {/* ===================== VIEW MODAL =========================== */}
    </div>

    /* <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card title!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div> */

    // <tr key={code.id}>
    //   <td className="w-full">{code.task}</td>
    //   <td className="flex gap-5 items-center">
    //     <FiEdit
    //       onClick={() => setOpenModalEdit(true)}
    //       size={20}
    //       className="cursor-pointer hover:text-green-600"
    //     />
    //     <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
    //       <form onSubmit={handleSubmitUpdate}>
    //         <h3 className="font-bold text-lg text-center">Update code</h3>
    //         <div className="modal-action">
    //           <input
    //             type="text"
    //             placeholder="Type here"
    //             className="input input-bordered w-full"
    //             value={codeToEdit}
    //             onChange={(e) => setCodeToEdit(e.target.value)}
    //           />
    //         </div>
    //         <button type="submit" className="btn mt-3 flex items-center justify-center">
    //           Update
    //         </button>
    //       </form>
    //     </Modal>

    //     <FiTrash2 onClick={() => setOpenModalDelete(!openModalDelete)} size={20} className="cursor-pointer hover:text-red-600" />
    //     <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
    //       <h3 className="text-lg text-center mt-3">
    //         Are you sure, you want to delete <br/>
    //         "{codeToEdit}" ?
    //       </h3>
    //       <div className="modal-action">
    //         <button onClick={() => handleDeleteCode(code.id)} className="btn text-center">Yes</button>
    //       </div>
    //     </Modal>
    //   </td>
    // </tr>
  );
};

export default Code;
