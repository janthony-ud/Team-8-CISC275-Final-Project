import React, { useState } from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import YourList from "./UserList";

interface Props {
    user: User;
}

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import initialUsers from "../data/initialUsers.json";

export function ChooseUser(user: Props) {
    const [users] = useState<User[]>(
        initialUsers.map((user) => {
            return {
                name: user.name,
                userMovieList: user.userMovieList,
                role: user.role
            };
        })
    );
    const [currentUser, setCurrentUser] = useState<User>(users[0]);

    function handleSetUser(user: User) {
        setCurrentUser(user);
    }

    function handleUserType(user: User) {
        if (user.role == "user") {
            return "pass it to show the user list";
        } else if (user.role == "admin") {
            return "pass to show admin list";
        } else {
            return "pass to ask if add user, movie, etc";
        }
    }

    return (
        <div className="Role">
            <div>
                <hr></hr>
                <Menu>
                    <MenuButton as={Button}>
                        Please Select Your Name:
                    </MenuButton>
                    <MenuList>
                        {users.map((user) => (
                            <div key={user.name}>
                                <MenuItem
                                    onClick={() => handleSetUser(user)}
                                    as="a"
                                >
                                    {user.name} ({user.role})
                                </MenuItem>
                            </div>
                        ))}
                    </MenuList>
                </Menu>
                <div>{handleUserType(currentUser)}</div>
            </div>
        </div>
    );
}

const AddUser: React.FC = () => {
    //const[array, setArray] = useState<User[]>;
    const [user, setUser] = useState<User[]>([]);
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<User>(user[0]);

    function updateCurrentUser(name: User) {
        setCurrentUser(name);
    }

    function changename(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function changerole(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }

    function updateUsers(name1: string, role1: string) {
        const newUser: User = { name: name1, userMovieList: [], role: role1 };
        setUser([...user, newUser]);
    }

    return (
        <div>
            <h3>Add a New User:</h3>
            <Form.Group controlId="name-text">
                <Form.Label>Enter Name:</Form.Label>
                <Form.Control value={name} onChange={changename} />
            </Form.Group>
            <Form.Group controlId="name-text">
                <Form.Label>Enter Role (admin, super, user):</Form.Label>
                <Form.Control value={role} onChange={changerole} />
            </Form.Group>
            <Button onClick={() => updateUsers(name, role)}>Save </Button>
            {user.map((user) => (
                <div key={user.name}>
                    <div>{user.name}</div>
                    <Button onClick={() => updateCurrentUser(user)}>
                        {user.name}
                    </Button>
                    <YourList user={currentUser}></YourList>;
                </div>
            ))}
        </div>
    );
};

const addUser: JSX.Element = <AddUser />;

export default addUser;

/*   function createNewUser(
        name: string,
        userMovies: Movie[],
        role: string
    ): User {
        return {
            name: name,
            userMovies: userMovies,
            role: role
        };
    } */

/*     function changename(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }
    function changerole(event: React.ChangeEvent<HTMLInputElement>) {
        setRole(event.target.value);
    }
    function push() {
        <div></div>;
    } */

// const user1: User = { name: name, userMovies: [], role: role };
