import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Pagination, Container } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';

const Styles = styled.div`
.product-details-bar{
    height: 35px;
}
`;
class ProductDetailsDashBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Styles>
                <div className="product-details-bar"></div>
                <Row>
                    <Col sm={2} md={2}>
                        <div className="product-sidebar">
                            Hey
                        </div>
                    </Col>
                    <Col>
                        <div className="product-sidebar">
                            there
                        </div>
                    </Col>
                    <Col>
                        <div className="product-sidebar">
                            How are you?
                        </div>
                    </Col>
                </Row>
            </Styles>
        );
    }
}


const mapStateToProps = state => {
    return {

    };
};


export default connect(mapStateToProps, {})(ProductDetailsDashBoard);