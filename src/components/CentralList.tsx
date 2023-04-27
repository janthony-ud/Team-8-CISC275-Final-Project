import React from "react";
import { Box, Image, Flex, Badge, Text } from "@chakra-ui/core";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useState } from "react";

export function makeNewMovie(
    image: string,
    title: string,
    description: string,
    maturity_rating: string,
    cast: string[],
    genre: string[],
    user_rating: number
): Movie {
    return {
        image: image,
        title: title,
        description: description,
        maturity_rating: maturity_rating,
        cast: cast,
        genre: genre,
        user_rating: user_rating
    };
}

export function CentralList(): JSX.Element {
    const [movies] = useState<Movie[]>(
        movieList.map((movie) => {
            return {
                image: movie.image,
                title: movie.name,
                description: movie.desc,
                maturity_rating: movie.age,
                cast: movie.cast,
                genre: movie.genre,
                user_rating: 1
            };
        })
    );

    function handleOnDrag(e: React.DragEvent, widgetType: Movie) {
        e.dataTransfer.setData("widgetType", JSON.stringify(widgetType));
    }

    return (
        <div>
            <h1>Central Movie List</h1>

            <div className="col">
                {movies.map((movie) => (
                    <div key={movie.title}>
                        <div
                            draggable
                            onDragStart={(e) => handleOnDrag(e, movie)}
                        >
                            <div className="border">
                                <Box p="5" maxW="320px" borderWidth="1px">
                                    <Image
                                        borderRadius="md"
                                        src={movie.image}
                                        alt={movie.title}
                                    />
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
                                </Box>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/*             const newMovie = makeNewMovie(
                movie.image,
                movie.title,
                movie.description,
                movie.maturity_rating,
                movie.cast,
                movie.genre,
                movie.user_rating
            );  */
