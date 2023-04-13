import React from "react";
import { useEffect, useState } from "react";
import movieList from "../data/movieList.json";

export function CentralList(): JSX.Element {
    const movies = movieList.map((movie, index) => {
        return {
            id: index + 1,
            name: movie.name,
            image: movie.image,
            description: movie.desc,
            genre: movie.genre,
            age: movie.age,
            cast: movie.cast.split(",")
        };
    });

    return (
        <div>
            <h1>Central Movie List</h1>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.name}</h2>
                    <img src={movie.image} alt={movie.name} />
                    <p>{movie.description}</p>
                    <p>Genre: {movie.genre}</p>
                    <p>Age: {movie.age}</p>
                    <p>Cast: {movie.cast}</p>
                </div>
            ))}
        </div>
    );
}
