import React from "react";
import Link from "next/link";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

async function createTodo(data) {
  "use server";
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }
  await prisma.todo.create({
    data: {
      title,
      complete: false,
    },
  });
  redirect("/");
}

export default function page() {
  return (
    <>
      <header className="flex justify-between items-center gap-28">
        <h1 className="text-2xl">Create To do List</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col ">
        <input
          type="text"
          name="title"
          className="border bg-transparent outline-none rounded px-2 py-1 focus-within:border-slate-200"
        />
        <div
          className="flex gap-5 mt-2 justify-end
        
        "
        >
          <Link
            href=".."
            className="border-slate-100 border rounded-sm px-3 py-2 focus-within:bg-slate-200 outline-none"
          >
            Cancle
          </Link>
          <button
            type="submit"
            className="border-slate-100 border rounded-sm px-3 py-2 focus-within:bg-slate-200 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
