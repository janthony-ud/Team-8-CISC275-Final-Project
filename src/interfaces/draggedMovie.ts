import { Movie } from "./movie";

export interface DraggedMovieItem {
    type: string;
    payload: Movie | null;
}
