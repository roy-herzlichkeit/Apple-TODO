import { useMemo, useCallback, useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import InputBox from "../components/tasks/InputBox";
import PendingTasks from "../components/tasks/PendingTasks";
import CompletedTasks from "../components/tasks/CompletedTasks";
import { store, getLocalDateTime, loadTasks } from "../utils";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/ui/PageTransition";

const User = () => {
    const snap = useSnapshot(store, { sync: true });
    
    useEffect(() => {
        loadTasks();
    }, []);
    
    const taskStats = useMemo(() => {
        const list = snap.list ?? [];
        const totalCount = list.length;
        const completedCount = list.filter(item => !item.status).length;
        const completionPercentage = totalCount ? (completedCount / totalCount) * 100 : 0;
        return { list, totalCount, completedCount, completionPercentage };
    }, [snap.list]);

    const [editingState, setEditingState] = useState({
        title: "",
        remTime: getLocalDateTime(),
        importance: 1,
        urgency: 1,
        priority: 4,
        color: "#2a2727",
        view: "pending"
    });

    const onEdit = useCallback((taskTitle, taskTime, taskImportance, taskUrgency, taskPriority, taskColor) => {
        if (editingState.title) {
            alert("Please save or cancel the current edit before editing another task.");
            return false;
        }
        
        setEditingState(prev => ({
            ...prev,
            title: taskTitle,
            remTime: taskTime,
            importance: taskImportance,
            urgency: taskUrgency,
            priority: taskPriority,
            color: taskColor
        }));
        
        store.task = !store.task;
        return true;
    }, [editingState.title]);

    const resetEditingState = useCallback(() => {
        setEditingState({
            title: "",
            remTime: getLocalDateTime(),
            importance: 1,
            urgency: 1,
            priority: 4,
            color: "#2a2727",
            view: "pending"
        });
        store.task = !store.task;
    }, []);

    const setView = useCallback((viewName) => {
        setEditingState(prev => ({ ...prev, view: viewName }));
    }, []);

    const sectionStyle = useMemo(() => ({
        backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
    }), [snap.dark]);

    const progressBarStyle = useMemo(() => ({
        backgroundColor: snap.dark ? 'var(--dark-color-3)' : 'var(--color-3)'
    }), [snap.dark]);

    const progressFillStyle = useMemo(() => ({
        width: `${taskStats.completionPercentage}%`,
        backgroundColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
    }), [taskStats.completionPercentage, snap.dark]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1">
                    {snap.task ? (
                        <InputBox
                            initialText={editingState.title}
                            initialRemTime={editingState.remTime}
                            initialImportance={editingState.importance}
                            initialUrgency={editingState.urgency}
                            initialPriority={editingState.priority}
                            initialColor={editingState.color}
                            onAfterSubmit={resetEditingState}
                        />
                    ) : snap.loading ? (
                        <div className="flex-1 flex items-center justify-center mt-50">
                            <div className="text-xl">Loading tasks...</div>
                        </div>
                    ) : snap.error ? (
                        <div className="flex-1 flex items-center justify-center mt-50">
                            <div className="text-center">
                                <div className="text-xl text-red-500 mb-4">Error: {snap.error}</div>
                                <button 
                                    onClick={loadTasks}
                                    className="px-4 py-2 border text-[#2a2727]"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    ) : (
                        <section
                            id="tasks"
                            style={sectionStyle}
                            className="font-i m-4 mt-7 p-4 md:m-10 md:p-7 lg:p-10 lg:m-20"
                        >
                            <div className="mb-6 w-full flex flex-col text-center">
                                <label htmlFor="completion-progress" className="block mb-2 text-2xl">
                                    {taskStats.completionPercentage.toFixed(0)}%
                                </label>
                                <div
                                    id="completion-progress"
                                    role="progressbar"
                                    aria-label="Task completion progress"
                                    aria-valuemin={0}
                                    aria-valuemax={taskStats.totalCount}
                                    aria-valuenow={taskStats.completedCount}
                                    className="w-full h-4 overflow-hidden"
                                    style={progressBarStyle}
                                >
                                    <div className="h-full" style={progressFillStyle} />
                                </div>
                            </div>
                            
                            <div className="w-full flex items-center justify-center gap-8 mb-6">
                                <button
                                    onClick={() => setView("pending")}
                                    aria-pressed={editingState.view === "pending"}
                                    aria-label="Show Pending Tasks"
                                    className="p-2 flex gap-2"
                                >
                                    <span className="text-[#2a2727] hidden text-xl lg:block">Pending</span>
                                    <img src="tbd-icon.svg" alt="Pending Tasks icon" />
                                </button>
                                <button
                                    onClick={() => setView("completed")}
                                    aria-pressed={editingState.view === "completed"}
                                    aria-label="Show Completed Tasks"
                                    className="p-2 flex gap-2"
                                >
                                    <span className="text-[#2a2727] hidden text-xl lg:block">Completed</span>
                                    <img src="completion-icon.svg" alt="Completed Tasks icon" />
                                </button>
                            </div>
                            
                            {editingState.view === "completed" && (
                                <CompletedTasks list={taskStats.list} onEdit={onEdit} />
                            )}
                            {editingState.view === "pending" && (
                                <PendingTasks list={taskStats.list} onEdit={onEdit} />
                            )}
                        </section>
                    )}
                </div>
                <Footer />
            </div>
        </PageTransition>
    );
};

export default User;