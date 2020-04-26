import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, Carousel, Modal, Form, ListGroup, Alert, Pagination, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import { Icon, Typography, Chip, Divider, Button, InputLabel, MenuItem } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CategoryIcon from '@material-ui/icons/Category';
import FormControl from '@material-ui/core/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Select from '@material-ui/core/Select';
import Image from 'material-ui-image';


const Styles = styled.div`
.product-details-addtocartbar{
    padding: 10px;
    height: 200px;
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05);
}
.product-details-bar{
    height: 35px;
}
.product-details-back-button{
    height: 35px;
    width: 35px;
    margin-left:15px;
}
.product-details-image-section{
    
    width: 450px;
    margin-left:15px;
    overflow-x: scroll;
    padding: 5px;
}
.product-details-image{
    height: 450px;
    width: 450px;
}

.product-details-divider{
    margin: 2px;
    margin-bottom: 5px;
}
.product-detail-price{
    color: #B71C1C;
}
.product-detail-instock{
    color: #1B5E20;
}
.product-details-quantity{
    width: 95px;
}
.product-details-add-to-cart-button{
    margin:5px;
    padding-top: 15px;
    background-color: #E65100;
}
`;
class ProductDetailsDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductName: this.props.Product.ProductName,
            ProductPrice: this.props.Product.ProductPrice,
            ProductImages: this.props.Product.ProductImages,
            SellerName: this.props.Product.SellerName,
            ProductRating: this.props.Product.ProductRating,
            Reviews: this.props.Product.Reviews,
            offers: this.props.Product.offers,
            ProductDescription: this.props.Product.ProductDescription,
            Categories: this.props.Product.Categories,
        }
    }

    render() {
        var Image_list = []

        return (
            <Styles>
                <div className="product-details-bar">
                    <ArrowBackIcon className="product-details-back-button" onClick={this.props.onBackClickListner} type=""></ArrowBackIcon>
                </div>
                <Row >
                    <Col sm={5} md={5}>
                        <div className="product-details-image-section">
                            <Carousel>
                                {this.state.ProductImages.map((image) => {
                                    return (
                                        <Carousel.Item>
                                            <Image
                                                onClick={() => console.log('onClick')}
                                                className="product-details-image"
                                                src={image}
                                            />
                                            {/* <Image
                                                
                                                src=
                                                alt="First slide"
                                            /> */}
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </Col>
                    <Col sm={4.5} md={4.5}>
                        <div className="product-details-image-section">
                            <Typography variant="h4" component="h4">
                                {this.state.ProductName}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                By {this.state.SellerName}
                            </Typography>
                            <Rating name="half-rating-read" value={this.state.ProductRating} precision={0.2} readOnly />
                            <Divider variant="inset" component="li" className="product-details-divider" />
                            <Typography variant="h6" color="primary" component="h6">
                                Price: $ {this.state.ProductPrice}
                            </Typography>
                            <Row className="product-details-chips">
                                {this.state.Categories.map((category) => {
                                    return (
                                        <Col>
                                            <Chip
                                                icon={<CategoryIcon />}
                                                color="primary"
                                                label={category}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                            <Typography variant="h6" component="h6">
                                Description:
                            </Typography>
                            <Typography variant="span" color="" component="span">
                                {this.state.ProductDescription}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                Offers:
                            </Typography>
                            {this.state.offers.map((offer) => {
                                return (
                                    <Row>
                                        <Typography variant="span" color="" component="span">
                                            . > {offer}
                                        </Typography>
                                    </Row>
                                )
                            })}
                        </div>
                    </Col>
                    <Col sm={2} md={2}>
                        <div className="product-details-addtocartbar">
                            <Typography variant="h6" className="product-detail-price" component="h6">
                                Price: $ {this.state.ProductPrice}
                            </Typography>
                            <Typography variant="h6" className="product-detail-instock" component="h6">
                                In Stock.
                            </Typography>
                            <FormControl variant="outlined" >
                                <InputLabel id="demo-simple-select-outlined-label">Qty.</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={this.state.quantity}
                                    label="Qty"
                                    className="product-details-quantity"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>One</MenuItem>
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="product-details-add-to-cart-button"
                                startIcon={<AddShoppingCartIcon />}
                            >
                                Add To Cart
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col sm={2} md={2}>
                        <div className="">
                            <Typography variant="h6" component="h6">
                                Reviews
                            </Typography>
                        </div>
                    </Col>
                    <Col sm={8} md={8}>
                        <div className="">
                            there
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