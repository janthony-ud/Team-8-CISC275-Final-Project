import React from "react";
import { User } from "../interfaces/user";
//import ReactDOM from "react-dom";
//import { userMovie } from "../interfaces/userMovie";
import { ThemeProvider } from "@chakra-ui/core";
import { render, screen } from "@testing-library/react";
import NewUserButton from "./NewUserButton";

//const mockusers = ["alice", "bob", "charlie"];

describe("New User Button component tests", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <NewUserButton
                    onSubmit={function (newUser: User): void {
                        throw new Error("Function not implemented.");
                    }}
                ></NewUserButton>
            </ThemeProvider>
        );
    });

    test("new-user-button appears on screen", () => {
        const nub = screen.getByRole("button", {
            name: /Create A New User:/i
        });
        expect(nub).toBeInTheDocument();
    });
    /*
    test("clicking button takes you to new web page", () => {
        const nub = screen.getByRole("button", {
            name: /Create A New User:/i
        });
        fireEvent.click(nub);
        //const newWindow = screen.getByTestId("Create a New User");
        //expect().toBeInTheDocument();
        //Need to figure out how to test a new window is opening in jest
    });
    */
});
