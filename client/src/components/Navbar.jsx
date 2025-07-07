import { store } from '../utils';
import { useSnapshot } from 'valtio';

const Navbar = () => {
    const snap = useSnapshot(store);
    return (
        <div id="navbar-user" className="relative overflow-hidden flex items-center h-auto p-3"
            style={{
                color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
                backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)'
            }}>
            <h1 className="text-5xl ml-4">
                <span className="font-ii">আমার</span> Tasks
            </h1>
            <div className='ml-auto'>
                <button className="ml-auto p-2">
                    <img src="add-icon.svg" alt="Add Task" />
                </button>
                <button className="ml-3 p-2" onClick={() => store.dark = !snap.dark}>
                    <img
                        src={snap.dark ? "light-mode.svg" : "dark-mode.svg"}
                        alt={snap.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    />
                </button>
            </div>
        </div>
    )
}

export default Navbar;
