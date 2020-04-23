import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, CardGroup, Button, Image, Jumbotron, Modal, Form, ListGroup, Alert, Pagination, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';


const Styles = styled.div`
.product-tile-image{
    padding: 5px;
    max-height: 250px;
    max-width: 245px;
}
.product-tile-card{
    max-width: 255px;
    max-height: 450px;
    margin: 5px;
}
`;

class ProductTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductName: this.props.Product.ProductName,
            ProductRating: this.props.Product.ProductRating,
            ProductPrice: this.props.Product.ProductPrice,
            ProductImage: this.props.Product.ProductImage,
        }
    }
    onCardClickListner = (e) => {
        e.preventDefault();
        this.props.onProductCardListner(this.props.id);
    }

    render() {
        if (!this.state.ProductImage) {
            this.setState({
                ProductImage: "https://dummyimage.com/600x400/000/fff",
            });
        }
        return (
            <Styles>
                {/* <Card className="product-tile-card" style={{ width: '16rem' }} onClick={this.onCardClickListner} >
                    <Card.Img className="product-tile-image" variant="top" src={this.state.ProductImage} />
                    <Card.Body>
                        <Card.Title>{this.state.ProductName}</Card.Title>
                        <Card.Subtitle>$ {this.state.ProductPrice}</Card.Subtitle>
                        <Rating name="simple-controlled" value={this.state.ProductRating} readOnly />
                    </Card.Body>
                </Card> */}

                <Card className="product-tile-card" onClick={this.onCardClickListner}>
                    <CardActionArea>
                        <Image
                            className="product-tile-image"
                            src={this.state.ProductImage}
                            title={this.state.ProductName}
                        />
                    </CardActionArea>
                    <CardActions>
                        <Typography component="h7" variant="h7">
                            {this.state.ProductName}</Typography>
                    </CardActions>
                    <CardActions>
                        <Typography component="h7" variant="h7">$ {this.state.ProductPrice}</Typography>
                    </CardActions>
                    <CardActions>
                        <Rating name="half-rating-read"  value={this.state.ProductRating} precision={0.2} readOnly />
                    </CardActions>
                </Card>
            </Styles>
        );
    }
}


const mapStateToProps = state => {
    return {

    };
};


export default connect(mapStateToProps, {})(ProductTile);