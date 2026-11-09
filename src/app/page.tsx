"use client";

import { SubmitEvent, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

interface EditorForm {
  text: string;
};

export default function TextEditor() {
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  // isi text editor dikelola react-hook-form
  const { register, control, setValue, getValues } = useForm<EditorForm>({
    defaultValues: { text: "" },
  });

  // pantau isi textarea pakai useWatch
  const text = useWatch({ control, name: "text" });

  // hitung jumlah word langsung dari hasil useWatch
  const wordCount = text.trim() === "" ? 0 : text.trim().split(' ').length;

  const handleReplace = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const from = fromRef.current?.value ?? "";
    const to = toRef.current?.value ?? "";
    if (from === "") return;

    // pecah text jadi array, spasi/enter tetap disimpan biar format nggak berubah
    const words = getValues("text").trim().split(" ");

    // ganti setiap word yang sama dengan "from" pakai splice
    for (let i = 0; i < words.length; i++) {
      if (words[i] === from) {
        words.splice(i, 1, to);
      }
    }

    setValue("text", words.join(""));
  };

  return (
    <div className="px-8 py-10">
      <h1 className="font-semibold text-2xl mb-3">Simple Text Editor</h1>

      <form
        onSubmit={handleReplace}
        className="p-2 bg-gray-100 border border-gray-300 rounded-lg"
      >
        <h1 className="font-semibold mb-1 text-lg">Replace</h1>
        <div className="grid grid-cols-[4fr_1fr] gap-2">
          <div className="flex gap-2">
            <input
              ref={fromRef}
              type="text"
              className="input w-full"
              placeholder="From"
              onChange={(e) => (e.target.value = e.target.value.replace(/\s/g, ""))}
            />
            <input
              ref={toRef}
              type="text"
              className="input w-full"
              placeholder="To"
              onChange={(e) => (e.target.value = e.target.value.replace(/\s/g, ""))}
            />
          </div>
          <button
            type="submit"
            className="btn text-white bg-black rounded-lg hover:opacity-95"
          >
            Replace
          </button>
        </div>
      </form>

      <textarea
        {...register("text")}
        className="textarea w-full h-72 mt-3 rounded-lg border-gray-300"
        placeholder="Tulis sesuatu..."
      ></textarea>

      <div className="mt-3 w-full rounded-lg p-2 text-sm border border-gray-300 bg-gray-50 whitespace-pre-wrap min-h-9">
        {text}
      </div>
      <div className="mt-1 w-full rounded-lg p-2 text-sm border border-gray-300 bg-gray-50">
        Word : {wordCount}
      </div>
    </div>
  );
}
