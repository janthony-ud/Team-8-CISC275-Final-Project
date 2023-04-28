import React from "react";
//import "./Users.css";
import { useState } from "react";
import { Button } from "@chakra-ui/core";
import YourList from "./UserList";
import { CentralList } from "./CentralList";
//import "./App.tsx";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";

export function ChooseRole() {
    //const [role, setrole] = useState<string>("");
    const [visibleuser, setVisibleuser] = useState<boolean>(false);
    const [visiblead, setVisiblead] = useState<boolean>(false);
    const [visiblesuper, setVisiblesuper] = useState<boolean>(false);

    function flipVisibilityuser(): void {
        setVisibleuser(!visibleuser);
    }
    function flipVisibilityad(): void {
        setVisiblead(!visiblead);
    }
    function flipVisibilitysuper(): void {
        setVisiblesuper(!visiblesuper);
    }

    /*     function roles() {
        if (role == "User") {
            <name="User" />;
        } else if (role == "Admin") {
            <Roles name="Admin" />;
        } else if (role == "Super") {
            <Roles name="Super" />;
        }
    } */

    return (
        <div className="Role">
            <div>
                <hr></hr>
                Please Select Your Role:
                <Menu>
                    <MenuButton as={Button}>Roles</MenuButton>
                    <MenuList>
                        <MenuItem onClick={flipVisibilityuser} as="a">
                            User
                        </MenuItem>
                        {visibleuser && "Your List"}
                        <MenuItem onClick={flipVisibilityad} as="a">
                            Admin
                        </MenuItem>
                        {visiblead && <CentralList />}
                        <MenuItem onClick={flipVisibilitysuper} as="a">
                            Super
                        </MenuItem>
                        {visiblesuper && <CentralList />}
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
}
