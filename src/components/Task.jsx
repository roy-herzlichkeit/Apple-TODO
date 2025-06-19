import React, { memo } from "react";
import { calculateRemaining } from "../utils";

const Task = ({ title, remTime, priority=0, handleToggle, handleDeletion, handleEdit }) => {
    return (
        <>
            <p>{title}</p>
            {priority !== 0 && <p>{calculateRemaining(remTime)}</p>}
            {priority !== 0 && <p>Priority Level: {priority}</p>}
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="status-btn"><button onClick={handleEdit}>EDIT</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br />
            <br />
        </>
    );
}

export default memo(Task);
