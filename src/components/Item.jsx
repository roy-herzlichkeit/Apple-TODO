import { calculateRemaining } from "../utils";

const Item = ({ title, remTime, handleToggle, handleDeletion, handleEdit }) => {
    return (
        <>
            <p>{title}</p>
            <p>{calculateRemaining(remTime)}</p>
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="status-btn"><button onClick={handleEdit}>EDIT</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br />
            <br />
        </>
    );
}

export default Item;
