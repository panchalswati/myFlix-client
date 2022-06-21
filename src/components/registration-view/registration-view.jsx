import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Birthdate, setBirthdate] = useState('');
    const [values, setValues] = useState({
        nameerr: '',
        name: '',
        passwordErr: '',
        emailErr: '',
    });

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

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://dashboard.heroku.com/apps/myflix-movies-heroku/users', {
                name: name,
                Password: password,
                Email: email,
                Birthday: birthday
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
        <>
            <Row className="justify-content-center my-5">
                <Col md={3}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="dd-mm-yyyy"
                                onChange={(e) => setBirthday(e.target.value)}
                                value={birthday}
                            />
                        </Form.Group>
                        <br></br>
                        <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
                    </Form>
                </Col>
            </Row>
        </>
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
};

export default RegistrationView;
