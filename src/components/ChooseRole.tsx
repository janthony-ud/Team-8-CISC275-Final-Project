import React from "react";
import { useState } from "react";
import initialUsers from "../data/initialUsers.json";
import { User } from "../interfaces/user";
import CentralList from "./CentralList";
import "./ChooseRole.css";
import { Avatar, AvatarBadge, Stack, Box } from "@chakra-ui/core";
import { Tooltip } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";
import NewUserDrawer from "./NewUserButton";
import { useDisclosure } from "@chakra-ui/core";
import { IconButton } from "@chakra-ui/core";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent
} from "@chakra-ui/core";

export const ChooseUser: React.FC = () => {
    const {
        isOpen: isOpenMenu,
        onOpen: onOpenMenu,
        onClose: onCloseMenu
    } = useDisclosure();
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

    localStorage.removeItem("users");

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(
                initialUsers.map((user) => ({
                    name: user.name,
                    userMovieList: user.userMovieList,
                    role: user.role
                }))
            );
        }
    }, [initialUsers]);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    function handleSetUser(user: User) {
        setCurrentUser(user);
    }

    function removeUser(name: string): void {
        setUsers([...users].filter((user) => user.name !== name));
        localStorage.setItem(
            "users",
            JSON.stringify([...users].filter((user) => user.name !== name))
        );
    }

    function handleNewUser() {
        if (currentUser.role == "super") {
            return (
                <NewUserDrawer
                    onSubmit={function (newUser: User): void {
                        setUsers((prevUsers) => [...prevUsers, newUser]);
                        localStorage.setItem(
                            "users",
                            JSON.stringify([...users, newUser])
                        );
                    }}
                ></NewUserDrawer>
            );
        }
    }

    function handleRemoveViewUser(user: User) {
        if (user.role == "super") {
            return "";
        } else {
            return (
                <div className="remove-movie">
                    <>
                        <Button
                            variantColor="red"
                            size="xs"
                            onClick={() => removeUser(user.name)}
                        >
                            Delete User
                        </Button>
                    </>
                </div>
            );
        }
    }

    function handleUserType(user: User) {
        if (user.role == "user") {
            return (
                <div>
                    <div>
                        <CentralList
                            user={currentUser}
                            handling={"userList"}
                        ></CentralList>
                    </div>
                </div>
            );
        } else if (user.role == "admin") {
            return (
                <div>
                    <div>
                        <CentralList
                            user={currentUser}
                            handling={"userList"}
                        ></CentralList>
                    </div>
                </div>
            );
        } else if (user.role == "super") {
            return (
                <div>
                    <Tabs>
                        <TabList>
                            <Tab>Create/Delete Users</Tab>
                            <Tab>Add/Delete/Edit Movies</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <h1>Create/Delete Users</h1>
                                <NewUserDrawer
                                    onSubmit={function (newUser: User): void {
                                        setUsers((prevUsers) => [
                                            ...prevUsers,
                                            newUser
                                        ]);
                                        localStorage.setItem(
                                            "users",
                                            JSON.stringify([...users, newUser])
                                        );
                                    }}
                                ></NewUserDrawer>

                                <h3>
                                    {currentUser.name}, {currentUser.role}{" "}
                                </h3>
                                {users.slice(2).map((user) => (
                                    <div key={user.name}>
                                        <div className="induseravatar">
                                            <h3>
                                                {user.name}, {user.role}{" "}
                                            </h3>
                                            {handleRemoveViewUser(user)}
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel>
                                <CentralList
                                    user={user}
                                    handling={"userList"}
                                ></CentralList>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            );
        } else if (user.name == "Home") {
            return (
                <div className="home">
                    <h2> Welcome! Who{"'"}s Browsing?</h2>
                    <Stack isInline>
                        {users.slice(1).map((user) => (
                            <div key={user.name}>
                                <div className="induseravatar">
                                    <Tooltip
                                        label={handleToolTip(user)}
                                        placement="top"
                                        aria-label="User"
                                        shouldWrapChildren={true}
                                    >
                                        <Avatar
                                            onClick={() => handleSetUser(user)}
                                            as="a"
                                            name={user.name}
                                            src={require("../avatar.png")}
                                            size="xl"
                                        ></Avatar>
                                    </Tooltip>
                                    <div>{user.name}</div>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </div>
            );
        } else {
            return "Hello!";
        }
    }

    function setBadgeColor(user: User): string {
        if (user == currentUser) {
            return "green.500";
        } else {
            return "tomato";
        }
    }

    function handleToolTip(user: User): string {
        return user.role;
    }

    return (
        <div className="Role">
            <div className="users">
                <Box>
                    <Stack isInline>
                        <>
                            <IconButton
                                variantColor="teal"
                                aria-label="drag-handle"
                                size="lg"
                                icon="drag-handle"
                                onClick={onOpenMenu}
                            />
                            <Drawer
                                placement="left"
                                onClose={onCloseMenu}
                                isOpen={isOpenMenu}
                                size="xs"
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <DrawerHeader borderBottomWidth="1px">
                                        Select User
                                    </DrawerHeader>
                                    <DrawerBody>
                                        {users.slice(1).map((user) => (
                                            <div key={user.name}>
                                                <div className="induseravatar">
                                                    <Tooltip
                                                        label={handleToolTip(
                                                            user
                                                        )}
                                                        placement="top"
                                                        aria-label="User"
                                                        shouldWrapChildren={
                                                            true
                                                        }
                                                    >
                                                        <Avatar
                                                            onClick={() =>
                                                                handleSetUser(
                                                                    user
                                                                )
                                                            }
                                                            as="a"
                                                            name={user.name}
                                                            src={require("../avatar.png")}
                                                        >
                                                            <AvatarBadge
                                                                bg={setBadgeColor(
                                                                    user
                                                                )}
                                                                size="0.75em"
                                                            />
                                                        </Avatar>
                                                        {user.name}
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        ))}
                                        {handleNewUser}
                                    </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                        </>
                        {
                            <Avatar
                                style={{ textAlign: "center" }}
                                onClick={() => handleSetUser(users[0])}
                                as="a"
                                name="home"
                                role="home"
                                src={require("../home.png")}
                            >
                                {" "}
                            </Avatar>
                        }
                    </Stack>
                </Box>
            </div>
            <div>
                <div>{handleUserType(currentUser)}</div>
            </div>
        </div>
    );
};

const chosenUser: JSX.Element = <ChooseUser />;
export default chosenUser;
