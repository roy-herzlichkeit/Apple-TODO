import { useMemo, useCallback } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../../utils';
import { useHasNavbar } from '../../hooks/useNavbar';

const DarkModeToggle = ({ className = "" }) => {
    const snap = useSnapshot(store, { sync: true });
    const hasNavbar = useHasNavbar();

    const toggleDarkMode = useCallback(() => {
        store.dark = !snap.dark;
    }, [snap.dark]);

    const imageSrc = useMemo(() => {
        return snap.dark ? "light-mode.svg" : "dark-mode.svg";
    }, [snap.dark]);

    const ariaLabel = useMemo(() => {
        return snap.dark ? "Switch to Light Mode" : "Switch to Dark Mode";
    }, [snap.dark]);

    if (hasNavbar) {
        return null;
    }
    
    return (
        <button
            aria-label={ariaLabel}
            className={`p-2 fixed top-4 right-4 z-50 ${className}`}
            onClick={toggleDarkMode}
        >
            <img
                src={imageSrc}
                alt=""
                className="w-6 h-6"
            />
        </button>
    );
};

export default DarkModeToggle;