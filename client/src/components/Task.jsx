import React, { memo, useMemo, useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { calculateRemaining } from "../utils";
import { store } from "../utils";

const Task = ({ title, remTime, color, priority = 0, handleToggle, handleDeletion, handleEdit, imgGiven="undone.svg" }) => {
  const snap = useSnapshot(store);
  const [expanded, setExpanded] = useState(false);
  const getMaxChars = () => {
    const w = window.innerWidth;
    if (w < 640) return 10;  
    if (w < 1024) return 20; 
    return 30;               
  };
  const [maxChars, setMaxChars] = useState(getMaxChars());
  useEffect(() => {
    const onResize = () => setMaxChars(getMaxChars());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const isLong = title.length > maxChars;
  const displayTitle = expanded || !isLong ? title : `${title.slice(0, maxChars)}...`;
  const remaining = useMemo(() => calculateRemaining(remTime), [remTime]);
  const controlStyle = {
    backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
    color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
    borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
  };
  const cardStyle = { backgroundColor: snap.dark ? 'var(--dark-color-3)' : 'var(--color-3)', color: controlStyle.color };
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 mb-2 gap-2" style={cardStyle}>
      <div className="flex flex-col items-start space-y-2">
        <div style={{ width: '10px', height: '10px', backgroundColor: color, marginTop: '6px' }} />
        <div className="w-full">
          <div className="flex items-center flex-wrap">
            <p className="font-semibold break-all whitespace-normal w-full">{displayTitle}</p>
            {isLong && (
              <button className="text-xs p-1 whitespace-nowrap" onClick={() => setExpanded(prev => !prev)} style={controlStyle}>
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          {priority !== 0 && <p className="text-sm">{remaining}</p>}
          {priority !== 0 && <p className="text-sm">Priority: {priority}</p>}
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
};

export default memo(Task);