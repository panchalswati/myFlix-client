import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
    render() {
        const { Genre, onBackClick } = this.props;
        return (
            <Container className="genre-view">
                <Row>
                    <Col className="label">Genre: </Col>
                    <Col className="value">{Genre.Name}</Col>
                </Row>
                <Row className="mt-3">
                    <Col className="label">Description: </Col>
                    <Col className="value">{Genre.Description}</Col>
                </Row>
                <Button className="d-block mt-3" onClick={() => { onBackClick(null); }} variant="waring">Back</Button>
            </Container>
        )
    }
}
GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};