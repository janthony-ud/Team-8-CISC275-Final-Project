import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import CentralList from "./CentralList";
import { ThemeProvider } from "@chakra-ui/core/dist";
import movieList from "../data/movieList.json";
/**
 * Things to test in this file:
 * - presence of NewMovieButton if superuser
 * - remove movie button on accordion boxes if superuser
 * - Sort Menu
 *     - MenuButton is present,
 *       options are hidden unitl clicked
 * - Movie List
 *   - each movie in list is displayed
 *   - clicking each movie shows description and cast
 *   - movies are displayed in sorted order
 */
const testSuper = {
    name: "test super",
    userMovieList: [],
    role: "super"
};

const testAdmin = {
    name: "test admin",
    userMovieList: [],
    role: "admin"
};

const testUser = {
    name: "test user",
    userMovieList: [],
    role: "user"
};

describe("Central List Component Tests", () => {
    test("renders NewMovieButton if superuser", () => {
        render(
            <ThemeProvider>
                <CentralList user={testSuper} />
            </ThemeProvider>
        );
        const newMovie = screen.getByText("New Movie");
        expect(newMovie).toBeInTheDocument();
    });
    test("does not render NewMovieButton if admin", () => {
        render(
            <ThemeProvider>
                <CentralList user={testAdmin} />
            </ThemeProvider>
        );
        const newMovie = screen.queryByText("New Movie");
        expect(newMovie).not.toBeInTheDocument();
    });
    test("does not render NewMovieButton if user", () => {
        render(
            <ThemeProvider>
                <CentralList user={testUser} />
            </ThemeProvider>
        );
        const newMovie = screen.queryByText("New Movie");
        expect(newMovie).not.toBeInTheDocument();
    });
    test("renders Remove Movie if superuser", () => {
        render(
            <ThemeProvider>
                <CentralList user={testSuper} />
            </ThemeProvider>
        );
        const remove = screen.getAllByText("Remove Movie");
        expect(remove).toHaveLength(movieList.length);
    });
    test("does not render Remove Movie if admin", () => {
        render(
            <ThemeProvider>
                <CentralList user={testAdmin} />
            </ThemeProvider>
        );
        const remove = screen.queryByText("Remove Movie");
        expect(remove).not.toBeInTheDocument();
    });
    test("does not render Remove Movie if user", () => {
        render(
            <ThemeProvider>
                <CentralList user={testUser} />
            </ThemeProvider>
        );
        const remove = screen.queryByText("Remove Movie");
        expect(remove).not.toBeInTheDocument();
    });
    test("renders Sort button for super", () => {
        render(
            <ThemeProvider>
                <CentralList user={testSuper} />
            </ThemeProvider>
        );
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("renders Sort button for admin", () => {
        render(
            <ThemeProvider>
                <CentralList user={testAdmin} />
            </ThemeProvider>
        );
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("renders Sort button for super", () => {
        render(
            <ThemeProvider>
                <CentralList user={testAdmin} />
            </ThemeProvider>
        );
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("dropdown options visible aft button click", () => {
        render(
            <ThemeProvider>
                <CentralList user={testUser} />
            </ThemeProvider>
        );
        const sortBtn = screen.getByText("Sort");
        fireEvent.click(sortBtn);
        const sortTitle = screen.getByText("Title");
        const sortMaturity = screen.getByText("Maturity");
        expect(sortTitle).toBeInTheDocument();
        expect(sortMaturity).toBeInTheDocument();
    });
});
