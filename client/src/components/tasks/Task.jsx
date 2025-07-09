import { memo, useMemo, useState, useEffect, useCallback } from "react";
import { useSnapshot } from "valtio";
import { calculateRemaining } from "../../utils";
import { store } from "../../utils";

const Task = memo(({ title, remTime, color, priority = 0, handleToggle, handleDeletion, handleEdit, imgGiven = "undone.svg" }) => {
  const snap = useSnapshot(store, { sync: true });
  const [expanded, setExpanded] = useState(false);
  
  const getMaxChars = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) return 20;
    if (w < 1024) return 40;
    return 60;
  }, []);
  
  const [maxChars, setMaxChars] = useState(getMaxChars());
  
  useEffect(() => {
    const onResize = () => setMaxChars(getMaxChars());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getMaxChars]);
  
  const isLong = useMemo(() => title.length > maxChars, [title.length, maxChars]);
  const displayTitle = useMemo(() => {
    return expanded || !isLong ? title : `${title.slice(0, maxChars)}...`;
  }, [expanded, isLong, title, maxChars]);
  
  const remaining = useMemo(() => calculateRemaining(remTime), [remTime]);
  
  const controlStyle = useMemo(() => ({
    backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
    color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
    borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
  }), [snap.dark]);
  
  const cardStyle = useMemo(() => ({ 
    backgroundColor: snap.dark ? 'var(--dark-color-3)' : 'var(--color-3)', 
    color: controlStyle.color, 
    borderBottom: `4px solid ${color}` 
  }), [snap.dark, controlStyle.color, color]);
  
  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);
  
  return (
    <div className="flex flex-col items-start justify-start p-3 mb-2 gap-2" style={cardStyle}>
      <div className="flex flex-col items-start space-y-2 w-full">
        <div className="w-full">
          <div className="flex items-center flex-wrap">
            <p className="font-semibold break-all whitespace-normal w-full">{displayTitle}</p>
            {isLong && (
              <button className="text-xs p-1 whitespace-nowrap" onClick={toggleExpanded} style={controlStyle}>
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          {priority !== 0 && <p className="text-sm">{remaining}</p>}
          {priority !== 0 && <p className="text-sm">Priority Level {priority - 1}</p>}
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleToggle} className="p-2" aria-label="Toggle task status">
          <img src={imgGiven} alt="" className="w-4 h-4" />
        </button>
        <button onClick={handleEdit} className="p-2" aria-label="Edit task">
          <img src="edit.svg" alt="" className="w-4 h-4" />
        </button>
        <button onClick={handleDeletion} className="p-2" aria-label="Delete task">
          <img src="delete.svg" alt="" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

Task.displayName = 'Task';

export default Task;