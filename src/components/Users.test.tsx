import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { UserName } from "./Users";
import { ThemeProvider } from "@chakra-ui/core/dist";

describe("Users Tests", () => {
    const testNames = ["First", "Ryan", "Meg", "Brad", "Jake", "Justin"];
    beforeEach(() => {
        render(
            <ThemeProvider>
                <UserName Names={testNames} />
            </ThemeProvider>
        );
    });
    test("form renders", () => {
        expect(screen.getByLabelText("Choose Your Name")).toBeInTheDocument();
    });
    test("form populates with names", () => {
        testNames.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
    test("user switches when selected", () => {
        const selectElement = screen.getByLabelText(
            "Choose Your Name"
        ) as HTMLSelectElement;
        act(() => {
            fireEvent.change(selectElement, { target: { value: "Meg" } });
        });
        expect(selectElement.value).toBe("Meg");
        act(() => {
            fireEvent.change(selectElement, { target: { value: "Ryan" } });
        });
        expect(selectElement.value).toBe("Ryan");
    });
    test("initially renders with first name value selected", () => {
        const selectElement = screen.getByLabelText(
            "Choose Your Name"
        ) as HTMLSelectElement;
        expect(selectElement.value).toBe("First");
    });
    test("only one user can be selected at a time", () => {
        const selectElement = screen.getByLabelText(
            "Choose Your Name"
        ) as HTMLSelectElement;
        act(() => {
            fireEvent.change(selectElement, { target: { value: "Meg" } });
        });
        act(() => {
            fireEvent.change(selectElement, { target: { value: "Ryan" } });
        });
        expect(selectElement.value).toBe("Ryan");
    });
});
