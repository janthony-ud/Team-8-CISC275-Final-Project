import React from "react";
import movieList from "../data/movieList.json";
import { Movie } from "../interfaces/movie";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useState } from "react";
import { DraggedMovieItem } from "../interfaces/draggedMovie";

export function CentralList(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>(
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

    const [draggedMovie, setDraggedMovie] = useState<Movie | null>(null);
    const [, drag] = useDrag<DraggedMovieItem, void, { isDragging: boolean }>({
        item: { type: "movie", payload: null },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    // const handleMouseDown = (movie: Movie) => {
    //     setDraggedMovie(movie);
    // };

    return (
        <div>
            <h1>Central Movie List</h1>

            <div className="col">
                {movies.map((movie) => (
                    <div
                        key={movie.title}
                        ref={drag}
                        // onMouseDown={() => handleMouseDown(movie)}
                        // style={{ opacity: isDragging ? 0.5 : 1 }}
                    >
                        <div>
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                        <div>
                            <p>{movie.description}</p>
                            <p>Genre: {movie.genre.join(", ")}</p>
                            <p>Age Rating: {movie.maturity_rating}</p>
                            <p>Cast: {movie.cast.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
