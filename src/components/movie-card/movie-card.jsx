import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    addToFavoriteList(moviesId) {
        const currentUser = localStorage.getItem('users');
        const token = localStorage.getItem('token');
        axios.put(`https://movie-api-93167.herokuapp.com/users/${currentUser}/movies/${moviesId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                console.log(response.data)
                alert(`The movie was successfully add to your list.`)
            }).
            catch(error => console.error(error))
    }
    render() {
        const { movies } = this.props;

        return (
            <Card id="movie-card">
                <Link to={`/movies/${movies._id}`}>
                    <Card.Img variant="top" src={movies.ImagePath} />
                </Link>
                <Card.Body>
                    <Card.Title>{movies.Title}</Card.Title>
                    <Card.Text>{movies.Description}</Card.Text>
                    <Link to={`/movies/${movies._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                    <Button className="button ml-2" variant="outline-primary" size="sm" onClick={() => this.addToFavoriteList(movie._id)}>Add</Button>
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