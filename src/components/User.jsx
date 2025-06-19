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
    const [importance, setImportance] = useState(1);
    const [urgency, setUrgency] = useState(1);

    const onEdit = (taskTitle, taskTime, taskImportance, taskUrgency) => {
        if (title) {
            alert("Please save or cancel the current edit before editing another task.");
            return false;
        }
        setTitle(taskTitle);
        setRemTime(taskTime);
        setImportance(taskImportance);
        setUrgency(taskUrgency)
        return true;
    }

    return (
        <div>
            <InputBox
                initialText={title}
                initialRemTime={remTime}
                initialImportance={importance}
                initialUrgency={urgency}
                onAfterSubmit={() => {
                    setTitle("");
                    setRemTime(getLocalDateTime());
                    setImportance(1);
                    setUrgency(1);
                }}
            />
            <List list={list} onEdit={onEdit} />
        </div>
    );
}

export default User;