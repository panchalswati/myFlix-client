import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from '../navbar/navbar';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            users: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                users: localStorage.getItem('users')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get(' https://myflix-movies-heroku.herokuapp.com/movies', {
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

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            users: authData.users.name
        });
        localStorage.setItems('token', authData.token);
        localStorage.setItem('user', authData.user.name);
        this.getMovies(authData.token)
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            users: null
        });
    }

    onRegisterIn(register) {
        this.setState({
            isRegistered: false
        });
    }

    render() {
        let { movies, users } = this.state;

        return (
            <Router>
                <Navbar users={users} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={users => this.onLoggedIn(users)} />
                        </Col>
                        if (movies.lenght === 0) return <div className="main-view" />
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movies={m} />
                            </Col>
                        ))
                    }} />

                    <Route path="/login" render={() => {
                        if (users) return <Redirect to="/"></Redirect>
                        return <Col md={8}>
                            <LoginView />
                        </Col>
                    }} />

                    <Route path="/register" render={() => {
                        if (users) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    <Route path="/movies/:moviesId" render={({ match, history }) => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={users => this.onLoggedIn(users)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movies={movies.find(m => m._id === match.params.moviesId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/genre/:name" render={({ match, history }) => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={users => this.onLoggedIn(users)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path="/director/:name" render={({ match, history }) => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={users => this.onLoggedIn(users)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Route path='/users/:name' render={({ history, match }) => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={name => this.onLoggedIn(name)} /></Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <ProfileView movies={movies} users={users === match.params.name} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>
        )
    }
}

export default MainView;