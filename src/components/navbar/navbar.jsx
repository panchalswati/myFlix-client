import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function Navbar({ users }) {
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };
    return (
        <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">myFlixCinema</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m1-auto">
                        {isAuth() &&
                            <Fragment>
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href={"/users/${users}"}>{users}</Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Sign-out</Nav.Link>
                            </Fragment>
                        }
                        {isAuth() &&
                            <Fragment>
                                <Nav.Link href="/login">Sign-In</Nav.Link>
                                <Nav.Link href="/register">Sign-Up</Nav.Link>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
