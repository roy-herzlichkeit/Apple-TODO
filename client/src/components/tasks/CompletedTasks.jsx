import { useCallback } from "react";
import { useSnapshot } from "valtio";
import Task from "./Task";
import { store } from "../../utils";

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
    const res = onEdit(itemToEdit.title, itemToEdit.remTime, itemToEdit.importance, itemToEdit.urgency, itemToEdit.priority, itemToEdit.color);
    if (res)
      store.list = snap.list.filter(item => item.id !== id);
  }, [snap.list, list, onEdit]);

  const completedItems = list.filter(item => !item.status);

  return (
    <div>
      {completedItems.length === 0 && (
        <div
          className="text-center p-4 italic"
          style={{ color: snap.dark ? 'var(--dark-color-1)' : '#2a2727' }}
        >
          No completed tasks
        </div>
      )}
      {
        completedItems
          .slice().sort((a, b) => new Date(a.remTime) - new Date(b.remTime))
          .map(item => (
            <Task
              key={item.id}
              title={item.title}
              remTime={item.remTime}
              color={item.color}
              handleDeletion={() => handleDeletion(item.id)}
              handleToggle={() => handleToggle(item.id)}
              handleEdit={() => handleEdit(item.id)}
            />
          ))
      }
    </div>
  );
}

export default CompletedTasks;