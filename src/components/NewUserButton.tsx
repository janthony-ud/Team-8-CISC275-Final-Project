import React, { useState } from "react";
import { User } from "../interfaces/user";
import ReactDOM from "react-dom";
import { userMovie } from "../interfaces/userMovie";
import { Button } from "@chakra-ui/core";

interface NewUserProps {
    onSubmit: (newUser: User) => void;
}

interface CustomWindow extends Window {
    returnUser?: User;
}

const NewUserForm: React.FC<NewUserProps> = ({ onSubmit }) => {
    //const[array, setArray] = useState<User[]>;
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [userMovieList, setMovieList] = useState<userMovie[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser: User = {
            name,
            userMovieList,
            role
        };
        onSubmit(newUser);
        setName("");
        setMovieList([]);
        setRole("");
        // eslint-disable-next-line
        //(window as CustomWindow).close();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Role:
                <textarea
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Add User</button>
        </form>
    );
};

const NewUserButton: React.FC<NewUserProps> = ({ onSubmit }) => {
    const handleClick = () => {
        // eslint-disable-next-line
        const newWindow = window.open(
            "",
            "_blank",
            "width=400,height=400"
        )! as CustomWindow;
        newWindow.document.write(
            "<html><head><title>Create a New User</title></head><body><h1>New User</h1></body></html>"
        );
        const div = document.createElement("div");
        newWindow.document.body.appendChild(div);
        ReactDOM.render(
            <NewUserForm
                onSubmit={(newUser) => {
                    onSubmit(newUser);
                    newWindow.returnUser = newUser;
                    newWindow.close();
                }}
            />,
            div
        );
        newWindow.addEventListener(
            "beforeunload",
            (event: { preventDefault: () => void; returnValue: boolean }) => {
                event.preventDefault();
                event.returnValue = false;
                if (typeof newWindow.returnUser !== "undefined") {
                    window.opener.postMessage(
                        { type: "new-user", user: newWindow.returnUser },
                        "*"
                    );
                }
            }
        );
    };

    return <Button onClick={handleClick}>Create A New User:</Button>;
};
export default NewUserButton;
