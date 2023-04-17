import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
//import movieList from "../data/movieList.json";
import "./UserList.css";

const YourList: React.FC = () => {
    const [movies] = useState<Movie[]>([
        {
            title: "Cocaine Bear",
            image: "https://m.media-amazon.com/images/M/MV5BODAwZDQ5ZjEtZDI1My00MTFiLTg0ZjUtOGE2YTBkOTdjODFhXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX67_CR0,0,67,98_AL_.jpg",
            description:
                "An oddball group of cops, criminals, tourists and teens converge on a Georgia forest where a huge black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
            genre: ["Comedy", "Thriller"],
            maturity_rating: "R",
            cast: [
                "Shameik Moore",
                "Hailee Steinfeld",
                "Oscar Isaac",
                "Jake Johnson"
            ]
        },
        {
            title: "The Little Mermaid",
            image: "https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX67_CR0,0,67,98_AL_.jpg",
            description:
                "An oddball group of cops, criminals, tourists and teens converge on a Georgia forest where a huge black bear goes on a murderous rampage after unintentionally ingesting cocaine.",
            genre: ["Comedy", "Thriller"],
            maturity_rating: "R",
            cast: [
                "Shameik Moore",
                "Hailee Steinfeld",
                "Oscar Isaac",
                "Jake Johnson"
            ]
        }
    ]);

    return (
        <div>
            <h1 className="list-header">Your List</h1>
            <ul className="movie-list">
                {movies.map((movie) => (
                    <li key={movie.title}>
                        <div className="movie-title">{movie.title}</div>
                        <img
                            src={movie.image}
                            alt={movie.title}
                            width="67"
                            height="98"
                            className="movie-image"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourList;
