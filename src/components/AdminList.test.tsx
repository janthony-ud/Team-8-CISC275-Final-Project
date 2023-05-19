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
                <AdminList
                    movieState={[]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
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
    test("check edit button is clickable", async () => {
        render(
            <ThemeProvider>
                <AdminList
                    movieState={[]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
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

        const editButton = screen.getByLabelText(
            "Edit Movie"
        ) as HTMLInputElement;
        fireEvent.click(editButton);
        expect(editButton.checked).toBe(true);
        fireEvent.click(editButton);
        expect(editButton.checked).toBe(false);
    });
    test("check edit button shows edit options", async () => {
        render(
            <ThemeProvider>
                <AdminList
                    movieState={[]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
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

        const editButton = screen.getByLabelText(
            "Edit Movie"
        ) as HTMLInputElement;
        fireEvent.click(editButton);
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });
    test("Edit options not visible before clicking checkbox", () => {
        render(
            <ThemeProvider>
                <AdminList
                    movieState={[
                        {
                            title: "Barbie ",
                            image: "https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_UX67_CR0,0,67,98_AL_.jpg ",
                            description:
                                "To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential crisis. Or you're a Ken. ",
                            genre: ["Adventure", "Comedy", "Fantasy"],
                            maturity_rating: "PG-13 ",
                            cast: [
                                "Margot Robbie",
                                "Ariana Greenblatt",
                                "Ryan Gosling",
                                "Emma Mackey"
                            ],
                            user_rating: 3
                        }
                    ]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
            </ThemeProvider>
        );
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });
    test("renders remove button", async () => {
        render(
            <ThemeProvider>
                <AdminList
                    movieState={[]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
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
        expect(screen.getByText("Remove")).toBeInTheDocument();
    });
    test("options dissapear after click", async () => {
        render(
            <ThemeProvider>
                <AdminList
                    movieState={[]}
                    onMovieUpdate={updateMovie}
                    handleUser={"userList"}
                />
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

        const editButton = screen.getByLabelText(
            "Edit Movie"
        ) as HTMLInputElement;
        fireEvent.click(editButton);
        fireEvent.click(editButton);
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });
});
