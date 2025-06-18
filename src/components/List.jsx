import Item from "./Item";
import { store } from "../utils";
import { useSnapshot } from "valtio";

const List = ({ list }) => {
  const snap = useSnapshot(store);
  const handleToggle = (id) => {
    store.list = snap.list.map((item) => item.id === id ? { ...item, status: !item.status } : item);
  };
  const handleDeletion = (id) => {
    store.list = snap.list.filter(item => item.id !== id);
  };
  return (
    <div>
      <h3>PENDING TASKS</h3>
      {
        list.map(item => item.status && <Item key={item.id} title={item.title} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} />)
      }
      <h3>COMPLETED TASKS</h3> 
      {
        list.map(item => !item.status && <Item key={item.id} title={item.title} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} />)
      }
    </div>
  );
}

export default List;
