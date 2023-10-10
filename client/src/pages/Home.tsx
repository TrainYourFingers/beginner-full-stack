import { Add, Edit } from "../assets";
import React, { useEffect, useState } from "react";
import useApi from "../hooks/UseApi";
import EditModal from "../components/EditModal";
import ConfirmDelete from "../components/ConfirmDelete";

function Home() {
  const { getData, postData, deleteData, editData } = useApi();
  const [todo, setTodo] = useState<[]>([]);
  const [description, setDescription] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>();
  const [prevDesc, setPrevDesc] = useState<string>("");

  useEffect(() => {
    getData("/todos").then((res) => {
      setTodo(res.data);
    });
  }, []);

  const handleSubmit = () => {
    if (description === "" || !description) return;
    postData("/todos", { description, completion: false }).then((res) => {
      console.log(res);
    });
    window.location.reload();
  };
  const handleDelete = (id: number) => {
    deleteData(`/todos/${id}`).then((res) => {
      console.log(res);
    });

    window.location.reload();
  };
  const handleEdit = (id: number) => {
    editData(`/todos/${id}`, { description, completion: false }).then((res) => {
      console.log(res);
    });
    window.location.reload();
  };

  const updateCompletion = (
    id: number,
    completion: boolean,
    description: string
  ) => {
    editData(`/todos/${id}`, {
      description,
      completion: !completion,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <main className="h-screen w-screen bg-gray-200 p-10 relative">
      <section className="max-w-[50%] mx-auto p-5">
        <h1 className="text-center font-extrabold text-2xl">Todo App</h1>
      </section>
      <section className="bg-white h-16 max-w-[50%] mx-auto rounded-2xl shadow-xl p-5 mb-5 flex items-center">
        <input
          type="text"
          className="border-b-2 border-gray-200 px-2 w-2/3 outline-none transition-all duration-300 focus:border-blue-400 text-xl"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="rounded-full px-5" onClick={handleSubmit}>
          <Add className="text-green-500 hover:text-green-600 duration-300 w-12 h-fit" />
        </button>
        <section className="flex justify-between flex-1">
          <article className="flex flex-col">
            <input
              type="radio"
              name="Checked"
              id="all"
              className="hover:cursor-pointer"
              defaultChecked
              onChange={() => {
                getData("/todos").then((res) => {
                  setTodo(res.data);
                });
              }}
            />
            <label
              htmlFor="all"
              className="text-gray-600 text-sm hover:cursor-pointer"
            >
              All
            </label>
          </article>
          <article className="flex flex-col">
            <input
              type="radio"
              name="Checked"
              id="checked"
              className="hover:cursor-pointer"
              onChange={() => {
                getData("/todos?completion=true").then((res) => {
                  setTodo(res.data);
                });
              }}
            />
            <label
              htmlFor="checked"
              className="text-gray-600 text-sm hover:cursor-pointer"
            >
              Finished
            </label>
          </article>
          <article className="flex flex-col">
            <input
              type="radio"
              name="Checked"
              id="unchecked"
              className="hover:cursor-pointer"
              onChange={() => {
                getData("/todos?completion=false").then((res) => {
                  setTodo(res.data);
                });
              }}
            />
            <label
              htmlFor="unchecked"
              className="text-gray-600 text-sm hover:cursor-pointer"
            >
              Unfinished
            </label>
          </article>
        </section>
      </section>
      <section className="bg-white min-h-[50%] max-w-[50%] mx-auto rounded-2xl shadow-xl p-5">
        <table className="w-full">
          <thead className="border-b text-lg">
            <tr style={{ padding: 5 }}>
              <th className="w-1/5 py-2">Done</th>
              <th className="w-4/5 text-left">Title</th>
              <th className="w-1/5 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="h-full text-lg">
            {todo.map((item: any) => (
              <tr key={item.todo_id} className="border-b">
                <td className="text-center py-2">
                  <input
                    type="checkbox"
                    name={item.todo_id}
                    id={item.todo_id}
                    defaultChecked={item.completion}
                    className="hover:cursor-pointer h-4 w-4"
                    onChange={() => {
                      updateCompletion(
                        item.todo_id,
                        item.completion,
                        item.description
                      );
                      window.location.reload();
                    }}
                  />
                </td>
                <td>{item.description}</td>
                <td className="flex mt-1.5">
                  <button
                    title="Edit"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentId(item.todo_id);
                      setPrevDesc(item.description);
                    }}
                    disabled={item.completion}
                  >
                    <Edit
                      className={`w-8 h-fit ${
                        item.completion
                          ? "text-blue-300"
                          : "text-blue-500 hover:text-blue-600"
                      }`}
                    />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => {
                      setShowConfirm(true);
                      setCurrentId(item.todo_id);
                    }}
                  >
                    <Add className="w-8 h-fit text-red-500 hover:text-red-600 rotate-45" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {showConfirm && (
        <ConfirmDelete
          setShowConfirm={setShowConfirm}
          handleDelete={handleDelete}
          id={currentId}
        />
      )}
      {showModal && (
        <EditModal
          prevDescription={prevDesc}
          setShowModal={setShowModal}
          setDescription={setDescription}
          handleEdit={handleEdit}
          id={currentId}
        />
      )}
    </main>
  );
}

export default Home;
