import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import { setMovies, setUsers } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar } from '../navbar/navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {};
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

    onLoggedIn(authData) {
        console.log(authData);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.props.setAuth(authData.token, authData.user.Username);
        this.getMovies(authData.token);
        window.open("/", "_self");
    }


    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('users');
        this.setState({
            user: null
        });
    }

    onRegisterIn(register) {
        this.setState({
            user
        });
    }

    render() {
        if (!this.state) return <>loading...</>
        const { movies, user } = this.state;
        console.log('logged in:', user);
        return (
            <Router>
                <Navbar user={user} />
                <Container>
                    <Row className="main-view justify-content-md-center">
                        <Routes>
                            <Route path="/" element={<LoginView />} exact> render={() => {
                                if (!user) return <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                                if (movies.length === 0) return <div className="main-view" />
                                return <MoviesList movies={movies} />
                            }} </Route>

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
                            <Route path="/genres/:name" render={({ match }) => {
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                                </Col>
                            }
                            } />

                            <Route path="/directors/:name" render={({ match }) => {
                                if (movies.length === 0) return <div className="main-view" />;
                                return <Col md={8}>
                                    <DirectorView director={movies.find(m => m.Director.name === match.params.name).Director} onBackClick={() => history.goBack()} />
                                </Col>
                            }
                            } />
                            <Route path={`/users/${user}`} render={({ history }) => {
                                if (!user) return <Redirect to="/" />
                                return <Col>
                                    <ProfileView user={user} onBackClick={() => history.goBack()} />
                                </Col>
                            }} />

                            <Route path='/users/:username' render={({ history, match }) => {
                                if (!user) return <LoginView
                                    onLoggedIn={user => this.onLoggedIn(user)} />
                                if (movies.length === 0) return <div className="main-view" />
                                return
                                <ProfileView history={history} movies={movies} user={user === match.params.username} />
                            }
                            } /></Routes>
                    </Row>
                </Container>
            </Router>
        );
    }
}
let mapStateToProps = state => {
    return {
        movies: store.movies,
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => {
            dispatch(setUser(user))
        },
        setMovies: (movies) => {
            dispatch(setMovies(movies))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);