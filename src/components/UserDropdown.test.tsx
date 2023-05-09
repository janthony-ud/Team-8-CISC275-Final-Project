import React from "react";
import { render, screen } from "@testing-library/react";
import UserDropdown from "./CentralList";
import { ThemeProvider } from "@chakra-ui/core/dist";
// THIS COMPONENT IS NEVER CALLED ANYWHERE
const testUser = {
    name: "bob",
    userMovieList: [],
    role: "user"
};
describe("User List Tests", () => {
    test("form is not rendered?", () => {
        render(
            <ThemeProvider>
                <UserDropdown user={testUser} />
            </ThemeProvider>
        );
        const form = screen.queryByLabelText("form");
        expect(form).toBeNull();
    });
});
