import React from "react";
//import "./Users.css";
import { useState } from "react";
import { Button } from "@chakra-ui/core";
import { CentralList } from "./CentralList";
//import "./App.tsx";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import initialUsers from "../data/initialUsers.json";
import { User } from "../interfaces/user";

export function ChooseUser() {
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
