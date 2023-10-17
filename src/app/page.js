import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { prisma } from "@/db";
import TodoItems from "@/components/TodoItems";
import { BadgePlus } from "lucide-react";

async function getTodos() {
  "use server";
  return await prisma.todo.findMany();
}

async function editTodo(id, title) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { title },
  });
}

// async function editTodo(id, title) {
//   "use server";
//   try {
//     await prisma.todo.update({
//       where: { id },
//       data: { title },
//     });

//     // Call getTodos after a successful edit
//     const todos = await getTodos();
//     console.log("Updated todos:", todos);
//   } catch (error) {
//     console.error("Error editing todo:", error);
//   }
// }

async function deleteTodo(id) {
  "use server";
  await prisma.todo.delete({
    where: { id },
  });
}

async function toggleTodo(id, complete) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}

// async function deleteTodo(id) {
//   "use server";
//   try {
//     await prisma.todo.delete({
//       where: { id },
//     });

//     // Call getTodos after a successful delete
//     const todos = await getTodos();
//     console.log("Updated todos:", todos);
//   } catch (error) {
//     console.error("Error deleting todo:", error);
//   }
// }

// async function toggleTodo(id, complete) {
//   "use server";
//   try {
//     await prisma.todo.update({
//       where: { id },
//       data: { complete },
//     });

//     // Call getTodos after a successful toggle
//     const todos = await getTodos();
//     console.log("Updated todos:", todos);
//   } catch (error) {
//     console.error("Error toggling todo:", error);
//   }
// }

export default async function Home() {
  const todos = await getTodos();
  // await prisma.todo.create({
  //   data: {
  //     title: "New Todo",
  //     complete: false,
  //   },
  // });

  return (
    <div className={styles.main}>
      <div className="bg-slate-100 p-2 rounded-sm inset-0 outline-none shadow-sm">
        <header className="flex justify-between items-center gap-28 pb-2 border-b">
          <h1 className="text-2xl text-blue-700">To Do List</h1>
          <Link
            // className="border-slate-100 border rounded-sm px-4 py-2 focus-within:bg-slate-200 outline-none"
            href="/about"
          >
            <BadgePlus color="#d35400" />
          </Link>
        </header>
        <ul className="pl-4">
          {todos.map((todo) => (
            <TodoItems
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              getTodos={getTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
