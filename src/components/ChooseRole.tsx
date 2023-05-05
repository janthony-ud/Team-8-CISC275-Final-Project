import React from "react";
import { useState } from "react";
import initialUsers from "../data/initialUsers.json";
import { User } from "../interfaces/user";
import NewUserButton from "./NewUserButton";
import YourList from "./UserList";
import { CentralList } from "./CentralList";
import "./ChooseRole.css";
import { AdminList } from "./AdminList";
import { Avatar, AvatarBadge, Stack, Box } from "@chakra-ui/core";
import { Tooltip } from "@chakra-ui/core";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

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
                        <YourList user={currentUser}></YourList>
                    </div>
                    <div className="centrallist">
                        <CentralList />;
                    </div>
                </div>
            );
        } else if (user.role == "admin") {
            return <AdminList />;
        } else if (user.role == "super") {
            return (
                <div>
                    <Tabs>
                        <TabList>
                            <Tab>Create/Delete Users</Tab>
                            <Tab>View/Edit Admin List</Tab>
                            <Tab>Add/Delete Movies</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <NewUserButton
                                    onSubmit={function (newUser: User): void {
                                        setUsers((prevUsers) => [
                                            ...prevUsers,
                                            newUser
                                        ]);
                                    }}
                                ></NewUserButton>
                                {users.map((user) => (
                                    <div key={user.name}>
                                        <div className="induseravatar">
                                            <Tooltip
                                                label={handleToolTip(user)}
                                                placement="top"
                                                aria-label="Hello"
                                                shouldWrapChildren={true}
                                            >
                                                <Avatar
                                                    onClick={() =>
                                                        handleSetUser(user)
                                                    }
                                                    as="a"
                                                    name={user.name}
                                                    src="https://bit.ly/broken-link"
                                                    // backgroundColor={setAvatarColor(user)}
                                                >
                                                    <AvatarBadge
                                                        bg={setBadgeColor(user)}
                                                        size="0.75em"
                                                    />
                                                </Avatar>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))}
                            </TabPanel>
                            <TabPanel>
                                <p>View/Edit Admin List</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Add a New Movie</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
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
        return user.name + ", " + user.role;
    }

    return (
        <div className="Role">
            <div>
                <hr></hr>
                <div className="users">
                    <Box>
                        Need to figure out how to center these**
                        <Stack isInline>
                            {users.map((user) => (
                                <div key={user.name}>
                                    <div className="induseravatar">
                                        <Tooltip
                                            label={handleToolTip(user)}
                                            placement="top"
                                            aria-label="Hello"
                                            shouldWrapChildren={true}
                                        >
                                            <Avatar
                                                onClick={() =>
                                                    handleSetUser(user)
                                                }
                                                as="a"
                                                name={user.name}
                                                src="https://bit.ly/broken-link"
                                                // backgroundColor={setAvatarColor(user)}
                                            >
                                                <AvatarBadge
                                                    bg={setBadgeColor(user)}
                                                    size="0.75em"
                                                />
                                            </Avatar>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </Box>
                </div>
                Welcome, {currentUser.name} You are now interacting as:{" "}
                {currentUser.role}
                <div>{handleUserType(currentUser)}</div>
            </div>
        </div>
    );
};

const chosenUser: JSX.Element = <ChooseUser />;
export default chosenUser;
