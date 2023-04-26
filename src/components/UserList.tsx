import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
import { userMovie } from "../interfaces/userMovie";
import "./UserList.css";

export function YourList(): JSX.Element {
    const [userMovies, setUserMovies] = useState<userMovie[]>([]);

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        const newMovie: userMovie = { ...widgetType, id: userMovies.length };
        setUserMovies([...userMovies, newMovie]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    const handleRatingChange = (movieIndex: number, rating: number) => {
        setUserMovies((prevMovies) => {
            const updatedMovies = [...prevMovies];
            updatedMovies[movieIndex] = {
                ...updatedMovies[movieIndex],
                user_rating: rating
            };
            return updatedMovies;
        });
    };

    function removeMovie(id: number): void {
        setUserMovies(
            [...userMovies].filter((userMovie) => userMovie.id !== id)
        );
    }

    return (
        <div>
            <h1> Your Movies </h1>
            <p>Drag movies here to add them to your list</p>
            <div
                className="col drop-area"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {userMovies.map((movie, index) => (
                    <div className="droppedMovie" key={movie.id}>
                        <img src={movie.image} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <div>
                            <p>{movie.description}</p>
                            <p>Genre: {movie.genre.join(", ")}</p>
                            <p>Age Rating: {movie.maturity_rating}</p>
                            <p>Cast: {movie.cast.join(", ")}</p>
                        </div>{" "}
                        <div className="movie-rating">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={movie.user_rating}
                                onChange={(event) =>
                                    handleRatingChange(
                                        index,
                                        parseInt(event.target.value)
                                    )
                                }
                            />
                            <div>
                                {[...Array(movie.user_rating)].map(
                                    (_, starIndex) => (
                                        <span
                                            key={starIndex}
                                            className="star yellow"
                                        >
                                            ★
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="remove-movie">
                            <button onClick={() => removeMovie(movie.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourList;
