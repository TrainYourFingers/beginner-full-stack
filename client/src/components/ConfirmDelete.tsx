import React from "react";
import Modal from "./common/Modal";
import { Cross } from "../assets";

function ConfirmDelete({ setShowConfirm, handleDelete, id }) {
  return (
    <Modal>
      <section className="bg-white h-max p-16 w-max rounded-lg relative duration-30 flex flex-col items-center justify-center">
        <Cross
          className="absolute top-6 right-6 w-10 h-fit hover:bg-gray-100 p-1 rounded-full duration-200 hover:cursor-pointer"
          onClick={() => setShowConfirm(false)}
        />
        <h1 className="text-2xl font-bold pb-8">Do you want to delete?</h1>
        <article className="flex gap-8">
          <button
            className="py-2 px-4 text-lg font-bold hover:text-blue-500 rounded-lg border-2 border-blue-500 hover:bg-white duration-200 bg-blue-500 text-white"
            onClick={() => setShowConfirm(false)}
          >
            Cancel
          </button>
          <button
            className="py-2 px-4 text-lg font-bold text-red-500 rounded-lg border-2 border-red-500 hover:text-white hover:bg-red-500 duration-200"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </article>
      </section>
    </Modal>
  );
}

export default ConfirmDelete;
