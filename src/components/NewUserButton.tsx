import React, { useState } from "react";
import { User } from "../interfaces/user";
import { userMovie } from "../interfaces/userMovie";
import { Button } from "@chakra-ui/core";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from "@chakra-ui/core";
import { useDisclosure } from "@chakra-ui/core";
import { Box, Stack, Select, FormLabel, Input } from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";

interface NewUserProps {
    onSubmit: (newUser: User) => void;
}

const NewUserDrawer: React.FC<NewUserProps> = ({ onSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("user");
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
    };
    //  const firstField = React.useRef();

    function handleNewUser(e: React.ChangeEvent<HTMLInputElement>) {
        const userName = e.target.value;
        setName(userName);
    }

    const toast = useToast();

    return (
        <>
            <Button
                ref={btnRef}
                leftIcon="add"
                variantColor="teal"
                onClick={onOpen}
            >
                Create user
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                //   initialFocusRef={firstField}
                //   finalFocusRef={btnRef}
                onClose={onClose}
            >
                <DrawerOverlay />
                <form onSubmit={handleSubmit}>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Create a New User
                        </DrawerHeader>
                        <br />

                        <DrawerBody>
                            <Stack spacing="24px">
                                <Box>
                                    <FormLabel htmlFor="username">
                                        Name
                                    </FormLabel>
                                    <Input
                                        id="username"
                                        placeholder="Please enter user name"
                                        type="text"
                                        onChange={handleNewUser}
                                    ></Input>
                                </Box>

                                <Box>
                                    <FormLabel htmlFor="role">
                                        Select Role
                                    </FormLabel>
                                    <Select
                                        id="role"
                                        defaultValue="user"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        value={role}
                                    </Select>
                                </Box>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth="1px">
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variantColor="blue"
                                onClick={() =>
                                    toast({
                                        title: "User created.",
                                        description:
                                            "We've created your new user.",
                                        status: "success",
                                        duration: 9000,
                                        isClosable: true
                                    })
                                }
                            >
                                Submit
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </form>
            </Drawer>
        </>
    );
};
export default NewUserDrawer;
