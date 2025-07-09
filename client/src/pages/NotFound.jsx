import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import Footer from '../components/layout/Footer';
import { useSnapshot } from 'valtio';
import { store } from '../utils';
import { useTransition } from '../context/TransitionContext';

const NotFound = () => {
    const navigate = useNavigate();
    const snap = useSnapshot(store);
    const { triggerTransition } = useTransition();

    const handleGoHome = () => {
        triggerTransition(() => {
            navigate('/');
        });
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center font-i">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-i mb-4">404</h1>
                        <p className="text-xl mb-8">Page not found</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                className="flex gap-2 justify-center items-center px-4 py-2 rounded border"
                                onClick={handleGoHome}
                            >
                                <span>Go Back to Home</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </PageTransition>
    );
};

export default NotFound;