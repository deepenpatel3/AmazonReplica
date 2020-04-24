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
                    ProductImages: ["https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/718UsV0ns5L._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/81nuOe%2BXCtL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71SJDhJtEVL._AC_SL1500_.jpg"],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                    Reviews: [],
                },
                {
                    ProductName: "New Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Latest Model)",
                    ProductRating: 5,
                    ProductPrice: 299,
                    ProductImages: ["https://m.media-amazon.com/images/I/6162WMQWhVL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51BokXhnBbL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/5145l0K6fDL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/61MYgDuxqbL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71tvYppCioL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51KDP8vi4uL._AC_SL1500_.jpg"
                    ],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                    Reviews: [],
                },
                {
                    ProductName: "Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band",
                    ProductRating: 3.5,
                    ProductPrice: 414,
                    ProductImages: ["https://m.media-amazon.com/images/I/71wu+HMAKBL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71LX4GnkYFL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71Xt1HvigDL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/81lV6jrGQlL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71-5xAstWTL._AC_SL1500_.jpg",],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                    Reviews: [],
                },
                {
                    ProductName: "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
                    ProductRating: 4.5,
                    ProductPrice: 949.99,
                    ProductImages: ["https://m.media-amazon.com/images/I/71thf1SYnGL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/310q4ue7jjL._AC_SL1024_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/6186nCBW02L._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51YNm2P9VjL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/41aGUF63L2L._AC_SL1024_.jpg"],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                    Reviews: [],
                },
                {
                    ProductName: "Apple AirPods Pro",
                    ProductRating: 3.5,
                    ProductPrice: 234,
                    ProductImages: ["https://images-na.ssl-images-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/718UsV0ns5L._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/81nuOe%2BXCtL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71SJDhJtEVL._AC_SL1500_.jpg"],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                    Reviews: [],
                },
                {
                    ProductName: "New Apple iPad (10.2-Inch, Wi-Fi, 32GB) - Space Gray (Latest Model)",
                    ProductRating: 5,
                    ProductPrice: 299,
                    ProductImages: ["https://m.media-amazon.com/images/I/6162WMQWhVL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51BokXhnBbL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/5145l0K6fDL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/61MYgDuxqbL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71tvYppCioL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51KDP8vi4uL._AC_SL1500_.jpg"
                    ],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    Reviews: [],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                },
                {
                    ProductName: "Apple Watch Series 5 (GPS, 44mm) - Space Gray Aluminum Case with Black Sport Band",
                    ProductRating: 3.5,
                    ProductPrice: 414,
                    Reviews: [],
                    ProductImages: ["https://m.media-amazon.com/images/I/71wu+HMAKBL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71LX4GnkYFL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71Xt1HvigDL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/81lV6jrGQlL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/71-5xAstWTL._AC_SL1500_.jpg",],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                },
                {
                    ProductName: "New Apple MacBook Air (13-inch, 8GB RAM, 256GB SSD Storage) - Gold",
                    ProductRating: 4.5,
                    ProductPrice: 949.99,
                    ProductImages: ["https://m.media-amazon.com/images/I/71thf1SYnGL._AC_UL640_FMwebp_QL65_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/310q4ue7jjL._AC_SL1024_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/6186nCBW02L._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/51YNm2P9VjL._AC_SL1500_.jpg",
                        "https://images-na.ssl-images-amazon.com/images/I/41aGUF63L2L._AC_SL1024_.jpg"],
                    offers: ["Pay $39.16/month for 6 months (plus S&H, tax) with 0% interest equal monthly payments when you're approved for an Amazon Store Card.", "6% off with Amazon"],
                    Reviews: [],
                    ProductDescription: "Active noise cancellation for immersive sound Transparency mode for hearing and connecting with the world around you Three sizes of soft, tapered silicone tips for a customizable fit Sweat and water resistant \n Adaptive EQ automatically tunes music to the shape of your ear\n Easy setup for all your Apple devices\n Quick access to Siri by saying “Hey Siri”\n The Wireless Charging Case delivers more than 24 hours of battery life",
                    Categories: ["Electronics", "Earbuds"],
                },
            ],
            ProductDetailsView: false,
            SelectedProduct: null,
        }
    }


    onProductCardListner = (id) => {
        console.log("Product id: ", id);
        this.setState({
            SelectedProduct: this.state.products[id],
            ProductDetailsView: true,
        });
    };

    onBackClickListner = () => {
        this.setState({
            SelectedProduct: null,
            ProductDetailsView: false,
        });
    }

    render() {
        if (this.state.ProductDetailsView) {
            return (
                <Styles>
                    <Navbar />
                    <ProductDetailsDashBoard Product={this.state.SelectedProduct} onBackClickListner={this.onBackClickListner} />
                </Styles>
            )
        } else {
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
}


const mapStateToProps = state => {
    return {

    };
};


export default connect(mapStateToProps, {})(ProductDashBoard);