import { calculateRemaining } from "../utils";

const Item = ({ title, remTime, importance, urgency, handleToggle, handleDeletion, handleEdit }) => {
    return (
        <>
            <p>{title}</p>
            <p>{calculateRemaining(remTime)}</p>
            <p>Importance: {importance}</p>
            <p>Urgency: {urgency}</p>
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="status-btn"><button onClick={handleEdit}>EDIT</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br />
            <br />
        </>
    );
}

export default Item;
