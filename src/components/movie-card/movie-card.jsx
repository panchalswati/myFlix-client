import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movies._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;