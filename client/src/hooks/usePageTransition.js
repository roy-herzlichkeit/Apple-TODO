import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const location = useLocation();

  const startTransition = () => {
    setIsTransitioning(true);
    setTransitionPhase('covering');

    setTimeout(() => {
      setTransitionPhase('revealing');
    }, 500);

    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionPhase('idle');
    }, 1000);
  };

  useEffect(() => {
    startTransition();
  }, [location.pathname]);

  return {
    isTransitioning,
    transitionPhase,
    startTransition
  };
};