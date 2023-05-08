import React from "react";
import {
    fireEvent,
    getAllByRole,
    render,
    screen
} from "@testing-library/react";
import { CentralList } from "./CentralList";
import { ThemeProvider } from "@chakra-ui/core/dist";
import movieList from "../data/movieList.json";

/**
 * Things to test in this file:
 * - presence of NewMovieButton
 * - Sort Menu
 *     - MenuButton is present,
 *       options are hidden unitl clicked
 * - Movie List
 *   - each movie in list is displayed
 *   - clicking each movie shows description and cast
 *   - movies are displayed in sorted order
 */
describe("Central List Component Tests", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <CentralList />
            </ThemeProvider>
        );
    });
    test("renders NewMovieButton component", () => {
        const newMovieButtonComponent = screen.getByText("New Movie");
        expect(newMovieButtonComponent).toBeInTheDocument();
    });
    test("sort menu button is present", () => {
        const sortButton = screen.getByText("Sort");
        expect(sortButton).toBeInTheDocument();
    });
    // test("correct number of movies rendered", () => {
    //     const movies = screen.getAllByRole("button", {
    //         name: /rur/i
    //     });
    //     expect(movies).toHaveLength(movieList.length);
    // });
});
