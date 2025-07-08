import { useEffect } from "react";
import User from "./components/User.jsx";
import { store } from "./utils/index.js";
import { useSnapshot } from "valtio";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const snap = useSnapshot(store);
  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const bg = styles.getPropertyValue(snap.dark ? '--dark-color-3' : '--color-3').trim();
    const text = styles.getPropertyValue(snap.dark ? '--dark-color-1' : '--color-1').trim();
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
    document.body.classList.toggle('dark', snap.dark);
  }, [snap.dark]);

  return (
    <>
      <Navbar />
      <main>
        {snap.signedIn && <h1>Homepage</h1>}
        {!snap.signedIn && <User />}
      </main>
    </>
  );
}

export default App;