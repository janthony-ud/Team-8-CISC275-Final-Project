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
import { Button } from "@chakra-ui/core";
import React from "react";
import {
    Box,
    Stack,
    Textarea,
    Select,
    FormLabel,
    InputGroup,
    Input,
    InputRightAddon,
    InputLeftAddon
} from "@chakra-ui/core";

export function DrawerExample(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const firstField = React.useRef();

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
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create a new account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="username">Name</FormLabel>
                                <Input
                                    id="username"
                                    placeholder="Please enter user name"
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="url">Url</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>http://</InputLeftAddon>
                                    <Input
                                        type="url"
                                        id="url"
                                        placeholder="Please enter password"
                                        rounded="0"
                                    />
                                    <InputRightAddon>.com</InputRightAddon>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="role">
                                    Select Role
                                </FormLabel>
                                <Select id="role" defaultValue="user">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="desc">
                                    Description
                                </FormLabel>
                                <Textarea id="desc" />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variantColor="blue">Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
