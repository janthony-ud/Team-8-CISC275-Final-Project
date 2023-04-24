import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
import "./UserList.css";

export function YourList(): JSX.Element {
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        setUserMovies([...userMovies, widgetType]);
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

    return (
        <div>
            <h1> Your Movies </h1>
            <p>Drag movies here to add them to your list</p>
            <div
                className="col"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {userMovies.map((movie, index) => (
                    <div className="droppedMovie" key={movie.title}>
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourList;
