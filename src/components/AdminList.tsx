import React, { useState } from "react";
import { Movie } from "../interfaces/movie";
import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";

export function AdminList(): JSX.Element {
    const blankMovie: Movie = {
        image: "",
        title: "",
        description: "",
        maturity_rating: "",
        cast: [],
        genre: [],
        user_rating: 0
    };

    const [adminMovies, setAdminMovies] = useState<Movie[]>([]);
    const [inEdit, setInEdit] = useState<boolean>(false);
    const [movie, updateMovie] = useState<Movie>(blankMovie);

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateMovie({
            ...movie,
            image: e.target.value
        });
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateMovie({
            ...movie,
            title: e.target.value
        });
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateMovie({
            ...movie,
            description: e.target.value
        });
    }

    function handleMaturityRatingChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        updateMovie({
            ...movie,
            maturity_rating: e.target.value
        });
    }

    function handleCastChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateMovie({
            ...movie,
            cast: [...movie.cast, e.target.value]
        });
    }

    function handleGenreChange(e: React.ChangeEvent<HTMLInputElement>) {
        updateMovie({
            ...movie,
            genre: [...movie.genre, e.target.value]
        });
    }

    function updateMode(e: React.ChangeEvent<HTMLInputElement>) {
        setInEdit(e.target.checked);
    }

    function handleOnDrop(e: React.DragEvent) {
        const widgetType = JSON.parse(
            e.dataTransfer.getData("widgetType")
        ) as Movie;
        console.log("widgetType", widgetType);
        setAdminMovies([...adminMovies, widgetType]);
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    return (
        <div>
            <h1> Movies to be Reviewed </h1>
            <p>Drag Movies to add them to the Review List</p>
            <div
                className="col"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                {adminMovies.map((movie) => (
                    <div className="droppedMovie" key={movie.title}>
                        <img src={movie.image} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <div>
                            <p>{movie.description}</p>
                            <p>Genre: {movie.genre.join(", ")}</p>
                            <p>Age Rating: {movie.maturity_rating}</p>
                            <p>Cast: {movie.cast.join(", ")}</p>
                        </div>{" "}
                        <div>
                            <FormCheck
                                type="switch"
                                id="in-edit-check"
                                label="Edit Movie"
                                checked={inEdit}
                                onChange={updateMode}
                            ></FormCheck>
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formImage">
                                    <FormLabel>Image: </FormLabel>
                                    <FormControl
                                        name="image"
                                        type="text"
                                        value={movie.image}
                                        onChange={handleImageChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formTitle">
                                    <FormLabel>Title: </FormLabel>
                                    <FormControl
                                        name="title"
                                        type="text"
                                        value={movie.title}
                                        defaultValue={movie.title}
                                        onChange={handleTitleChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formDescription">
                                    <FormLabel>Description: </FormLabel>
                                    <FormControl
                                        name="description"
                                        type="text"
                                        value={movie.description}
                                        onChange={handleDescriptionChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formMaturityRating">
                                    <FormLabel>Maturity Rating: </FormLabel>
                                    <FormControl
                                        name="maturity_rating"
                                        type="text"
                                        value={movie.maturity_rating}
                                        onChange={handleMaturityRatingChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formCast">
                                    <FormLabel>Cast: </FormLabel>
                                    <FormControl
                                        name="cast"
                                        type="text"
                                        value={movie.cast}
                                        onChange={handleCastChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                        <div>
                            {inEdit ? (
                                <FormGroup controlId="formGenre">
                                    <FormLabel>Genre: </FormLabel>
                                    <FormControl
                                        name="genre"
                                        type="text"
                                        value={movie.genre}
                                        onChange={handleGenreChange}
                                    ></FormControl>
                                </FormGroup>
                            ) : null}
                        </div>
                    </div>
                ))}
                ;
            </div>
        </div>
    );
}
