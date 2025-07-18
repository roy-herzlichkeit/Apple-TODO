import { useCallback, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import { store } from '../utils';
import PageTransition from '../components/ui/PageTransition';
import DarkModeToggle from '../components/ui/DarkModeToggle';
import Footer from '../components/layout/Footer';

const Forbidden = () => {
    const snap = useSnapshot(store);
    const navigate = useNavigate();
    const { triggerTransition } = useTransition();

    const controlStyle = useMemo(() => ({
        backgroundColor: snap.dark ? 'var(--dark-color-2)' : 'var(--color-2)',
        color: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)',
        borderColor: snap.dark ? 'var(--dark-color-1)' : 'var(--color-1)'
    }), [snap.dark]);

    const handleGoToLogin = useCallback(() => {
        triggerTransition(() => {
            navigate('/login');
        });
    }, [triggerTransition, navigate]);

    const handleGoHome = useCallback(() => {
        triggerTransition(() => {
            navigate('/');
        });
    }, [triggerTransition, navigate]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <DarkModeToggle />
                <div className="flex-1 flex items-center justify-center font-i px-4">
                    <div className="text-center p-6 sm:p-10 max-w-md" style={controlStyle}>
                        <h2 className="text-2xl sm:text-3xl mb-4">403 <span className='text-red-500'>Forbidden</span></h2>
                        <p className="text-lg mb-6">You need to be logged in to access this page.</p>
                        
                        <div className="space-y-4">
                            <button
                                onClick={handleGoToLogin}
                                className="w-full p-3 border-2 hover:opacity-80 transition-opacity"
                                style={controlStyle}
                            >
                                Sign In
                            </button>
                            
                            <button
                                onClick={handleGoHome}
                                className="w-full p-3 border-2 hover:opacity-80 transition-opacity"
                                style={controlStyle}
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </PageTransition>
    );
};

export default Forbidden;