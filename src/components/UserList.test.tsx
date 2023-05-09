import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserList from "./CentralList";
import { ThemeProvider } from "@chakra-ui/core/dist";
import { Movie } from "../interfaces/movie";

const testUser = {
    name: "test user",
    userMovieList: [],
    role: "user"
};

const mockMovie: Movie = {
    image: "",
    title: "A Movie",
    description: "Test description",
    maturity_rating: "PG",
    cast: ["Bob", "Mary", "Jim"],
    genre: ["Adventure"],
    user_rating: 0
};

describe("User List Tests", () => {
    test("renders Sort button for user", () => {
        render(
            <ThemeProvider>
                <UserList user={testUser} />
            </ThemeProvider>
        );
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("dropdown options visible aft button click", () => {
        render(
            <ThemeProvider>
                <UserList user={testUser} />
            </ThemeProvider>
        );
        const sortBtn = screen.getByText("Sort");
        fireEvent.click(sortBtn);
        const sortTitle = screen.getByText("Title");
        const sortMaturity = screen.getByText("Maturity");
        expect(sortTitle).toBeInTheDocument();
        expect(sortMaturity).toBeInTheDocument();
    });
    test("renders a dropped movie and adds it to admin list", async () => {
        render(
            <ThemeProvider>
                <UserList user={testUser} />
            </ThemeProvider>
        );

        await waitFor(() => {
            const dropZone = screen.queryByLabelText("userdropzone");
            if (dropZone !== null) {
                console.log("found dropzone");
                fireEvent.drop(dropZone, {
                    dataTransfer: {
                        getData: () => JSON.stringify(mockMovie),
                        tyeps: ["text/plain"],
                        setData: () => {
                            console.log("setting movie");
                        }
                    }
                });
            }
        });

        console.log("testing");
        const droppedMovie = screen.getByText("A Movie");
        expect(droppedMovie).toBeInTheDocument();
    });
});
