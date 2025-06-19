import { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { store, getLocalDateTime, getPriority } from "../utils";

const InputBox = ({ initialText, initialRemTime, initialImportance, initialUrgency, initialPriority, onAfterSubmit }) => {
  const snap = useSnapshot(store);
  const [text, setText] = useState(initialText);
  const [remTime, setRemTime] = useState(() => getLocalDateTime(new Date(Date.now())));
  const [importance, setImportance] = useState(initialImportance);
  const [urgency, setUrgency] = useState(initialUrgency);
  const [priority, setPriority] = useState(initialPriority);

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

  useEffect(() => {
    setImportance(initialImportance);
  }, [initialImportance]);

  useEffect(() => {
    setUrgency(initialUrgency);
  }, [initialUrgency]);

  useEffect(() => {
    setPriority(initialPriority);
  }, [initialPriority]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim())
      return;
    const title = text.trim();
    const id = uuidv4();
    const priority = getPriority(importance, urgency);
    store.list = [...snap.list, { id, title, status: true, remTime, importance, urgency, priority: priority }];
    setText("");
    setRemTime(getLocalDateTime(new Date(Date.now())));
    setImportance(1);
    setUrgency(1);
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
          <label htmlFor="importance">Importance:</label>
          <br />
          <input value={importance} type="number" name="importance" id="importance" onChange={(e) => setImportance(e.target.value)} />
          <br />
          <label htmlFor="urgency">Urgency:</label>
          <br />
          <input value={urgency} type="number" name="urgency" id="urgency" onChange={(e) => setUrgency(e.target.value)} />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}

export default InputBox;
