const Item = (item) => {
    return (
        <>
            {item.status && <p>{item.title}</p>}
        </>
    );
}

export default Item;
