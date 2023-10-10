import React from "react";
import Modal from "./common/Modal";
import { Cross } from "../assets";

function Edit({
  setShowModal,
  setDescription,
  handleEdit,
  id,
  prevDescription,
}) {
  return (
    <Modal>
      <section className="bg-white h-max px-8 py-16 w-1/3 rounded-lg relative duration-30 flex flex-col justify-center items-center gap-8">
        <Cross
          className="absolute top-6 right-6 w-10 h-fit hover:bg-gray-100 p-1 rounded-full duration-200"
          onClick={() => setShowModal(false)}
        />
        <input
          type="text"
          className="border-2 px-4 py-2 mt-4 rounded-lg border-gray-200 w-full outline-none transition-all duration-300 focus:border-blue-400 text-xl"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={prevDescription}
          required
        />
        <button
          className="rounded-lg px-8 py-2 hover:bg-blue-400 bg-blue-500 text-white font-bold text-xl"
          onClick={() => handleEdit(id)}
        >
          Edit
        </button>
      </section>
    </Modal>
  );
}

export default Edit;
