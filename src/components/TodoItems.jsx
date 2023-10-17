"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BadgePlus, Pencil, Save, Square, Trash, XSquare } from "lucide-react";

const TodoItems = ({
  id,
  title,
  complete,
  toggleTodo,
  editTodo,
  deleteTodo,
  getTodos,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const router = useRouter();

  const openEditModal = () => {
    setIsEditing(true);
  };

  // const saveEdit = () => {
  //   setIsEditing(false);
  //   editTodo(id, editedTitle);
  //   router.refresh();
  // };
  const saveEdit = async () => {
    setIsEditing(false);
    try {
      await editTodo(id, editedTitle);
      router.refresh();
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      await getTodos();
    }
  };

  // const deleteHandler = () => {
  //   deleteTodo(id);
  //   router.refresh();
  // };

  const deleteHandler = async () => {
    try {
      await deleteTodo(id); // Wait for the delete operation to complete
      router.refresh(); // Refresh the page after a successful deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      await getTodos(); // Update the list of todos regardless of success or failure
    }
  };

  return (
    <li className="flex justify-between items-center mt-4">
      <div className="flex gap-1 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className={`cursor-pointer text-slate-400 peer-checked:line-through peer-checked:text-red-700`}
        >
          {title}
        </label>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <button className=" rounded-sm p-1" onClick={openEditModal}>
          <Pencil size={20} color="green" />
        </button>
        <button className=" rounded-sm p-1" onClick={deleteHandler}>
          <Trash size={20} color="#d63031" />
        </button>
      </div>

      {isEditing && (
        <div className=" fixed inset-0  backdrop-blur-md flex items-center justify-center z-50">
          <div className=" bg-white p-4 rounded shadow-lg">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border text-black bg-transparent outline-none rounded px-2 py-1 focus-within:border-slate-200"
            />
            <div className="flex gap-2 justify-end mt-2">
              <button onClick={saveEdit} className=" p-1 rounded bg-slate-400">
                <Save size={20} />
              </button>
              <button
                className=" p-1 rounded bg-red-2 bg-red-400 "
                onClick={() => setIsEditing(false)}
              >
                <XSquare size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItems;
