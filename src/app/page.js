import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { prisma } from "@/db";
import TodoItems from "@/components/TodoItems";
import { BadgePlus } from "lucide-react";

function getTodos() {
  return prisma.todo.findMany();
}

async function editTodo(id, title) {
  "use server";
  await prisma.todo.update({
    where: { id },
    data: { title },
  });
}

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
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
