import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [Birthdate, setBirthdate] = useState('');

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, Birthdate);
        /* Send a request to the server for authentication */
        props.onRegisterIn(username);
    };

    return (
        <div>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Birthdate:
                    <input type="Birthdate" value={Birthdate} onChange={e => setBirthdate(e.target.value)} />
                </label>
                <button type="submit" onClick={handleRegisterSubmit}>Register</button>
            </form>
        </div>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthdate: PropTypes.number.isRequired,
    }),
    onRegisterIn: PropTypes.func.isRequired,
};

export default RegistrationView;
