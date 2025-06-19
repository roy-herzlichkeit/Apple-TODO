import { calculateRemaining } from "../utils";

const Item = ({ title, remTime, priority, handleToggle, handleDeletion, handleEdit }) => {
    return (
        <>
            <p>{title}</p>
            <p>{calculateRemaining(remTime)}</p>
            <p>Priority Level: {priority}</p>
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="status-btn"><button onClick={handleEdit}>EDIT</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br />
            <br />
        </>
    );
}

export default Item;
