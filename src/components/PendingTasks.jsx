import { useMemo, useCallback } from "react";
import { useSnapshot } from "valtio";
import Task from "./Task";
import { store } from "../utils";

const PendingTasks = ({ list, onEdit }) => {
  const snap = useSnapshot(store);
  const grouped = useMemo(() => {
    return snap.list
      .filter(item => item.status)
      .reduce((acc, item) => {
        acc[item.priority].push(item);
        return acc;
      }, { 1: [], 2: [], 3: [], 4: [] });
  }, [snap.list]);

  const handleToggle = useCallback((id) => {
    store.list = snap.list.map((item) => item.id === id ? { ...item, status: !item.status } : item);
  }, [snap.list]);

  const handleDeletion = useCallback((id) => {
    store.list = snap.list.filter(item => item.id !== id);
  }, [snap.list]);

  const handleEdit = useCallback((id) => {
    const itemToEdit = list.find(item => item.id === id);
    const res = onEdit(itemToEdit.title, itemToEdit.remTime, itemToEdit.importance, itemToEdit.urgency, itemToEdit.priority, itemToEdit.desc, itemToEdit.color);
    if (res)
      store.list = snap.list.filter(item => item.id !== id);
  }, [snap.list, list, onEdit]);

  return (
    <div>
      <h3>
        PENDING TASKS:
      </h3>
      <br />
      <h3>
        PRIORITY LEVEL 1:
      </h3>
      {grouped[1].map(item => <Task key={item.id} color={item.color} desc={item.desc} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)}
      <h3>
        PRIORITY LEVEL 2:
      </h3>
      {grouped[2].map(item => <Task key={item.id} color={item.color} desc={item.desc} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)}
      <h3>
        PRIORITY LEVEL 3:
      </h3>
      {grouped[3].map(item => <Task key={item.id} color={item.color} desc={item.desc} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)}
      <h3>
        PRIORITY LEVEL 4:
      </h3>
      {grouped[4].map(item => <Task key={item.id} color={item.color} desc={item.desc} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)}
    </div>
  );
}

export default PendingTasks;