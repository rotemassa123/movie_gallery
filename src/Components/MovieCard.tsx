import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../styling/MovieCard.css';
import { Movie } from "../interfaces/Movie"; // Create a CSS file for styling

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    const { title, vote_average, release_date, overview, poster_path } = movie;

    // Get the release year from the release date
    const releaseYear = new Date(release_date).getFullYear();

    return (
        <Card className="movie-card">
            <CardMedia
                className="movie-poster"
                image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                title={title}
                style={{ maxWidth: '150px', maxHeight: '300px' }} // Set max width and height
            />
            <div className="movie-details">
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Rating: {vote_average}/10
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Year: {releaseYear}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {overview}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
};

export default MovieCard;
