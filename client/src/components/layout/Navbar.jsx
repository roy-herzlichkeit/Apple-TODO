import { store } from '../../utils';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { useUsername } from '../../hooks/useAuth';
import { useTransition } from '../../context/TransitionContext';

const Navbar = () => {
    const snap = useSnapshot(store);
    const navigate = useNavigate();
    const username = useUsername();
    const { triggerTransition } = useTransition();

    const handleLogout = () => {
        triggerTransition(() => {
            store.signedIn = false;
            navigate('/');
        });
    };
    return (
        <nav id="navbar-user" className="relative overflow-hidden flex items-center h-auto p-3"
            style={{
                color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
                backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)'
            }}>
            <h1 className="text-4xl md:text-5xl ml-4 font-i">
                <span className="font-ii">আমার</span> Tasks
            </h1>
            <div className='ml-auto'>
                <button
                    aria-label="Add Task"
                    className="ml-auto p-2"
                    onClick={() => store.task = !store.task}
                >
                    <img src={snap.task ? "list-icon.svg" : "add-icon.svg"} alt="" />
                </button>
                <button
                    aria-label={snap.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    className="ml-3 p-2"
                    onClick={() => store.dark = !snap.dark}
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
    )
}

export default Navbar;