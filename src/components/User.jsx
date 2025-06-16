import InputBox from "./InputBox";
import List from "./List";

const User = () => {
    const objects = [
        {id: 1, title: "Love is a Long Road", status: true},
        {id: 2, title: "Love is a Long Road", status: false},
        {id: 3, title: "Suspicious Minds", status: true},
        {id: 4, title: "Love is a Long Road 2", status: true},
    ]
    return (
        <div>
            <InputBox />
            <List list={objects}/>
        </div>
    );
}

export default User;