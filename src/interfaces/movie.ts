/** Object representing a movie from the past year (2023) with relevant information */
export interface Movie {
    /**  Movie Image */
    image: string;
    /** The title of the movie*/
    title: string;
    /** A short description of the movie plot */
    description: string;
    /** The age rating for who should be allowed to watch the movie */
    maturity_rating: string;
    /** Short list of the main cast members (10 maximum) */
    cast: string[];
    /** List of genres that the movie falls under */
    genre: string[];
    /**Rating out of 5 stars */
    user_rating: number;
    /** Will add more attributes as needed */
}
