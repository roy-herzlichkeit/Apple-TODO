import { useState, useMemo, useCallback } from "react";
import { useSnapshot } from "valtio";
import Task from "./Task";
import { store } from "../utils";

const PendingTasks = ({ list, onEdit }) => {
  const snap = useSnapshot(store);
  const [filter, setFilter] = useState("all");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const grouped = useMemo(() => {
    return snap.list
      .filter(item => item.status)
      .reduce((acc, item) => {
        acc[item.priority].push(item);
        return acc;
      }, { 1: [], 2: [], 3: [], 4: [] });
  }, [snap.list]);
  const pendingItems = snap.list.filter(item => item.status);

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

  return (
    <div>
      <div className="flex justify-center mb-2">
        <button
          className="flex items-center gap-2 p-2 cursor-pointer"
          onClick={() => setShowFilterOptions(prev => !prev)}
          aria-expanded={showFilterOptions}
          aria-controls="filter-options"
        >
          <span className="text-[#2a2727] hidden lg:block text-xl">Filters</span>
          <img src="filter.svg" alt="Filter icon" />
        </button>
      </div>
      {showFilterOptions && (
        <div id="filter-options" className="flex gap-2 justify-center mb-4">
          <button
            className="flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setFilter("all")}
            aria-label="Filter All Tasks"
          >
            <img src="no-filter.svg" alt="All tasks icon" />
            <span className="text-[#2a2727] hidden lg:block text-xl">All Tasks</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setFilter(1)}
            aria-label="Filter Immediate Tasks"
          >
            <img src="rn.svg" alt="Immediate tasks icon" />
            <span className="text-[#2a2727] hidden lg:block text-xl">Immediate</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setFilter(2)}
            aria-label="Filter Scheduled Tasks"
          >
            <img src="schedule.svg" alt="Scheduled tasks icon" />
            <span className="text-[#2a2727] hidden lg:block text-xl">Schedule</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setFilter(3)}
            aria-label="Filter Delegate Tasks"
          >
            <img src="delegate.svg" alt="Delegate tasks icon" />
            <span className="text-[#2a2727] hidden lg:block text-xl">Delegate</span>
          </button>
          <button
            className="flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => setFilter(4)}
            aria-label="Filter Delete Tasks"
          >
            <img src="deletable.svg" alt="Delete tasks icon" />
            <span className="text-[#2a2727] hidden lg:block text-xl">Deleteable</span>
          </button>
        </div>
      )}
      {pendingItems.length === 0 && (
        <div
          className="text-center p-4 italic"
          style={{ color: snap.dark ? 'var(--dark-color-1)' : '#2a2727' }}
        >
          No pending tasks
        </div>
      )}
      {(filter === "all" || filter === 1) && (
        <>
          {grouped[1].slice().sort((a, b) => new Date(a.remTime) - new Date(b.remTime)).map(item => <Task key={item.id} color={item.color} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} imgGiven="done.svg" />)}
        </>
      )}
      {(filter === "all" || filter === 2) && (
        <>
          {grouped[2].slice().sort((a, b) => new Date(a.remTime) - new Date(b.remTime)).map(item => <Task key={item.id} color={item.color} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} imgGiven="done.svg" />)}
        </>
      )}
      {(filter === "all" || filter === 3) && (
        <>
          {grouped[3].slice().sort((a, b) => new Date(a.remTime) - new Date(b.remTime)).map(item => <Task key={item.id} color={item.color} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} imgGiven="done.svg" />)}
        </>
      )}
      {(filter === "all" || filter === 4) && (
        <>
          {grouped[4].slice().sort((a, b) => new Date(a.remTime) - new Date(b.remTime)).map(item => <Task key={item.id} color={item.color} title={item.title} priority={item.priority} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} imgGiven="done.svg" />)}
        </>
      )}
    </div>
  );
}

export default PendingTasks;