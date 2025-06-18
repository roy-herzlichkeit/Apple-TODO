import { useSnapshot } from "valtio";
import { store } from "../utils";
import { useState } from "react";

const InputBox = () => {
  const snap = useSnapshot(store);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim())
      return;
    const title = text.trim();
    const nextId = snap.list.length + 1;
    store.list = [...snap.list, { id: nextId, title, status: true }];
    setText("");
  };

  return (
    <>
      <section id="input-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo">Task:</label>
          <br />
          <input value={text} type="text" name="todo" id="todo-text-input" placeholder="enter your task..." onChange={(e) => setText(e.target.value)} />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default InputBox;
