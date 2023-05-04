import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/core";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import initialUsers from "../data/initialUsers.json";
import { User } from "../interfaces/user";
import NewUserButton from "./User";
import YourList from "./UserList";
import "./ChooseRole.css";
import { AdminList } from "./AdminList";

const ChooseUser: React.FC = () => {
    const [users, setUsers] = useState<User[]>(
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
            return (
                <div>
                    <div className="yourlist">
                        <YourList user={currentUser}></YourList>;
                    </div>
                </div>
            );
        } else if (user.role == "admin") {
            return <AdminList />;
        } else if (user.role == "super") {
            return (
                <div>
                    <NewUserButton
                        onSubmit={function (newUser: User): void {
                            setUsers((prevUsers) => [...prevUsers, newUser]);
                        }}
                    ></NewUserButton>
                </div>
            );
        } else {
            return "Hello!";
        }
    }

    return (
        <div className="Role">
            <div>
                <hr></hr>
                <h1>Welcome to Movies.com!</h1>
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
};

const chosenUser: JSX.Element = <ChooseUser />;
export default chosenUser;
