import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
import { userMovie } from "../interfaces/userMovie";
import "./UserList.css";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/core";

export function YourList(): JSX.Element {
    const [userMovies, setUserMovies] = useState<userMovie[]>([]);

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        const newMovie: userMovie = { ...widgetType, id: userMovies.length };
        setUserMovies([...userMovies, newMovie]);
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
    };

    function removeMovie(id: number): void {
        setUserMovies(
            [...userMovies].filter((userMovie) => userMovie.id !== id)
        );
    }

    return (
        <div>
            <h1> Your Movies </h1>
            <p>Drag movies here to add them to your list</p>
            <div
                className="col"
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
}

export default YourList;
