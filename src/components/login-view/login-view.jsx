import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
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
            axios.post('https://dashboard.heroku.com/apps/myflix-movies-heroku/login', {
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
        <><Form>
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

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Login         </Button>
        </Form></>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;