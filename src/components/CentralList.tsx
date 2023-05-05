import React from "react";
import {
    Box,
    Image,
    Flex,
    Badge,
    Text,
    Menu,
    MenuButton,
    Button,
    MenuItem,
    MenuList
} from "@chakra-ui/core";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { MdMovieFilter } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useState } from "react";
import NewMovieButton from "./NewMovieButton";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/core";

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
    const [movies, setMovies] = useState<Movie[]>(
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

    const [selected, setSelected] = useState<string>("");

    function handleSortTitle() {
        setSelected("Title");
        const sorted = [...movies].sort((a, b) => {
            return a.title > b.title ? 1 : -1;
        });
        setMovies(sorted);
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
        const sorted = movies.sort(
            (a, b) =>
                ratingOrder[a.maturity_rating] - ratingOrder[b.maturity_rating]
        );
        console.log(sorted);
        setMovies(sorted);
    }

    return (
        <div>
            <NewMovieButton
                data-testid="new-movie-button"
                onSubmit={function (newMovie: Movie): void {
                    setMovies((prevMovies) => [...prevMovies, newMovie]);
                }}
            ></NewMovieButton>
            <h1>Central Movie List</h1>
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
                </MenuList>
            </Menu>
            <Accordion defaultIndex={[0]} allowMultiple>
                <div className="col">
                    {movies.map((movie) => (
                        <div key={movie.title}>
                            <div
                                draggable
                                onDragStart={(e) => handleOnDrag(e, movie)}
                            >
                                <div className="border">
                                    <AccordionItem>
                                        <AccordionHeader>
                                            <Box
                                                width="100%"
                                                alignContent="left"
                                            >
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
                                                        {movie.genre.join(
                                                            " & "
                                                        )}
                                                    </Text>
                                                    <Badge color="red">
                                                        {movie.maturity_rating}
                                                    </Badge>
                                                </Box>
                                                <AccordionIcon />
                                            </Box>
                                        </AccordionHeader>
                                        <AccordionPanel pb={4}>
                                            <Text mt={2}>
                                                {movie.description}
                                            </Text>
                                            <Flex mt={2} align="center">
                                                <Text ml={1} fontSize="sm">
                                                    <b>
                                                        {movie.cast.join(" , ")}
                                                    </b>
                                                </Text>
                                            </Flex>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Accordion>
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
