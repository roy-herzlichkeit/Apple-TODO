import Item from "./Item";

const List = ({list}) => {
  return (
    <div>
        {
            list.map(item => <Item key={item.id} title={item.title} status={item.status} />)
        }
    </div>
  );
}

export default List;
