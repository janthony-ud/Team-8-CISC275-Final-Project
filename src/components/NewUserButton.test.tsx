import React from "react";
//import { User } from "../interfaces/user";
//import ReactDOM from "react-dom";
//import { userMovie } from "../interfaces/userMovie";
import { ThemeProvider } from "@chakra-ui/core";
import { fireEvent, render, screen } from "@testing-library/react";
import NewUserDrawer from "./NewUserButton";
import userEvent from "@testing-library/user-event";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockusers = [
    ["alice", [], "user"],
    ["bob", [], "user"],
    ["charlie", [], "admin"]
];

describe("New User Button component tests", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <NewUserDrawer
                    onSubmit={function (): void {
                        //mockusers = [...mockusers, newUser];
                    }}
                ></NewUserDrawer>
            </ThemeProvider>
        );
    });

    test("new-user-button appears on screen", () => {
        const nub = screen.getByRole("button", {
            name: /Create user/i
        });
        expect(nub).toBeInTheDocument();
    });

    test("clicking button opens drawer", () => {
        const nub = screen.getByRole("button", {
            name: /Create user/i
        });
        fireEvent.click(nub);
        const nubdrawer = screen.getByRole("dialog", {
            name: /Create a New User/i
        });
        expect(nubdrawer).toBeInTheDocument();
    });
    test("name and role values are initially null and user respectively", () => {
        const nub = screen.getByRole("button", {
            name: /Create user/i
        });
        fireEvent.click(nub);
        const defaultname = screen.getByRole("textbox", { name: /Name/i });
        const defaultrole = screen.getByRole("combobox", {
            name: /Select Role/i
        });
        expect(defaultname.textContent).toEqual("");
        expect(defaultrole.textContent).toEqual("UserAdminSupervalue=user");
    });
    test("inputting user name and clicking role adds that user to list of current users", () => {
        const nub = screen.getByRole("button", {
            name: /Create user/i
        });
        fireEvent.click(nub);
        const defaultname = screen.getByRole("textbox", { name: /Name/i });
        const defaultrole = screen.getByRole("combobox", {
            name: /Select Role/i
        });
        userEvent.type(defaultname, "Justin");
        userEvent.selectOptions(defaultrole, "admin");
        const submitbutton = screen.getByRole("button", {
            name: /Submit/i
        });
        fireEvent.click(submitbutton);
        //expect();
    });
});
