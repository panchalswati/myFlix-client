import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Container, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {
    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
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