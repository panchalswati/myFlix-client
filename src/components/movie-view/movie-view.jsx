import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.addFavorite = this.addFavorite.bind(this);
    }

    addFavorite(movie) {
        console.log(movie);
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");
        axios
            .post(
                `https://myflix-movies-heroku.herokuapp.com//${userId}/watchlist/${movies._id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                alert("Added to watchlist");
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, onBackClick } = this.props;

        return (
            <Container className="movie-view">
                <Row className="movie-poster">
                    <img src={movies.ImagePath} />
                </Row>
                <Row className="movie-title">
                    <Col className="label">Title: </Col>
                    <Col className="value">{movies.Title}</Col>
                </Row>
                <Row className="movie-description">
                    <Col className="label">Description: </Col>
                    <Col className="value">{movies.Description}</Col>
                </Row>
                <Link to={`/director/${movies.Director.name}`}>
                    <Button className="d=block mt-3" variant="info">Director</Button>
                </Link>
                <Link to={`/genre/${movies.Genre.Name}`}>
                    <Button className="d-block mt-3" variant="info">Genre</Button>
                </Link>
                <Button onClick={() => { onBackClick(null); }}>Back</Button>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        })
    }),
    onBackClick: PropTypes.func.isRequired
};