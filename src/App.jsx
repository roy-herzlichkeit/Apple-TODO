import User from "./components/User.jsx";
import { state } from "./utils/index.js";
import { useSnapshot } from "valtio";

const App = () => {
  const snap = useSnapshot(state);
  return (
    <>
      {snap.signedIn && <h1>Homepage</h1>}
      {!snap.signedIn && <User/>}
    </>
  )
}

export default App;