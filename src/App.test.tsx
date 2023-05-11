import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("App Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("renders names", () => {
        expect(
            screen.getByText(
                "Team 8: Justin Anthony, Meghan Gamble, Brad Daughtery, Jakeb Milburn, Ryan Sanchez"
            )
        ).toBeInTheDocument();
    });
    test("renders chosen user", () => {
        expect(
            screen.getByText("Welcome", { exact: false })
        ).toBeInTheDocument();
    });
    test("renders logo", () => {
        expect(screen.getByAltText("Movieo Logo")).toBeInTheDocument();
    });
    // test("doesn't render central list yet", () => {
    //     expect(
    //         screen.queryByText("Central Movie List")
    //     ).not.toBeInTheDocument();
    // });
    test("doesn't render user list yet", () => {
        expect(
            screen.queryByText("Drag movies here to add them to your list")
        ).not.toBeInTheDocument();
    });
});
