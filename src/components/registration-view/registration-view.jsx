import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [values, setValues] = useState({
        nameerr: '',
        name: '',
        passwordErr: '',
        emailErr: '',
    });

    const validate = () => {
        let isReq = true;
        if (!name) {
            setValues({ ...values, nameErr: 'Username required' });
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

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://myflix-movies-heroku.herokuapp.com/users', {
                name: name,
                Password: password,
                Email: email,
                Birthdate: birthdate
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch(e => {
                    alert('error registering the user')
                })
        }
    };

    return (
        <Container id="registeration-form">
            <Row className="justify-content-center my-5">
                <Col md={3}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password*</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="5"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="dd-mm-yyyy"
                                onChange={(e) => setBirthdate(e.target.value)}
                                value={Birthdate}
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" onClick={handleRegisterSubmit}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        name: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthdate: PropTypes.number.isRequired,
    }),
    onRegisterIn: PropTypes.func.isRequired,
}