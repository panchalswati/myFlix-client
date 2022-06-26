import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './movie-card.scss';

export class MovieCard extends React.Component {

    render() {
        const { movies } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movies.ImagePath} />
                <Card.Body>
                    <Card.Title>{movies.Title}</Card.Title>
                    <Card.Text>{movies.Description}</Card.Text>
                    <Link to={`/movies/${movies._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        })
    }).isRequired,
};