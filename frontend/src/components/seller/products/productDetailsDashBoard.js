import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Carousel, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import { Icon, Typography, Chip, Divider, Button, InputLabel, MenuItem, Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CategoryIcon from '@material-ui/icons/Category';
import FormControl from '@material-ui/core/FormControl';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Select from '@material-ui/core/Select';
import Image from 'material-ui-image';
import ReviewTile from './reviewTile';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { getReviewsForProduct } from '../../../Redux/actions/customer/reviewActions';


const Styles = styled.div`
.product-details-addtocartbar{
    padding: 20px;
    height: 250px;
    width: 250px;
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
    margin-left: 35px;
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
    margin-bottom: 25px;
}
.product-details-quantity{
    width: 200px;
    margin-bottom: 25px;
}
.product-details-chips{
    padding-left: 5px;
    margin-left: 2px;
    min-height:10px;
    max-hight: 50px;
    overflow-y: scroll;

}
.product-details-add-to-cart-button{
    margin:5px;
    padding-top: 15px;
    width: 200px;
    background-color: #E65100;
}
.chip-divider{
    width:px;
}
.product-details-review-section{
    margin: 15px;
    margin-left:35px;
}
.product-details-review-section-list{
    margin: 15px;
    margin: 55px;
}
.product-details-add-review-section{
    margin: 15px;
    margin-left:65px;
    padding: 10px;
    width: 800px;
}
.product-details-add-review-box{
    width: 800px;
}
.product-details-details-section{
    margin: 10px;
}
.product-details-offer-row{
    margin: 5px;
}
.product-details-offer-icon{
    margin: 2px;
    margin-right:5px;
}
.review-submit-button{
    margin: 2px;
    display: flex; 
    width: 800px;
    justify-content: flex-end;
}
`;
class ProductDetailsDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Product.Name,
            Price: this.props.Product.Price,
            Images: this.props.Product.Images,
            SellerName: this.props.Product.Seller.Name,
            Rating: this.props.Product.Rating,
            Reviews: [],
            Offers: this.props.Product.Offers,
            Description: this.props.Product.Description,
            Categories: this.props.Product.Categories,
        }
    }

    componentDidMount() {
        this.props.getReviewsForProduct(this.props.Product._id);
        // if (this.props.reviewData || this.props.reviewData.productId == this.props.Product._id) {
        //     this.props.getReviewsForProduct(this.props.Product._id);
        //     this.setState({
        //         Reviews: this.props.reviewData.reviews,
        //     })
        // }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.products: ", JSON.stringify(nextProps.reviewData));
        this.setState({
            Reviews: nextProps.reviewData.reviews,
        })
    };



    render() {
        var reviews = []
        if (this.state.Reviews) {
            reviews = this.state.Reviews.map((review) => {
                return (
                    <ReviewTile Review={review} />
                )
            });
        };


        return (
            <Styles>
                <div className="product-details-bar">
                    <ArrowBackIcon className="product-details-back-button" onClick={this.props.onBackClickListner} type=""></ArrowBackIcon>
                </div>
                <Row >
                    <Col sm={4.5} md={4.5}>
                        <div className="product-details-image-section">
                            <Carousel>
                                {this.state.Images.map((image) => {
                                    return (
                                        <Carousel.Item>

                                            <Image
                                                onClick={() => console.log('onClick')}
                                                className="product-details-image"
                                                src={image}
                                                animation="wave"
                                                disableSpinner
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
                    <Col sm={5} md={5}>
                        <div className="product-details-details-section">
                            <Typography variant="h4" component="h4">
                                {this.state.Name}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                By {this.state.SellerName}
                            </Typography>
                            <Rating name="half-rating-read" value={this.state.ProductRating} precision={0.2} readOnly />
                            <Divider variant="inset" component="li" className="product-details-divider" />
                            <Typography variant="h6" color="primary" component="h6">
                                Price: $ {this.state.Price}
                            </Typography>
                            <Row className="product-details-chips">
                                <GridList cellHeight={40} cols={3}>
                                    {this.state.Categories.map((category) => {
                                        return (
                                            <div>
                                                <Chip
                                                    icon={<CategoryIcon />}
                                                    color="primary"
                                                    label={category}
                                                />
                                            </div>
                                        )
                                    })}
                                </GridList>
                            </Row>
                            <Typography variant="h6" component="h6">
                                Description:
                            </Typography>
                            <Typography variant="span" color="" component="span">
                                {this.state.Description}
                            </Typography>
                            <Typography variant="h6" component="h6">
                                Offers:
                            </Typography>
                            {this.state.Offers.map((offer) => {
                                return (
                                    <Row className="product-details-offer-row">
                                        <LocalOfferIcon className="product-details-offer-icon" color="action" ></LocalOfferIcon>
                                        <Typography variant="span" color="" component="span">
                                            {offer}
                                        </Typography>
                                    </Row>
                                )
                            })}
                        </div>
                    </Col>
                    <Col sm={2} md={2}>
                        <Paper className="product-details-addtocartbar">
                            <Typography variant="h6" className="product-detail-price" component="h6">
                                Price: $ {this.state.Price}
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
                        </Paper>
                    </Col>
                </Row>
                <Row className="product-details-review-section">
                    <div >
                        <Typography variant="h6" component="h6">
                            Reviews
                        </Typography>
                    </div>
                </Row>
                <Row className="product-details-add-review-section">
                    <Form.Group controlId="exampleForm.ControlTextarea1" className="product-details-add-review-box">
                        <Typography variant="h6" component="h6">
                            Write Review
                        </Typography>
                        <Form.Control as="textarea"
                            placeholder="Write your review here.."
                            rows="3" />
                        <div className="review-submit-button" > 
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </div>
                    </Form.Group>
                </Row>
                <Row className="product-details-review-section-list">
                    <List>
                        {reviews}
                    </List>
                </Row>
            </Styles>
        );
    }
}


const mapStateToProps = state => {
    return {
        reviewData: state.customerReviewData,
    };
};


export default connect(mapStateToProps, { getReviewsForProduct })(ProductDetailsDashBoard);