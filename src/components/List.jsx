import { useSnapshot } from "valtio";
import Item from "./Item";
import { store } from "../utils";

const List = ({ list, onEdit }) => {
  const snap = useSnapshot(store);
  const handleToggle = (id) => {
    store.list = snap.list.map((item) => item.id === id ? { ...item, status: !item.status } : item);
  };
  const handleDeletion = (id) => {
    store.list = snap.list.filter(item => item.id !== id);
  };
  const handleEdit = (id) => {
    const itemToEdit = list.find(item => item.id === id);
    const res = onEdit(itemToEdit.title, itemToEdit.remTime, itemToEdit.importance, itemToEdit.urgency);
    if (res)
      store.list = snap.list.filter(item => item.id !== id);
  };
  return (
    <div>
      <h3>PENDING TASKS:</h3>
      {
        list.map(item => item.status && <Item key={item.id} title={item.title} importance={item.importance} urgency={item.urgency} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)
      }
      <h3>COMPLETED TASKS:</h3>
      {
        list.map(item => !item.status && <Item key={item.id} title={item.title} importance={item.importance} urgency={item.urgency} remTime={item.remTime} handleDeletion={() => handleDeletion(item.id)} handleToggle={() => handleToggle(item.id)} handleEdit={() => handleEdit(item.id)} />)
      }
    </div>
  );
}

export default List;