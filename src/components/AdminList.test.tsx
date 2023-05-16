import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core/dist";
import AdminList from "./AdminList";
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

function updateMovie() {
    return "";
}

describe("Admin List Component Tests", () => {
    test("renders a dropped movie and adds it to admin list", async () => {
        render(
            <ThemeProvider>
                <AdminList movieState={[]} onMovieUpdate={updateMovie} />
            </ThemeProvider>
        );

        await waitFor(() => {
            const dropZone = screen.queryByLabelText("dropzone");
            if (dropZone !== null) {
                console.log("found dropzone");
                fireEvent.drop(dropZone, {
                    dataTransfer: {
                        getData: () => JSON.stringify(mockMovie),
                        types: ["text/plain"],
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
    // test("edit options appear when checkbox is clicked", async () => {
    //     render(
    //         <ThemeProvider>
    //             <AdminList />
    //         </ThemeProvider>
    //     );

    //     await waitFor(() => {
    //         const dropZone = screen.queryByLabelText("dropzone");
    //         if (dropZone !== null) {
    //             console.log("found dropzone");
    //             fireEvent.drop(dropZone, {
    //                 dataTransfer: {
    //                     getData: () => JSON.stringify(mockMovie),
    //                     tyeps: ["text/plain"],
    //                     setData: () => {
    //                         console.log("setting movie");
    //                     }
    //                 }
    //             });
    //         }
    //     });

    //     const checkbox = screen.getByText("edit-checkbox");
    //     fireEvent.click(checkbox);

    //     expect(screen.getByText("Title")).toBeInTheDocument();
    //     expect(screen.getByText("Image URL")).toBeInTheDocument();
    //     expect(screen.getByText("Description")).toBeInTheDocument();
    //     expect(screen.getByText("Genre")).toBeInTheDocument();
    //     expect(screen.getByText("Age Rating")).toBeInTheDocument();
    //     expect(screen.getByText("Cast")).toBeInTheDocument();
    // });
});
