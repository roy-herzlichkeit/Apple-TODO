import { useCallback, useMemo } from "react";
import { useSnapshot } from "valtio";
import Task from "./Task";
import { store, updateTask, deleteTask } from "../../utils";

const CompletedTasks = ({ list, onEdit }) => {
  const snap = useSnapshot(store, { sync: true });

  const handleToggle = useCallback(async (id) => {
    try {
      const task = snap.list.find(item => item.id === id);
      if (task) {
        await updateTask(id, { status: !task.status });
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }, [snap.list]);

  const handleDeletion = useCallback(async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, []);

  const handleEdit = useCallback(async (id) => {
    const itemToEdit = list.find(item => item.id === id);
    if (!itemToEdit) return;

    const res = onEdit(
      itemToEdit.title,
      itemToEdit.remTime,
      itemToEdit.importance,
      itemToEdit.urgency,
      itemToEdit.priority,
      itemToEdit.color
    );

    if (res) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task during edit:', error);
      }
    }
  }, [list, onEdit]);

  const completedItems = useMemo(() => {
    return list
      .filter(item => !item.status)
      .slice()
      .sort((a, b) => new Date(a.remTime) - new Date(b.remTime));
  }, [list]);

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

      {completedItems.map(item => (
        <Task
          key={item.id}
          title={item.title}
          remTime={item.remTime}
          color={item.color}
          handleDeletion={() => handleDeletion(item.id)}
          handleToggle={() => handleToggle(item.id)}
          handleEdit={() => handleEdit(item.id)}
        />
      ))}
    </div>
  );
};

export default CompletedTasks;