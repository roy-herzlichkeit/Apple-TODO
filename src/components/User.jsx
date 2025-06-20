import { useState } from "react";
import { useSnapshot } from "valtio";
import InputBox from "./InputBox";
import PendingTasks from "./PendingTasks";
import CompletedTasks from "./CompletedTasks";
import { store, getLocalDateTime } from "../utils";

const User = () => {
    const snap = useSnapshot(store);
    const list = snap.list;
    const totalCount = list.length;
    const completedCount = list.filter(item => !item.status).length;
    const completionPercentage = totalCount ? (completedCount / totalCount) * 100 : 0;
    const [title, setTitle] = useState("");
    const [remTime, setRemTime] = useState(() => getLocalDateTime());
    const [importance, setImportance] = useState(1);
    const [urgency, setUrgency] = useState(1);
    const [priority, setPriority] = useState(4);
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [view, setView] = useState("pending");

    const onEdit = (taskTitle, taskTime, taskImportance, taskUrgency, taskPriority, taskDesc, taskColor) => {
        if (title) {
            alert("Please save or cancel the current edit before editing another task.");
            return false;
        }
        setTitle(taskTitle);
        setRemTime(taskTime);
        setImportance(taskImportance);
        setUrgency(taskUrgency);
        setPriority(taskPriority);
        setDesc(taskDesc);
        setColor(taskColor);
        return true;
    }

    return (
        <div>
            <InputBox
                initialText={title}
                initialRemTime={remTime}
                initialImportance={importance}
                initialUrgency={urgency}
                initialPriority={priority}
                initialDesc={desc}
                initialColor={color}
                onAfterSubmit={() => {
                    setTitle("");
                    setRemTime(getLocalDateTime());
                    setImportance(1);
                    setUrgency(1);
                    setPriority(4);
                    setDesc("");
                    setColor("#ffffff");
                }}
            />
            <div>
                Completion: {completionPercentage.toFixed(0)}%
            </div>
            <div>
                <button onClick={() => setView("pending")}>Pending Tasks</button>
                <button onClick={() => setView("completed")}>Completed Tasks</button>
            </div>
            {view === "completed" && <CompletedTasks list={list} onEdit={onEdit} />}
            {view === "pending" && <PendingTasks list={list} onEdit={onEdit} />}
        </div>
    );
}

export default User;