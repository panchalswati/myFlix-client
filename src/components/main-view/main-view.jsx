import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
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
            users: null
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            let token = localStorage.getItem("token");
            this.getMovies(token);
        }

    }

    onLoggedIn(authData) {
        console.log(authData);
        localStorage.setItems('token', authData.token);
        localStorage.setItem('users', authData.users.name);
        this.props.setAuth(authData.token, authData.users.name);
        this.getMovies(authData.token);
        window.open("/", "_self");
    }

    getMovies(token) {
        axios.get(' https://myflix-movies-heroku.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('users');
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
        let { movies } = this.props;
        let { users } = this.state;

        return (
            <Router>
                <Navbar users={users} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!users) return <Col>
                            <LoginView onLoggedIn={users => this.onLoggedIn(users)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />
                        return <MoviesList movies={movies} />
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
                            <LoginView onLoggedIn={(users) => this.onLoggedIn(users)} /></Col>
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

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);