import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";
import { ChooseUser } from "./ChooseRole";
//import { UserName } from "./Users";
//import initialUsers from "../data/initialUsers.json";

describe("ChooseRole Component Tests", () => {
    beforeEach(() => {
        render(
            <ThemeProvider>
                <ChooseUser />
            </ThemeProvider>
        );
    });
    test("remove user button doesn't appear for user/admin", () => {
        expect(screen.queryByText("Delete User")).toBeNull();
    });
    test("default text is shown, default user is home", () => {
        expect(
            screen.getByText("Welcome! Who's Browsing?")
        ).toBeInTheDocument();
    });
    test("different user buttons show up", () => {
        const meg = screen.getByLabelText("Meg");
        expect(meg).toBeInTheDocument();
        const brad = screen.getByLabelText("Brad");
        expect(brad).toBeInTheDocument();
        const justin = screen.getByLabelText("Justin");
        expect(justin).toBeInTheDocument();
        const jake = screen.getByLabelText("Jake");
        expect(jake).toBeInTheDocument();
        const ryan = screen.getByLabelText("Ryan");
        expect(ryan).toBeInTheDocument();
    });
    /*
    test("clicking meg brings you to super page", () => {
        const meg = screen.getByLabelText("Meg");
        fireEvent.click(meg);
        const newtab = screen.getByRole("tab");
        expect(newtab).toBeInTheDocument();
    });
    */
    // test("changes the current user when an avatar is clicked", () => {
    //     const { getByText, getByLabelText } = render(<ChooseUser />);
    //     const userAvatar = getByLabelText("User Avatar: User 2");
    //     fireEvent.click(userAvatar);
    //     expect(getByText("Current User: User 2")).toBeInTheDocument();
    // });
});
