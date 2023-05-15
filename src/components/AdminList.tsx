import React, { useEffect, useState } from "react";
import { Movie } from "../interfaces/movie";
import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/core";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/core";
import "./AdminList.css";

interface Props {
    movieState: Movie[];
    onMovieUpdate: (updatedMovies: Movie[]) => void;
}

const AdminList: React.FC<Props> = ({ movieState, onMovieUpdate }) => {
    const blankMovie: Movie = {
        image: "",
        title: "",
        description: "",
        maturity_rating: "",
        cast: [],
        genre: [],
        user_rating: 0
    };

    const [adminMovies, setAdminMovies] = useState<Movie[]>(() => {
        const storedMovies = localStorage.getItem("adminMovies");
        if (storedMovies) {
            return JSON.parse(storedMovies);
        } else {
            return [blankMovie];
        }
    });

    const [editMovie, setEditMovie] = useState<boolean[]>(() => {
        const storedEditMovie = localStorage.getItem("editMovie");
        if (storedEditMovie) {
            return JSON.parse(storedEditMovie);
        } else {
            return [false];
        }
    });
    useEffect(() => {
        setEditMovie(Array(adminMovies.length).fill(false));
    }, [adminMovies.length]);

    useEffect(() => {
        localStorage.setItem("adminMovies", JSON.stringify(adminMovies));
    }, [adminMovies]);

    useEffect(() => {
        localStorage.setItem("editMovie", JSON.stringify(editMovie));
    }, [editMovie]);

    useEffect(() => {
        const storedMovies = localStorage.getItem("adminMovies");
        if (storedMovies) {
            setAdminMovies(JSON.parse(storedMovies));
        } else {
            setAdminMovies([blankMovie]);
        }

        const storedEditMovie = localStorage.getItem("editMovie");
        if (storedEditMovie) {
            setEditMovie(JSON.parse(storedEditMovie));
        } else {
            setEditMovie([false]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("adminMovies", JSON.stringify(adminMovies));
    }, [adminMovies]);

    useEffect(() => {
        localStorage.setItem("editMovie", JSON.stringify(editMovie));
    }, [editMovie]);
    const [selectedMovie, selectMovie] = useState<Movie>(blankMovie);
    const [image, updateImage] = useState<string>(selectedMovie.image);
    const [title, updateTitle] = useState<string>(selectedMovie.title);
    const [prevTitle, setPrevTitle] = useState<string>("");
    const [description, updateDescription] = useState<string>(
        selectedMovie.description
    );
    const [maturity_rating, updateMaturityRating] = useState<string>(
        selectedMovie.maturity_rating
    );
    const [cast, updateCast] = useState<string[]>(selectedMovie.cast);
    const [genre, updateGenre] = useState<string[]>(selectedMovie.genre);

    function handleCastChange(e: React.ChangeEvent<HTMLInputElement>) {
        const castList = e.target.value.split(",");
        updateCast(castList);
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLInputElement>) {
        const genreList = e.target.value.split(",");
        updateGenre(genreList);
    }

    function handleEditMovie(e: React.ChangeEvent<HTMLInputElement>) {
        const movieName = e.target.id;
        const movieIndex = adminMovies.findIndex(
            (movie: Movie): boolean => movie.title === movieName
        );

        setEditMovie([
            ...editMovie.slice(0, movieIndex),
            e.target.checked,
            ...editMovie.slice(movieIndex + 1)
        ]);

        if (movieIndex !== -1) {
            const selectedMovie = adminMovies[movieIndex];
            selectMovie(selectedMovie);
            updateImage(selectedMovie.image);
            updateTitle(selectedMovie.title);
            updateDescription(selectedMovie.description);
            updateMaturityRating(selectedMovie.maturity_rating);
            updateCast(selectedMovie.cast);
            updateGenre(selectedMovie.genre);
            handleMovieUpdate(selectedMovie);
        } else {
            selectMovie(blankMovie);
            updateImage("");
            updateTitle("");
            updateDescription("");
            updateMaturityRating("");
            updateCast([]);
            updateGenre([]);
        }
    }

    useEffect(() => {
        const check_true = editMovie.some((edit: boolean): boolean => edit);
        if (check_true) {
            const check_index = editMovie.findIndex(
                (edit: boolean): boolean => edit
            );
            console.log(adminMovies[check_index].genre);
            selectMovie(adminMovies[check_index]);
            updateImage(adminMovies[check_index].image);
            updateTitle(adminMovies[check_index].title);
            updateDescription(adminMovies[check_index].description);
            updateMaturityRating(adminMovies[check_index].maturity_rating);
            updateCast(adminMovies[check_index].cast);
            updateGenre(adminMovies[check_index].genre);
        }
    }, [selectedMovie && editMovie]);

    useEffect(() => {
        selectMovie({
            image: image,
            title: title,
            description: description,
            maturity_rating: maturity_rating,
            cast: cast,
            genre: genre,
            user_rating: 1
        });
    }, [image, title, description, maturity_rating, cast, genre]);

    useEffect(() => {
        const check_true = editMovie.some((edit: boolean): boolean => edit);
        if (check_true) {
            const check_index = editMovie.findIndex(
                (edit: boolean): boolean => edit
            );
            setAdminMovies([
                ...adminMovies.slice(0, check_index),
                selectedMovie,
                ...adminMovies.slice(check_index + 1)
            ]);
        }
    }, [selectedMovie]);

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        const duplicates = adminMovies.some(
            (movie: Movie): boolean => movie.title === widgetType.title
        );
        console.log(duplicates);
        if (!duplicates) {
            setAdminMovies([...adminMovies, widgetType]);
            setEditMovie([...editMovie, false]);
            localStorage.setItem(
                "adminMovies",
                JSON.stringify([...adminMovies, widgetType])
            );
        }
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    const handleMovieUpdate = (updatedMovie: Movie) => {
        // Find the index of the movie in the movieState
        const movieIndex = movieState.findIndex(
            (movie) => movie.title === prevTitle
        );

        if (movieIndex !== -1) {
            // Create a new array with the updated movie
            const updatedMovies = [...movieState];
            updatedMovies[movieIndex] = updatedMovie;

            // Call the callback function passed from the parent component to update the central list
            onMovieUpdate(updatedMovies);
        }
    };

    function handlePrevTitle(movie: Movie) {
        setPrevTitle(movie.title);
    }

    return (
        <div>
            <h1> Movies to be Reviewed </h1>
            <p>Drag Movies to add them to the Review List</p>
            <div
                className="adminlist"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
                data-testid="dropzone"
                aria-label="dropzone"
                id="dropzone"
            >
                {adminMovies.map((movie, movie_index) => (
                    <div className="droppedMovie" key={movie_index}>
                        <div className="border">
                            <AccordionItem>
                                <AccordionHeader>
                                    <Box width="100%" alignContent="left">
                                        <Box>
                                            <Image
                                                borderRadius="md"
                                                src={movie.image}
                                                alt={movie.title}
                                            />
                                            <Text
                                                mt={2}
                                                fontSize="xl"
                                                fontWeight="semibold"
                                            >
                                                {movie.title}
                                            </Text>
                                        </Box>

                                        <Box>
                                            {" "}
                                            <Text
                                                ml={2}
                                                textTransform="uppercase"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                color="pink.800"
                                            >
                                                {movie.genre.join(" & ")}
                                            </Text>
                                            <Badge color="red">
                                                {movie.maturity_rating}
                                            </Badge>
                                        </Box>
                                        <AccordionIcon />
                                    </Box>
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    <Text mt={2}>{movie.description}</Text>
                                    <Flex mt={2} align="center">
                                        <Text ml={1} fontSize="sm">
                                            <b>{movie.cast.join(" , ")}</b>
                                        </Text>
                                    </Flex>
                                </AccordionPanel>
                            </AccordionItem>
                        </div>

                        <div>
                            {" "}
                            {editMovie.map((edit, edit_index) =>
                                movie_index === edit_index ? (
                                    <div className="editCheck" key={edit_index}>
                                        <FormCheck
                                            type="switch"
                                            id={movie.title}
                                            label="Edit Movie"
                                            disabled={
                                                editMovie.some(
                                                    (edit: boolean): boolean =>
                                                        edit
                                                ) && !editMovie[edit_index]
                                            }
                                            checked={editMovie[edit_index]}
                                            onChange={handleEditMovie}
                                            onClick={() =>
                                                handlePrevTitle(movie)
                                            }
                                        ></FormCheck>
                                    </div>
                                ) : null
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formImage">
                                    <FormLabel>Image: </FormLabel>
                                    <FormControl
                                        name="image"
                                        type="text"
                                        value={image}
                                        onChange={(e) =>
                                            updateImage(e.target.value)
                                        }
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formTitle">
                                    <FormLabel>Title: </FormLabel>
                                    <FormControl
                                        name="title"
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            updateTitle(e.target.value)
                                        }
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formDescription">
                                    <FormLabel>Description: </FormLabel>
                                    <FormControl
                                        name="description"
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            updateDescription(e.target.value)
                                        }
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formMaturityRating">
                                    <FormLabel>Maturity Rating: </FormLabel>
                                    <FormControl
                                        name="maturity_rating"
                                        type="text"
                                        value={maturity_rating}
                                        onChange={(e) =>
                                            updateMaturityRating(e.target.value)
                                        }
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formCast">
                                    <FormLabel>Cast: </FormLabel>
                                    <FormControl
                                        name="cast"
                                        type="text"
                                        value={cast.join(",")}
                                        onChange={handleCastChange}
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                        <div>
                            {editMovie[movie_index] && (
                                <FormGroup controlId="formGenre">
                                    <FormLabel>Genre: </FormLabel>
                                    <FormControl
                                        name="genre"
                                        type="text"
                                        value={genre.join(",")}
                                        onChange={handleGenreChange}
                                    ></FormControl>
                                </FormGroup>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default AdminList;
