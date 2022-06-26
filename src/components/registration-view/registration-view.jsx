import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [values, setValues] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    })

    const validate = () => {
        let isReq = true;
        if (name) {
            setValues({ ...values, nameErr: 'Name is required' });
            isReq = false;
        } else if (name.length < 3)
            setValues({ ...values, nameErr: 'name must be 3 characters long' });
        isReq = false;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username Required' });
            isReq = false;
        } else if (username.length < 3)
            setValues({ ...values, usernameErr: 'Enter valid Username' });
        isReq = false;
        if (!password) {
            setValues({ ...values, passwordErr: 'password is required' }); isReq = false;
            isReq = false;
        } else if (password.length < 3)
            setValues({ ...values, passwordErr: 'password must be 3 characters long' });
        isReq = false;
        if (!email) {
            setValues({ ...values, emailErr: 'enter email ' }); isReq = false;
            isReq = false;
        } else if (email.length < 3)
            setValues({ ...values, emailErr: 'Enter valid Email' });
        isReq = false;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://myflix-movies-heroku.herokuapp.com/users', {
                Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthdate: Birthdate
            }).then(reponse => {
                const data = response.data;
                console.log(data);
                alert('Registration successful,Please login');
                window.open('/', '_self');
            })
                .catch(response => {
                    console.error(response);
                    alert('unable to register');
                });
        }
    };

    return (
        <Row className="mt-5">
            <Col md={12}>
                <Form>
                    <h3>Sign Up</h3>
                    <p></p>
                    <Form.Group controlId="formName" className="reg-form-inputs">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                        {values.nameErr && <p>{values.nameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>

                    <Form.Group controlId="formBirthdate">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="birthdate" placeholder="Birthdate" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
                        {values.birthdateErr && <p>{values.birthdateErr}</p>}
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleRegister}>
                        Submit
                    </Button>
                    <p></p>
                    <p>Already registered <Link to={'/'}>Sign In</Link>here</p>
                </Form>
            </Col></Row>
    )
}
RegistrationView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthdate: PropTypes.string.isRequired
    })
};