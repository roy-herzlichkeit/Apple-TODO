const Item = ({title, status, handleToggle, handleDeletion}) => {
    return (
        <>
            <p>{title}</p>
            <div id="status-btn"><button onClick={handleToggle}>MARK</button></div>
            <div id="delete-btn"><button onClick={handleDeletion}>DEL</button></div>
            <br/>
            <br/>
        </>
    );
}

export default Item;
