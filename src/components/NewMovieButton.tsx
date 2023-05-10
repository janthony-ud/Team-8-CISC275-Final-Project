import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Movie } from "../interfaces/movie";
import { Button } from "@chakra-ui/core";

interface NewMovieFormProps {
    onSubmit: (newMovie: Movie) => void;
}

interface CustomWindow extends Window {
    returnMovie?: Movie;
}

const NewMovieForm: React.FC<NewMovieFormProps> = ({ onSubmit }) => {
    const [image, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [maturity_rating, setMaturityRating] = useState("");
    const [cast, setCast] = useState<string[]>([]);
    const [genre, setGenres] = useState<string[]>([]);
    const [user_rating, setUserRating] = useState(1);

    const handleCastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const castList = event.target.value.split(",");
        setCast(castList);
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const genreList = event.target.value.split(",");
        setGenres(genreList);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newMovie: Movie = {
            image,
            title,
            description,
            maturity_rating,
            cast,
            genre,
            user_rating
        };
        onSubmit(newMovie);
        setTitle("");
        setImageUrl("");
        setDescription("");
        setMaturityRating("");
        setCast([]);
        setGenres([]);
        setUserRating(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label>
                Image URL:
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>
            <br />
            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <label>
                Maturity Rating:
                <textarea
                    value={maturity_rating}
                    onChange={(e) => setMaturityRating(e.target.value)}
                />
            </label>
            <br />
            <label>
                Cast:
                <input
                    type="text"
                    value={cast.join(",")}
                    onChange={handleCastChange}
                />
            </label>
            <br />
            <label>
                Genres:
                <input
                    type="text"
                    value={genre.join(",")}
                    onChange={handleGenreChange}
                />
            </label>
            <br />
            <button type="submit">Add Movie</button>
        </form>
    );
};

const NewMovieButton: React.FC<NewMovieFormProps> = ({ onSubmit }) => {
    const handleClick = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newWindow = window.open(
            "",
            "_blank",
            "width=400,height=400"
        )! as CustomWindow;
        newWindow.document.write(
            "<html><head><title>New Movie</title></head><body><h1>New Movie</h1></body></html>"
        );
        const div = document.createElement("div");
        newWindow.document.body.appendChild(div);
        ReactDOM.render(
            <NewMovieForm
                onSubmit={(newMovie) => {
                    onSubmit(newMovie);
                    newWindow.returnMovie = newMovie;
                    newWindow.close();
                }}
            />,
            div
        );
        newWindow.addEventListener(
            "beforeunload",
            (event: { preventDefault: () => void; returnValue: boolean }) => {
                event.preventDefault();
                event.returnValue = false;
                if (typeof newWindow.returnMovie !== "undefined") {
                    window.opener.postMessage(
                        { type: "new-movie", movie: newWindow.returnMovie },
                        "*"
                    );
                }
            }
        );
    };

    return (
        <div>
            <Button variantColor="green" size="sm" onClick={handleClick}>
                + New Movie
            </Button>
        </div>
    );
};
export default NewMovieButton;
