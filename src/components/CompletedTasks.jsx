import { useCallback } from "react";
import { useSnapshot } from "valtio";
import Task from "./Task";
import { store } from "../utils";

const CompletedTasks = ({ list, onEdit }) => {
  const snap = useSnapshot(store);

  const handleToggle = useCallback((id) => {
    store.list = snap.list.map((item) => item.id === id ? { ...item, status: !item.status } : item);
  }, [snap.list]);

  const handleDeletion = useCallback((id) => {
    store.list = snap.list.filter(item => item.id !== id);
  }, [snap.list]);

  const handleEdit = useCallback((id) => {
    const itemToEdit = list.find(item => item.id === id);
    const res = onEdit(itemToEdit.title, itemToEdit.remTime, itemToEdit.importance, itemToEdit.urgency, itemToEdit.priority);
    if (res)
      store.list = snap.list.filter(item => item.id !== id);
  }, [snap.list, list, onEdit]);

  return (
    <div>
      <h3>COMPLETED TASKS:</h3>
      {
        list.map(item => !item.status && <Task key={item.id} title={item.title} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)
      }
    </div>
  );
}

export default CompletedTasks;