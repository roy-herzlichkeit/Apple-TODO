import { useSnapshot } from "valtio";
import InputBox from "./InputBox";
import List from "./List";
import { store } from "../utils";

const User = () => {
    const snap = useSnapshot(store);
    const list = snap.list;
    return (
        <div>
            <InputBox />
            <List list={list} />
        </div>
    );
}

export default User;