import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            isRegistered: true,
            movies: [],
            selectedMovie: null,
            user: null
        }
    }

    getMovies(token) {
        axios.get('YOUR_API_URL/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.name
        });
        localStorage.setItems('token', authData.token);
        localStorage.setItem('user', authData.user.name);
        this.getMovies(authData.token)
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onRegisterIn(register) {
        this.setState({
            isRegistered: false
        });
    }

    render() {
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>
                <Navbar user={user} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (movies.lenght === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }
                    } />
                    <Route path='/users/:name' render={({ history, match }) => {
                        if (!user) return <LoginView onLoggedIn={name => this.onLoggedIn(name)} />
                        if (movies.length === 0) return <div className="main-view" />;
                        return
                        <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                    }} />
                </Row>
            </Router>
        )
    }
}

export default MainView;