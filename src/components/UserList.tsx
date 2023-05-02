import React, { useState } from "react";
import { useEffect } from "react";
import { Movie } from "../interfaces/movie";
import { userMovie } from "../interfaces/userMovie";
import "./UserList.css";
import {
    Box,
    Image,
    Flex,
    Badge,
    Text,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem
} from "@chakra-ui/core";
import { User } from "../interfaces/user";
import { AiFillCaretDown, AiFillStar } from "react-icons/ai";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { MdMovieFilter } from "react-icons/md";

interface Props {
    user: User;
}

const YourList: React.FC<Props> = ({ user }) => {
    const [userMovies, setUserMovies] = useState<userMovie[]>([]);

    useEffect(() => {
        const storedMovies = localStorage.getItem(`userMovieList-${user.name}`);
        if (storedMovies) {
            setUserMovies(JSON.parse(storedMovies));
        } else {
            setUserMovies(user.userMovieList);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify(userMovies)
        );
    }, [userMovies, user]);

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        const newMovie: userMovie = { ...widgetType, id: userMovies.length };
        setUserMovies([...userMovies, newMovie]);
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify([...userMovies, newMovie])
        );
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    const handleRatingChange = (movieIndex: number, rating: number) => {
        setUserMovies((prevMovies) => {
            const updatedMovies = [...prevMovies];
            updatedMovies[movieIndex] = {
                ...updatedMovies[movieIndex],
                user_rating: rating
            };
            return updatedMovies;
        });
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify(userMovies)
        );
    };

    function removeMovie(id: number): void {
        setUserMovies(
            [...userMovies].filter((userMovie) => userMovie.id !== id)
        );
        localStorage.setItem(
            "userMovieList",
            JSON.stringify(
                [...userMovies].filter((userMovie) => userMovie.id !== id)
            )
        );
    }

    const [selected, setSelected] = useState<string>("");

    function handleSortTitle() {
        setSelected("Title");
        const sorted = [...userMovies].sort((a, b) => {
            return a.title > b.title ? 1 : -1;
        });
        setUserMovies(sorted);
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify(userMovies)
        );
    }

    function handleSortMaturity() {
        console.log("called maturity");
        setSelected("Maturity");
        const ratingOrder: { [key: string]: number } = {
            "G ": 1,
            "PG ": 2,
            "PG-13 ": 3,
            "R ": 4
        };
        const sorted = userMovies.sort(
            (a, b) =>
                ratingOrder[a.maturity_rating] - ratingOrder[b.maturity_rating]
        );
        console.log(sorted);
        setUserMovies(sorted);
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify(userMovies)
        );
    }

    function handleSortRating() {
        setSelected("Rating");
        const sorted = [...userMovies].sort((a, b) => {
            return a.user_rating > b.user_rating ? 1 : -1;
        });
        setUserMovies(sorted);
        localStorage.setItem(
            `userMovieList-${user.name}`,
            JSON.stringify(userMovies)
        );
    }
    return (
        <div>
            <h1> {user.name}s Movies </h1>
            <p>Drag movies here to add them to your list</p>
            <Menu>
                <MenuButton as={Button}>
                    {selected == "" ? (
                        <div>
                            Sort <AiFillCaretDown />
                        </div>
                    ) : (
                        <div>Sorted By: {selected}</div>
                    )}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleSortTitle}>
                        Title <FcAlphabeticalSortingAz />
                    </MenuItem>
                    <MenuItem onClick={handleSortMaturity}>
                        Maturity <MdMovieFilter />
                    </MenuItem>
                    <MenuItem onClick={handleSortRating}>
                        Rating <AiFillStar />
                    </MenuItem>
                </MenuList>
            </Menu>
            <div
                className="col drop-area"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {userMovies.map((movie, index) => (
                    <div className="droppedMovie" key={movie.id}>
                        <div className="border">
                            <Box p="5" maxW="320px" borderWidth="1px">
                                <div className="image">
                                    <Image
                                        borderRadius="md"
                                        src={movie.image}
                                        alt={movie.title}
                                    />
                                </div>
                                <Flex align="baseline" mt={2}>
                                    <Badge color="pink">
                                        {movie.maturity_rating}
                                    </Badge>
                                    <Text
                                        ml={2}
                                        textTransform="uppercase"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        color="pink.800"
                                    >
                                        {movie.genre.join(" & ")}
                                    </Text>
                                </Flex>
                                <Text
                                    mt={2}
                                    fontSize="xl"
                                    fontWeight="semibold"
                                    lineHeight="short"
                                >
                                    {movie.title}
                                </Text>
                                <Text mt={2}>{movie.description}</Text>
                                <Flex mt={2} align="center">
                                    <Text ml={1} fontSize="sm">
                                        <b>{movie.cast.join(" , ")}</b>
                                    </Text>
                                </Flex>
                                <div className="movie-rating">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={movie.user_rating}
                                        onChange={(event) =>
                                            handleRatingChange(
                                                index,
                                                parseInt(event.target.value)
                                            )
                                        }
                                    />
                                    <div>
                                        {[...Array(movie.user_rating)].map(
                                            (_, starIndex) => (
                                                <span
                                                    key={starIndex}
                                                    className="star yellow"
                                                >
                                                    ★
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="remove-movie">
                                    <button
                                        onClick={() => removeMovie(movie.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </Box>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourList;
