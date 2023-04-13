import React from "react";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";


export function CentralList(): JSX.Element {
    const movies: Movie[] = movieList.map((movie) => {
        return {
            image: movie.image,
            title: movie.name,
            description: movie.desc,
            maturity_rating: movie.age,
            cast: movie.cast.split(","),
            genre: movie.genre.split(",")
        };
    });

    return (
        <div>
            <h1>Central Movie List</h1>
            {movies.map((movie) => (
                <div>
                    <h2>{movie.title}</h2>
                    <img src={movie.image} alt={movie.title} />
                    <p>{movie.description}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Age Rating: {movie.maturity_rating}</p>
                    <p>Cast: {movie.cast}</p>
                </div>
            ))}
        </div>
    );
}
