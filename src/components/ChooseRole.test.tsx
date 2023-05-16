import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";
import { ChooseUser } from "./ChooseRole";

describe("ChooseRole Component Tests", () => {
    test("remove user button doesn't appear for user/admin", () => {
        render(
            <ThemeProvider>
                <ChooseUser />
            </ThemeProvider>
        );
        expect(screen.queryByText("Delete User")).toBeNull();
    });
    // test("changes the current user when an avatar is clicked", () => {
    //     const { getByText, getByLabelText } = render(<ChooseUser />);
    //     const userAvatar = getByLabelText("User Avatar: User 2");
    //     fireEvent.click(userAvatar);
    //     expect(getByText("Current User: User 2")).toBeInTheDocument();
    // });
});
