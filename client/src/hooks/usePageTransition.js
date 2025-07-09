import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook to manage page transition state
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // idle, covering, revealing
  const location = useLocation();

  const startTransition = () => {
    setIsTransitioning(true);
    setTransitionPhase('covering');
    
    // After covering animation, switch to revealing phase
    setTimeout(() => {
      setTransitionPhase('revealing');
    }, 500);

    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionPhase('idle');
    }, 1000);
  };

  // Trigger transition on route change
  useEffect(() => {
    startTransition();
  }, [location.pathname]);

  return {
    isTransitioning,
    transitionPhase,
    startTransition
  };
};
