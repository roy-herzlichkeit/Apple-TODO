import { useState } from "react";
import { useSnapshot } from "valtio";
import InputBox from "./InputBox";
import List from "./List";
import { store, getLocalDateTime } from "../utils";

const User = () => {
    const snap = useSnapshot(store);
    const list = snap.list;
    const [title, setTitle] = useState("");
    const [remTime, setRemTime] = useState(() => getLocalDateTime());
    const onEdit = (taskTitle, taskTime) => {
        if (title) {
            alert("Please save or cancel the current edit before editing another task.");
            return false;
        }
        setTitle(taskTitle);
        setRemTime(taskTime);
        return true;
    }
    return (
        <div>
            <InputBox
                initialText={title}
                initialRemTime={remTime}
                onAfterSubmit={() => {
                    setTitle("");
                    setRemTime(getLocalDateTime());
                }}
            />
            <List list={list} onEdit={onEdit} />
        </div>
    );
}

export default User;