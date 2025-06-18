import { useState } from "react";
import { useSnapshot } from "valtio";
import InputBox from "./InputBox";
import List from "./List";
import { store } from "../utils";

const User = () => {
    const snap = useSnapshot(store);
    const list = snap.list;
    const [title, setTitle] = useState("");
    const onEdit = (title) => {
        setTitle(title);
    }
    return (
        <div>
            <InputBox initialText={title} onAfterSubmit={() => setTitle("")} />
            <List list={list} onEdit={onEdit} />
        </div>
    );
}

export default User;