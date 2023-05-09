import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";
import { AdminList } from "./AdminList";
import { Movie } from "../interfaces/movie";

const mockMovie: Movie = {
    image: "",
    title: "A Movie",
    description: "Test description",
    maturity_rating: "PG",
    cast: ["Bob", "Mary", "Jim"],
    genre: ["Adventure"],
    user_rating: 0
};

describe("Admin List Component Tests", () => {
    test("renders a dropped movie and adds it to admin list", async () => {
        render(
            <ThemeProvider>
                <AdminList />
            </ThemeProvider>
        );

        await waitFor(() => {
            const dropZone = screen.queryByLabelText("dropzone");
            if (dropZone !== null) {
                console.log("found dropzone");
                fireEvent.drop(dropZone, {
                    dataTransfer: {
                        getData: () => JSON.stringify(mockMovie),
                        tyeps: ["text/plain"],
                        setData: () => {
                            console.log("setting movie");
                        }
                    }
                });
            }
        });

        console.log("testing");
        const droppedMovie = screen.getByText("A Movie");
        expect(droppedMovie).toBeInTheDocument();
    });
});
