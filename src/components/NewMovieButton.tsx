import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
import { Button } from "@chakra-ui/core";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Textarea
} from "@chakra-ui/core";
import { useDisclosure } from "@chakra-ui/core";
import { Box, Stack, Select, FormLabel, Input } from "@chakra-ui/core";
import { useToast } from "@chakra-ui/core";
import { Checkbox } from "@chakra-ui/core";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/core";

interface NewMovieFormProps {
    onSubmit: (newMovie: Movie) => void;
}

const NewMovieDrawer: React.FC<NewMovieFormProps> = ({ onSubmit }) => {
    const {
        isOpen: isOpenForm,
        onOpen: onOpenForm,
        onClose: onCloseForm
    } = useDisclosure();
    const {
        isOpen: isOpenModal,
        onOpen: onOpenModal,
        onClose: onCloseModal
    } = useDisclosure();

    const btnRef = React.useRef();
    const [image, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [maturity_rating, setMaturityRating] = useState("");
    const [cast, setCast] = useState<string[]>([]);
    const [genre, setGenres] = useState<string[]>([]);
    const [user_rating, setUserRating] = useState(1);

    const handleCastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const castList = event.target.value.split(",");
        setCast(castList);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;

        if (checked) {
            setGenres((prevGenres) => [...prevGenres, value]);
        } else {
            setGenres((prevGenres) =>
                prevGenres.filter((genre) => genre !== value)
            );
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newMovie: Movie = {
            image,
            title,
            description,
            maturity_rating,
            cast,
            genre,
            user_rating
        };
        onSubmit(newMovie);
        setTitle("");
        setImageUrl("");
        setDescription("");
        setMaturityRating("");
        setCast([]);
        setGenres([]);
        setUserRating(1);
    };
    //  const firstField = React.useRef();

    function handleMovieTitle(e: React.ChangeEvent<HTMLInputElement>) {
        const title = e.target.value;
        setTitle(title);
    }

    function handleMovieImage(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.target.value;
        setImageUrl(url);
    }

    function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
        const desc = e.target.value;
        setDescription(desc);
    }

    const toast = useToast();

    return (
        <>
            <Button
                ref={btnRef}
                leftIcon="add"
                variantColor="teal"
                onClick={onOpenForm}
            >
                Create New Movie
            </Button>
            <Drawer
                isOpen={isOpenForm}
                placement="right"
                //   initialFocusRef={firstField}
                //   finalFocusRef={btnRef}
                onClose={onCloseForm}
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
                                        Title:
                                    </FormLabel>
                                    <Input
                                        id="title"
                                        placeholder="Enter Movie Title:"
                                        type="text"
                                        onChange={handleMovieTitle}
                                    ></Input>
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="URL">Name</FormLabel>
                                    <Input
                                        id="URL"
                                        placeholder="Enter Image URL:"
                                        type="text"
                                        onChange={handleMovieImage}
                                    ></Input>
                                </Box>

                                <Box>
                                    <FormLabel htmlFor="desc">
                                        Description:
                                    </FormLabel>
                                    <Textarea
                                        id="desc"
                                        onChange={handleDescription}
                                    />
                                </Box>

                                <Box>
                                    <FormLabel htmlFor="maturity_rating">
                                        Select Maturity Rating
                                    </FormLabel>
                                    <Select
                                        id="maturity_rating"
                                        defaultValue="PG"
                                        onChange={(e) =>
                                            setMaturityRating(e.target.value)
                                        }
                                    >
                                        <option value="G">G</option>
                                        <option value="PG">PG</option>
                                        <option value="PG-13">PG-13</option>
                                        <option value="R">R</option>
                                        value={maturity_rating}
                                    </Select>
                                </Box>

                                <Box>
                                    <FormLabel htmlFor="cast">
                                        Enter Cast List
                                    </FormLabel>

                                    <Input
                                        type="text"
                                        value={cast.join(",")}
                                        onChange={handleCastChange}
                                    ></Input>
                                </Box>

                                <Box>
                                    <div>
                                        <FormLabel htmlFor="genre">
                                            Select Genres
                                        </FormLabel>
                                    </div>
                                    <>
                                        <Button onClick={onOpenModal}>
                                            Open Genres
                                        </Button>

                                        <Modal
                                            isOpen={isOpenModal}
                                            onClose={onCloseModal}
                                        >
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>
                                                    Select Genres:
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Checkbox
                                                        value="action"
                                                        isChecked={genre.includes(
                                                            "action"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Action
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="adventure"
                                                        isChecked={genre.includes(
                                                            "adventure"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Adventure
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="biography"
                                                        isChecked={genre.includes(
                                                            "biography"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Biography
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="comedy"
                                                        isChecked={genre.includes(
                                                            "comedy"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Comedy
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="drama"
                                                        isChecked={genre.includes(
                                                            "drama"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Drama
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="crime"
                                                        isChecked={genre.includes(
                                                            "crime"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Crime
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="family"
                                                        isChecked={genre.includes(
                                                            "family"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Family
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="fantasy"
                                                        isChecked={genre.includes(
                                                            "fantasy"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Fantasy
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="horror"
                                                        isChecked={genre.includes(
                                                            "horror"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Horror
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="mystery"
                                                        isChecked={genre.includes(
                                                            "mystery"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Mystery
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="sport"
                                                        isChecked={genre.includes(
                                                            "sport"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Sport
                                                    </Checkbox>
                                                    <Checkbox
                                                        value="thriller"
                                                        isChecked={genre.includes(
                                                            "thriller"
                                                        )}
                                                        onChange={
                                                            handleGenreChange
                                                        }
                                                    >
                                                        Thriller
                                                    </Checkbox>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button
                                                        variantColor="blue"
                                                        mr={3}
                                                        onClick={onCloseModal}
                                                    >
                                                        Save & Close
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </>
                                </Box>
                            </Stack>
                        </DrawerBody>

                        <DrawerFooter borderTopWidth="1px">
                            <Button
                                variant="outline"
                                mr={3}
                                onClick={onCloseForm}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variantColor="blue"
                                onClick={() =>
                                    toast({
                                        title: "New Movie created.",
                                        description:
                                            "We've created your new movie.",
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
export default NewMovieDrawer;
/* 
            <br />
            <label>
                Cast:
                <input
                    type="text"
                    value={cast.join(",")}
                    onChange={handleCastChange}
                />
            </label>
            <br />
            <label>
                Genres:
                <input
                    type="text"
                    value={genre.join(",")}
                    onChange={handleGenreChange}
                />
            </label>
            <br />
            <button type="submit">Add Movie</button>
        </form> */
