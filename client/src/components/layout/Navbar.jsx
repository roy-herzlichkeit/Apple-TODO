import { useMemo, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import { store, toggleTheme } from '../../utils';

const Navbar = () => {
    const snap = useSnapshot(store, { sync: true });
    const navigate = useNavigate();
    const { triggerTransition } = useTransition();

    const navbarStyle = useMemo(() => ({
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
        backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)'
    }), [snap.dark]);

    const handleLogout = useCallback(() => {
        triggerTransition(() => {
            navigate('/', { replace: true });
            // Clear auth state AFTER the transition completes
            setTimeout(() => {
                store.signedIn = false;
                localStorage.removeItem('amarTasks-token');
                localStorage.removeItem('amarTasks-user');
                localStorage.removeItem('amarTasks-signedIn');
                store.list = [];
            }, 1000); // Wait for transition to complete
        });
    }, [triggerTransition, navigate]);

    const toggleTask = useCallback(() => {
        store.task = !store.task;
    }, []);

    const toggleDarkMode = useCallback(() => {
        toggleTheme();
    }, []);

    return (
        <nav
            id="navbar-user"
            className="relative overflow-hidden flex items-center h-auto p-3"
            style={navbarStyle}
        >
            <h1 className="text-4xl md:text-5xl ml-4 font-i">
                <span className="font-ii">আমার</span> Tasks
            </h1>
            <div className='ml-auto'>
                <button
                    aria-label="Add Task"
                    className="ml-auto p-2"
                    onClick={toggleTask}
                >
                    <img src={snap.task ? "list-icon.svg" : "add-icon.svg"} alt="" />
                </button>
                <button
                    aria-label={snap.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    className="ml-3 p-2"
                    onClick={toggleDarkMode}
                >
                    <img
                        src={snap.dark ? "light-mode.svg" : "dark-mode.svg"}
                        alt=""
                    />
                </button>
                <button
                    aria-label="Logout"
                    className="ml-3 p-2"
                    onClick={handleLogout}
                >
                    <img
                        src="logout.svg"
                        alt=""
                    />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;