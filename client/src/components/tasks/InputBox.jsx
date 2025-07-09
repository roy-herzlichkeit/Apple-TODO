import { useState, useEffect, useCallback, useMemo } from "react";
import { useSnapshot } from "valtio";
import { v4 as uuidv4 } from "uuid";
import { store, getLocalDateTime, getPriority, debounce } from "../../utils";
import ColorPicker from "../ui/ColorPicker";

const InputBox = ({ initialText, initialRemTime, initialImportance, initialUrgency, initialPriority, initialDesc, initialColor, onAfterSubmit }) => {
  const snap = useSnapshot(store, { sync: true });
  
  const controlStyle = useMemo(() => ({
    backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
    color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
    borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
  }), [snap.dark]);
  
  const [text, setText] = useState(initialText || "");
  const [dateValue, setDateValue] = useState(() => {
    const dt = initialRemTime || getLocalDateTime(new Date());
    return dt.split('T')[0];
  });
  const [timeValue, setTimeValue] = useState(() => {
    const dt = initialRemTime || getLocalDateTime(new Date());
    return dt.split('T')[1];
  });
  const [importance, setImportance] = useState(initialImportance || 1);
  const [urgency, setUrgency] = useState(initialUrgency || 1);
  const [priority, setPriority] = useState(initialPriority || 4);
  const [color, setColor] = useState(initialColor || "#2a2727");
  
  const todayMinDate = useMemo(() => getLocalDateTime(new Date()).split('T')[0], []);
  const minTimeForNow = useMemo(() => getLocalDateTime(new Date(Date.now() + 60000)).split('T')[1], []);

  const debouncedSetText = useMemo(() => debounce(setText, 100), []);

  const resetForm = useCallback(() => {
    setText("");
    const now = getLocalDateTime(new Date());
    setDateValue(now.split('T')[0]);
    setTimeValue(now.split('T')[1]);
    setImportance(1);
    setUrgency(1);
    setColor("#2a2727");
  }, []);

  useEffect(() => {
    setText(initialText || "");
  }, [initialText]);

  useEffect(() => {
    if (initialRemTime) {
      const [d, t] = initialRemTime.split('T');
      setDateValue(d);
      setTimeValue(t);
    }
  }, [initialRemTime]);

  useEffect(() => {
    setImportance(initialImportance || 1);
  }, [initialImportance]);

  useEffect(() => {
    setUrgency(initialUrgency || 1);
  }, [initialUrgency]);

  useEffect(() => {
    setPriority(initialPriority || 4);
  }, [initialPriority]);

  useEffect(() => {
    setColor(initialColor || "#2a2727");
  }, [initialColor]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const title = text.trim();
    const id = uuidv4();
    const calculatedPriority = getPriority(importance, urgency);
    const remTimeCombined = `${dateValue}T${timeValue}`;
    
    store.list = [...snap.list, { 
      id, 
      title, 
      status: true, 
      remTime: remTimeCombined, 
      importance, 
      urgency, 
      priority: calculatedPriority, 
      color 
    }];
    
    resetForm();
    onAfterSubmit?.();
  }, [text, dateValue, timeValue, importance, urgency, color, snap.list, resetForm, onAfterSubmit]);

  const handleTextChange = useCallback((e) => {
    debouncedSetText(e.target.value);
  }, [debouncedSetText]);

  const handleDateChange = useCallback((e) => {
    setDateValue(e.target.value);
  }, []);

  const handleTimeChange = useCallback((e) => {
    setTimeValue(e.target.value);
  }, []);

  const handleImportanceChange = useCallback((e) => {
    setImportance(Number(e.target.value));
  }, []);

  const handleUrgencyChange = useCallback((e) => {
    setUrgency(Number(e.target.value));
  }, []);

  return (
    <section id="input-box" className="flex font-i text-shadow-gray-950 text-2xl w-full items-center p-4 justify-center">
      <form onSubmit={handleSubmit} className="p-10"
        style={{
          backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
          color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
        }}>
        <label htmlFor="todo-text-input" className="text-5xl">Add Task</label>
        <input
          defaultValue={text}
          type="text"
          name="todo"
          id="todo-text-input"
          placeholder="enter your task..."
          onChange={handleTextChange}
          className="border-2 p-2 my-4 w-full"
          style={controlStyle}
          autoComplete="off"
        />
        <label htmlFor="todo-date">Deadline:</label>
        <div className="flex flex-col space-y-2 xs:flex-row xs:space-x-2 xs: justify-between">
          <input
            value={dateValue}
            type="date"
            name="date"
            id="todo-date"
            min={todayMinDate}
            onChange={handleDateChange}
            className="border-2 p-2 mt-4 mb-2"
            style={controlStyle}
          />
          <input
            value={timeValue}
            type="time"
            name="time"
            id="todo-time"
            min={dateValue === todayMinDate ? minTimeForNow : undefined}
            aria-label="Deadline time"
            onChange={handleTimeChange}
            className="border-2 p-2 my-2"
            style={controlStyle}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="importance">Importance:</label>
          <select
            value={importance}
            name="importance"
            id="importance"
            onChange={handleImportanceChange}
            className="border-2 p-2 my-2"
            style={controlStyle}
          >
            <option value={1}>Trivial</option>
            <option value={2}>Minor</option>
            <option value={3}>Moderate</option>
            <option value={4}>Major</option>
            <option value={5}>Critical</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="urgency">Urgency:</label>
          <select
            value={urgency}
            name="urgency"
            id="urgency"
            onChange={handleUrgencyChange}
            className="border-2 p-2 my-2"
            style={controlStyle}
          >
            <option value={1}>Whenever</option>
            <option value={2}>Soon</option>
            <option value={3}>Soon-ish</option>
            <option value={4}>ASAP</option>
            <option value={5}>Immediate</option>
          </select>
        </div>
        <ColorPicker
          name="color-tag"
          color={color}
          onChange={setColor}
        />
        <button type="submit" className="w-full p-4"
          style={controlStyle}
        >Submit</button>
      </form>
    </section>
  );
};

export default InputBox;