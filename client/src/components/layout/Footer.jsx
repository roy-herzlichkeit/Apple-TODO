import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../../utils';

const Footer = () => {
    const snap = useSnapshot(store, { sync: true });

    const footerStyle = useMemo(() => ({
        backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
        borderTop: `1px solid ${snap.dark ? 'var(--dark-color-3)' : 'var(--color-3)'}`
    }), [snap.dark]);

    const linkStyle = useMemo(() => ({
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
        textDecoration: 'underline',
        textDecorationColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
    }), [snap.dark]);

    return (
        <footer 
            className="w-full py-4 px-6 text-center font-i text-xs md:text-sm"
            style={footerStyle}
        >
            <p>
                Made by{' '}
                <a 
                    href="https://github.com/roy-herzlichkeit" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={linkStyle}
                    className="hover:opacity-80 transition-opacity duration-200"
                >
                    Herzlichkeit
                </a>
            </p>
        </footer>
    );
};

export default Footer;