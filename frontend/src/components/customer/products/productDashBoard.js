import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Pagination, Container } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import ProductDetailsDashBoard from './productDetailsDashBoard';

const Styles = styled.div`
    .product-filter-bar{
        height: 35px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
        border-radius: 3px;
    }
    .product-sidebar{
        padding: 10px;
        padding-left: 15px;
        height: 625px;
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
        background-color: #fff;
    }
    .product-dashboard{
        padding:10px;
        padding-left: 0px;
    }
`;

class ProductDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    ProductName: "Apple AirPods Pro",
                    ProductRating: 3.5,
                    ProductPrice: 234,
                    ProductImage: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "New Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Latest Model)",
                    ProductRating: 5,
                    ProductPrice: 299,
                    ProductImage: "https://m.media-amazon.com/images/I/6162WMQWhVL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band",
                    ProductRating: 3.5,
                    ProductPrice: 414,
                    ProductImage: "https://m.media-amazon.com/images/I/71wu+HMAKBL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
                    ProductRating: 4.5,
                    ProductPrice: 949.99,
                    ProductImage: "https://m.media-amazon.com/images/I/71thf1SYnGL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "Apple AirPods Pro",
                    ProductRating: 3.5,
                    ProductPrice: 234,
                    ProductImage: "https://m.media-amazon.com/images/I/71zny7BTRlL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "New Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Latest Model)",
                    ProductRating: 5,
                    ProductPrice: 299,
                    ProductImage: "https://m.media-amazon.com/images/I/6162WMQWhVL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band",
                    ProductRating: 3.5,
                    ProductPrice: 414,
                    ProductImage: "https://m.media-amazon.com/images/I/71wu+HMAKBL._AC_UL640_FMwebp_QL65_.jpg",
                },
                {
                    ProductName: "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
                    ProductRating: 4.5,
                    ProductPrice: 949.99,
                    ProductImage: "https://m.media-amazon.com/images/I/71thf1SYnGL._AC_UL640_FMwebp_QL65_.jpg",
                },
            ],
            ProductDetailsView: false,
            SelectedProduct: null,
        }
    }


    onProductCardListner = (id) => {
        console.log("Product id: ", id);
        return (<Redirect to={{
            pathname: '/customerProductDetails',
            state: { Product: this.state.SelectedProduct }
          }} />
    )
    };

    onBackClickListner = () =>{
        this.setState({
            SelectedProduct: null,
            ProductDetailsView: false,
        });
    }

    render() {
            return (
                <Styles>
                    <Navbar />
                    <div className="product-filter-bar"></div>
                    <Row>
                        <Col sm={2} md={2}>
                            <div className="product-sidebar">
                                Hey
                        </div>
                        </Col>
                        <Col>
                            <div className="product-dashboard">
                                <GridList cellHeight={50} >
                                    {this.state.products.map((product, id) => (
                                        <ProductTile Product={product} id={id} onProductCardListner={this.onProductCardListner} />
                                    ))}
                                </GridList>
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


export default connect(mapStateToProps, {})(ProductDashBoard);