import React, { memo, useMemo } from "react";
import { calculateRemaining } from "../utils";

const Task = ({ title, desc, remTime, color, priority=0, handleToggle, handleDeletion, handleEdit }) => {
  const remaining = useMemo(() => calculateRemaining(remTime), [remTime]);

    return (
        <>
            <p>{title}</p>
            <p>{desc}</p>
            {priority !== 0 && <p>{remaining}</p>}
            {priority !== 0 && <p>Priority Level: {priority}</p>}
            <div style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: color, marginRight: '8px' }} />
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="status-btn"><button onClick={handleEdit}>EDIT</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br />
            <br />
        </>
    );
}

export default memo(Task);