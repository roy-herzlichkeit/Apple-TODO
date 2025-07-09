import { useState } from "react";
import { useSnapshot } from "valtio";
import { useUsername } from "../hooks/useAuth";
import InputBox from "../components/tasks/InputBox";
import PendingTasks from "../components/tasks/PendingTasks";
import CompletedTasks from "../components/tasks/CompletedTasks";
import { store, getLocalDateTime } from "../utils";
import Navbar from "../components/layout/Navbar";
import PageTransition from "../components/ui/PageTransition";

const User = () => {
    const snap = useSnapshot(store);
    const username = useUsername();
    const list = snap.list ?? [];
    const totalCount = list.length;
    const completedCount = list.filter(item => !item.status).length;
    const completionPercentage = totalCount ? (completedCount / totalCount) * 100 : 0;
    const [title, setTitle] = useState("");
    const [remTime, setRemTime] = useState(() => getLocalDateTime());
    const [importance, setImportance] = useState(1);
    const [urgency, setUrgency] = useState(1);
    const [priority, setPriority] = useState(4);
    const [color, setColor] = useState("#2a2727");
    const [view, setView] = useState("pending");

    const onEdit = (taskTitle, taskTime, taskImportance, taskUrgency, taskPriority, taskColor) => {
        if (title) {
            alert("Please save or cancel the current edit before editing another task.");
            return false;
        }
        setTitle(taskTitle);
        setRemTime(taskTime);
        setImportance(taskImportance);
        setUrgency(taskUrgency);
        setPriority(taskPriority);
        setColor(taskColor);
        store.task = !store.task;
        return true;
    }

    return (
        <PageTransition>
            <Navbar />
            {
                snap.task ?
                    <InputBox
                        initialText={title}
                        initialRemTime={remTime}
                        initialImportance={importance}
                        initialUrgency={urgency}
                        initialPriority={priority}
                        initialColor={color}
                        onAfterSubmit={() => {
                            setTitle("");
                            setRemTime(getLocalDateTime());
                            setImportance(1);
                            setUrgency(1);
                            setPriority(4);
                            setColor("#2a2727");
                            store.task = !store.task;
                        }}
                    />
                    :
                    <section
                        id="tasks"
                        style={{
                            backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
                            color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
                        }}
                        className="font-i m-4 mt-7 p-4 md:m-10 md:p-7 lg:p-10 lg:m-20"
                    >
                        <div className="mb-6 w-full flex flex-col text-center">
                            <label htmlFor="completion-progress" className="block mb-2 text-2xl">
                                {completionPercentage.toFixed(0)}%
                            </label>
                            <div
                                id="completion-progress"
                                role="progressbar"
                                aria-label="Task completion progress"
                                aria-valuemin={0}
                                aria-valuemax={totalCount}
                                aria-valuenow={completedCount}
                                className="w-full h-4 overflow-hidden"
                                style={{ backgroundColor: snap.dark ? 'var(--dark-color-3)' : 'var(--color-3)' }}
                            >
                                <div
                                    className="h-full"
                                    style={{
                                        width: `${completionPercentage}%`,
                                        backgroundColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center gap-8 mb-6">
                            <button
                                onClick={() => setView("pending")}
                                aria-pressed={view === "pending"}
                                aria-label="Show Pending Tasks"
                                className="p-2 flex gap-2"
                            >
                                <span className="text-[#2a2727] hidden text-xl lg:block">Pending</span>
                                <img src="tbd-icon.svg" alt="Pending Tasks icon" />
                            </button>
                            <button
                                onClick={() => setView("completed")}
                                aria-pressed={view === "completed"}
                                aria-label="Show Completed Tasks"
                                className="p-2 flex gap-2"
                            >
                                <span className="text-[#2a2727] hidden text-xl lg:block">Completed</span>
                                <img src="completion-icon.svg" alt="Completed Tasks icon" />
                            </button>
                        </div>
                        {view === "completed" && <CompletedTasks list={list} onEdit={onEdit} />}
                        {view === "pending" && <PendingTasks list={list} onEdit={onEdit} />}
                    </section>
            }
        </PageTransition>
    );
}

export default User;
