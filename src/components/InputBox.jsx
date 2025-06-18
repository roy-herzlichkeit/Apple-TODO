import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { store, getLocalDateTime } from "../utils";

const InputBox = ({ initialText, initialRemTime, onAfterSubmit }) => {
  const snap = useSnapshot(store);
  const [text, setText] = useState(initialText);
  const [remTime, setRemTime] = useState(() => getLocalDateTime(new Date(Date.now())));

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (initialRemTime) {
      setRemTime(initialRemTime);
    }
  }, [initialRemTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemTime(getLocalDateTime(new Date(Date.now())));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim())
      return;
    const title = text.trim();
    const id = uuidv4();
    store.list = [...snap.list, { id, title, status: true, remTime }];
    setText("");
    setRemTime(getLocalDateTime(new Date(Date.now())));
    if (onAfterSubmit) {
      onAfterSubmit();
    }
  };

  return (
    <>
      <section id="input-box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="todo">Task:</label>
          <br />
          <input value={text} type="text" name="todo" id="todo-text-input" placeholder="enter your task..." onChange={(e) => setText(e.target.value)} />
          <br />
          <label htmlFor="todo">Time:</label>
          <br />
          <input
            value={remTime}
            type="datetime-local"
            name="time"
            id="todo-text-endTime"
            min={getLocalDateTime(new Date(Date.now() + 60000))}
            onChange={(e) => setRemTime(e.target.value)}
            onInvalid={(e) => e.target.setCustomValidity("Please select a time at least one minute from now.")}
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default InputBox;
