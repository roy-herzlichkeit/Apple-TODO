import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, User, Login, Signup, NotFound, Forbidden } from "./pages";
import { store } from "./utils/index.js";
import { useSnapshot } from "valtio";
import { useTransition } from "./context/TransitionContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/user" element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;