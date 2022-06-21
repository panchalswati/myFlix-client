import React, { useState } from 'react';
import axios from 'axios';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './profile-view.scss';

export function UpdateView(props) {
    const { user } = props;
    const [name, setname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [values, setValues] = useState({
        nameErr: '',
        passwordErr: '',
        emailErr: '',
    });

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!name) {
            setValues({ ...values, usernameErr: 'Username required' });
            isReq = false;
        } else if (name.length < 2) {
            setValues({ ...values, nameErr: 'Username must be at least 2 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password required' });
            isReq = false;
        } else if (password.length < 6) {
            setValues({ ...values, passwordErr: 'Password must be at least 6 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Enter valid email' });
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            const token = localStorage.getItem('token');
            axios.put(`https://dashboard.heroku.com/apps/myflix-movies-heroku/${user.name}`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthdate
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(response => {
                    console.log(response.data);
                    alert('Profile was successfully updated.');
                    window.open('/users/:username', '_self');
                })
                .catch(error => {
                    console.error(error);
                    alert('Unable to update profile.');
                });
        }
    };

    return (
        <Container id="update-form" className="mt-5">
            <Row><h4>Edit profile</h4></Row>
            <Row>
                <Col sm="10" md="8" lg="6">
                    <Form>
                        <Form.Group controlId="formname">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={Username} onChange={e => setname(e.target.value)} placeholder="Username" required />
                            {/* display validation error */}
                            {values.nameErr && <p>{values.nameErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                            {/* display validation error */}
                            {values.passwordErr && <p>{values.passwordErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@mail.com" required />
                            {/* display validation error */}
                            {values.emailErr && <p>{values.emailErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formBirthdate">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)} placeholder="YYYY-MM-DD" />
                        </Form.Group>
                        <Form.Group controlId="formBirthdate" className="mt-3">
                            <Button variant="warning" type="submit" onClick={handleSubmit}>Edit profile</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}