import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { store } from "../utils";

const InputBox = ({ initialText, onAfterSubmit }) => {
  const snap = useSnapshot(store);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim())
      return;
    const title = text.trim();
    const id = uuidv4();
    store.list = [...snap.list, { id, title, status: true }];
    setText("");
    if (onAfterSubmit) onAfterSubmit();
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
