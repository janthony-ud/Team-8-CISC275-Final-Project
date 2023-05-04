import React, { useState } from "react";
import { useEffect } from "react";
import { Movie } from "../interfaces/movie";
import { userMovie } from "../interfaces/userMovie";
import "./UserList.css";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/core";
import { User } from "../interfaces/user";
import {
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/core";

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

    return (
        <div>
            <h1> {user.name}s Movies </h1>
            <p>Drag movies here to add them to your list</p>
            <div
                className="userlist"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {userMovies.map((movie, index) => (
                    <div className="droppedMovie" key={movie.id}>
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
                                        <Box>
                                            <div className="movie-rating">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="5"
                                                    value={movie.user_rating}
                                                    onChange={(event) =>
                                                        handleRatingChange(
                                                            index,
                                                            parseInt(
                                                                event.target
                                                                    .value
                                                            )
                                                        )
                                                    }
                                                />
                                                <div>
                                                    {[
                                                        ...Array(
                                                            movie.user_rating
                                                        )
                                                    ].map((_, starIndex) => (
                                                        <span
                                                            key={starIndex}
                                                            className="star yellow"
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="remove-movie">
                                                <button
                                                    onClick={() =>
                                                        removeMovie(movie.id)
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourList;
