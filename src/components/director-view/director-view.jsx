import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss';
import { Col, Row, Container, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Container className="director-view">
                <Row>
                    <Col className="label">Director: </Col>
                    <Col className="value">{Director.name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Bio: </Col>
                    <Col className="value">{Director.Bio}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Birth: </Col>
                    <Col className="value">{Director.Birth}</Col>
                </Row>
                <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="warning">Back</Button>
            </Container>
        )
    }
}
DirectorView.propTypes = {
    Director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
    }).isRequired
}