import { Movie } from "../interfaces/movie";

export interface User {
    name: string;
    userMovies: Movie[];
    role: string;
}
