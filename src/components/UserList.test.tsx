import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import UserList from "./CentralList";
import { ThemeProvider } from "@chakra-ui/core/dist";
import { Movie } from "../interfaces/movie";

const testUser = {
    name: "test user",
    userMovieList: [],
    role: "user"
};

// const mockMovie: Movie = {
//     image: "",
//     title: "A Movie",
//     description: "Test description",
//     maturity_rating: "PG",
//     cast: ["Bob", "Mary", "Jim"],
//     genre: ["Adventure"],
//     user_rating: 0
// };

const mockList: Movie[] = [
    {
        image: "",
        title: "A Movie",
        description: "Test description",
        maturity_rating: "PG",
        cast: ["Bob", "Mary", "Jim"],
        genre: ["Adventure"],
        user_rating: 0
    },
    {
        image: "",
        title: "C Movie",
        description: "Test description",
        maturity_rating: "G",
        cast: ["Bob", "Mary", "Jim"],
        genre: ["Adventure"],
        user_rating: 0
    },
    {
        image: "",
        title: "B Movie",
        description: "Test description",
        maturity_rating: "R",
        cast: ["Bob", "Mary", "Jim"],
        genre: ["Adventure"],
        user_rating: 0
    }
];

describe("User List Tests", () => {
    test("renders Sort button for user", () => {
        render(
            <ThemeProvider>
                <UserList user={testUser} handling={""} />
            </ThemeProvider>
        );
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("dropdown options visible aft button click", () => {
        render(
            <ThemeProvider>
                <UserList user={testUser} handling={""} />
            </ThemeProvider>
        );
        const dropZone = screen.queryByLabelText("dropzone");
        if (dropZone !== null) {
            console.log("found dropzone");
            fireEvent.drop(dropZone, {
                dataTransfer: {
                    getData: () => JSON.stringify(mockList),
                    types: ["text/plain"],
                    setData: () => {
                        console.log("setting movies");
                    }
                }
            });
        }
        const sortBtn = screen.getByText("Sort");
        fireEvent.click(sortBtn);
        const sortTitle = screen.getByText("Title");
        fireEvent.click(sortTitle);
    });
});
