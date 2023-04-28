import { userMovie } from "../interfaces/userMovie";

export interface User {
    name: string;
    userMovieList: userMovie[];
    role: string;
}
