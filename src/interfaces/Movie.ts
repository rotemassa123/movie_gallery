export interface Movie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    overview: string;
    poster_path: string;
    backdrop_path?: string;
    budget?: number;
    genres?: string[];
    homepage?: string;
    imdb_id?: string;
    original_language?: string;
    popularity?: number;
    revenue?: number;
    runtime?: number;
    status?: string;
    tagline?: string;
    vote_count?: number;
}
