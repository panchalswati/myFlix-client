import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

export function LoginView(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!name) {
            setNameErr('Username Required');
            isReq = false;
        } else if (name.length < 2) {
            setNameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }

        return isReq;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            axios.post(' https://myflix-movies-heroku.herokuapp.com/login', {
                name: name,
                password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                });
        }
    }
    return (
        <Container id="login-form">
            <Row className="justify-content-center">
                <Col sm="10" md="8" lg="6">
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>name:</Form.Label>
                            <Form.Control type="text" onChange={e => setName(e.target.value)} />
                            {nameErr && <p>{nameErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <Row className="mt-3 justify-content-start">
                            <Col sm="10" md="8" lg="6">
                                <Button variant="primary" type="submit" onClick={handleSubmit}>
                                    Login         </Button>
                            </Col></Row>
                        <p>Don't have an account yet?<a href="/register">Register here</a></p>
                    </Form>
                </Col></Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};