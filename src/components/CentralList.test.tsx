import React from "react";
import {
    fireEvent,
    getAllByRole,
    render,
    screen
} from "@testing-library/react";
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
        render(<CentralList user={testSuper} />);
        const newMovie = screen.getByText("New Movie");
        expect(newMovie).toBeInTheDocument();
    });
    test("does not render NewMovieButton if admin", () => {
        render(<CentralList user={testAdmin} />);
        const newMovie = screen.getByText("New Movie");
        expect(newMovie).not.toBeInTheDocument();
    });
    test("does not render NewMovieButton if user", () => {
        render(<CentralList user={testUser} />);
        const newMovie = screen.getByText("New Movie");
        expect(newMovie).not.toBeInTheDocument();
    });
    test("renders Remove Movie if superuser", () => {
        render(<CentralList user={testSuper} />);
        const remove = screen.getByText("Remove Movie");
        expect(remove).toBeInTheDocument();
    });
    test("does not render Remove Movie if admin", () => {
        render(<CentralList user={testAdmin} />);
        const remove = screen.getByText("Remove Movie");
        expect(remove).not.toBeInTheDocument();
    });
    test("does not render Remove Movie if user", () => {
        render(<CentralList user={testUser} />);
        const remove = screen.getByText("Remove Movie");
        expect(remove).not.toBeInTheDocument();
    });
    test("renders Sort button for super", () => {
        render(<CentralList user={testSuper} />);
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("renders Sort button for admin", () => {
        render(<CentralList user={testAdmin} />);
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("renders Sort button for super", () => {
        render(<CentralList user={testAdmin} />);
        const sort = screen.getByText("Sort");
        expect(sort).toBeInTheDocument();
    });
    test("dropdown options visible aft button click", () => {
        render(<CentralList user={testUser} />);
        const sortBtn = screen.getByText("Sort");
        fireEvent.click(sortBtn);
        const sortTitle = screen.getByText("Title");
        const sortMaturity = screen.getByText("Maturity");
        expect(sortTitle).toBeInTheDocument();
        expect(sortMaturity).toBeInTheDocument();
    });
});
