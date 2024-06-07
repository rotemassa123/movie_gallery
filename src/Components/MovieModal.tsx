import React from 'react';
import { Modal, Box, Typography, CardMedia } from '@mui/material';
import { Movie } from '../interfaces/Movie';
import '../styling/MovieModal.css';

interface MovieModalProps {
    isOpen: boolean;
    handleClose: () => void;
    movie: Partial<Movie>; // Use Partial to allow for missing fields
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, handleClose, movie }) => {
    const {
        title,
        poster_path,
        overview,
        release_date,
        vote_average,
        genres,
        budget,
        revenue,
        runtime
    } = movie;

    const releaseYear = release_date ? new Date(release_date).getFullYear() : 'N/A';

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className="modal-box">
                {poster_path && (
                    <CardMedia
                        className="modal-poster"
                        component="img"
                        image={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={title}
                    />
                )}
                <Typography variant="h4" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Rating: {vote_average}/10
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Year: {releaseYear}
                </Typography>
                {genres && genres.length > 0 && (
                    <Typography variant="body1" gutterBottom>
                        Genres: {genres.join(', ')}
                    </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                    Budget: ${budget?.toLocaleString() || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Revenue: ${revenue?.toLocaleString() || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Runtime: {runtime ? `${runtime} minutes` : 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                    {overview}
                </Typography>
            </Box>
        </Modal>
    );
};

export default MovieModal;
