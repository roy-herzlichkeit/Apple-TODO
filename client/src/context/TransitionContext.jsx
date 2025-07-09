import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionPhase, setTransitionPhase] = useState('idle');

    const triggerTransition = (callback) => {
        setIsTransitioning(true);
        setTransitionPhase('covering');

        setTimeout(() => {
            if (callback) callback();
        }, 300);

        setTimeout(() => {
            setTransitionPhase('revealing');
        }, 1000);

        setTimeout(() => {
            setIsTransitioning(false);
            setTransitionPhase('idle');
        }, 1000);
    };

    return (
        <TransitionContext.Provider value={{
            isTransitioning,
            transitionPhase,
            triggerTransition
        }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within TransitionProvider');
    }
    return context;
};