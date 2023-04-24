import React from "react";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useState } from "react";

export function CentralList(): JSX.Element {
    const [movies] = useState<Movie[]>(
        movieList.map((movie) => {
            return {
                image: movie.image,
                title: movie.name,
                description: movie.desc,
                maturity_rating: movie.age,
                cast: movie.cast,
                genre: movie.genre
            };
        })
    );

    function handleOnDrag(e: React.DragEvent, widgetType: Movie) {
        e.dataTransfer.setData("widgetType", JSON.stringify(widgetType));
    }

    return (
        <div>
            <h1>Central Movie List</h1>
            <div className="col">
                {movies.map((movie) => (
                    <div key={movie.title}>
                        <div
                            draggable
                            onDragStart={(e) => handleOnDrag(e, movie)}
                        >
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <div>
                                <p>{movie.description}</p>
                                <p>Genre: {movie.genre.join(", ")}</p>
                                <p>Age Rating: {movie.maturity_rating}</p>
                                <p>Cast: {movie.cast.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
