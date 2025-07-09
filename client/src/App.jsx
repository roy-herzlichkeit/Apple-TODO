import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { store } from "./utils/index.js";
import { useSnapshot } from "valtio";
import { useTransition } from "./context/TransitionContext";

const Home = lazy(() => import("./pages/Home.jsx"));
const User = lazy(() => import("./pages/User.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-xl">Loading...</div>
  </div>
);

const App = () => {
  const snap = useSnapshot(store);
  const location = useLocation();
  const { isTransitioning, transitionPhase } = useTransition();

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const bg = styles.getPropertyValue(snap.dark ? '--dark-color-3' : '--color-3').trim();
    const text = styles.getPropertyValue(snap.dark ? '--dark-color-1' : '--color-1').trim();
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
    document.body.classList.toggle('dark', snap.dark);
  }, [snap.dark]);

  const overlayVariants = {
    covering: {
      y: '0%',
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    revealing: {
      y: '100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const getOverlayColor = () => {
    return snap.dark ? '#1a1a1a' : '#f5f5f5';
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            initial={{ y: '-100%' }}
            animate={transitionPhase === 'covering' ? 'covering' : 'revealing'}
            exit={{ y: '100%' }}
            variants={overlayVariants}
            style={{
              backgroundColor: getOverlayColor(),
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999
            }}
          />
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            } />
            <Route path="/tester" element={
              <Suspense fallback={<Loading />}>
                <User />
              </Suspense>
            } />
            <Route path="/:username" element={
              <Suspense fallback={<Loading />}>
                <User />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;