import React from "react";
import { render, screen } from "@testing-library/react";
import { CentralList } from "./CentralList";

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
    test("renders NewMovieButton component", () => {
        render(<CentralList />);
        const newMovieButtonComponent = screen.getByTestId("new-movie-button");
        expect(newMovieButtonComponent).toBeInTheDocument();
    });
});
