import { useSnapshot } from 'valtio';
import { store } from '../../utils';
import { useHasNavbar } from '../../hooks/useNavbar';

const DarkModeToggle = ({ className = "" }) => {
    const snap = useSnapshot(store);
    const hasNavbar = useHasNavbar();

    if (hasNavbar) {
        return null;
    }
    
    return (
        <button
            aria-label={snap.dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`p-2 fixed top-4 right-4 z-50 ${className}`}
            onClick={() => store.dark = !snap.dark}
        >
            <img
                src={snap.dark ? "light-mode.svg" : "dark-mode.svg"}
                alt=""
                className="w-6 h-6"
            />
        </button>
    );
};

export default DarkModeToggle;