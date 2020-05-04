import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Card, CardGroup, Button, Jumbotron, Modal, Form, ListGroup, Alert, Container } from 'react-bootstrap';
import { Icon } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Pagination from '@material-ui/lab/Pagination';
import Navbar from '../navbar/navbar';
import ProductTile from './productTile';
import ProductDetailsDashBoard from './productDetailsDashBoard';
import { getProducts } from '../../../Redux/actions/customer/productActions';

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
    .product-dashboard-pagination{
        margin: 5px; 
        height:20px;
        width:500px;
    }
`;

class ProductDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            activePage: 1,
            totalPages: 1,
            limit: 8,
            totalDocs: null,
            ProductDetailsView: false,
            SelectedProduct: null,
        }
    }

    handleChange = (e, value) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, value, this.state.limit);
      };

    handlePageNext = (e) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, this.state.nextPage, this.state.limit);
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

    componentDidMount() {
        this.props.getProducts(this.props.productData, 1, this.state.limit);
        if (!this.props.productData) {
            this.setState({
                products: this.props.productData.products
            })
            if (this.props.jobData) {
                this.setState({
                    totalDocs: this.props.productData.totalDocs,
                    totalPages: this.props.productData.totalPages,
                    limit: this.props.productData.limit,
                    nextPage: this.props.productData.nextPage,
                    prevPage: this.props.productData.prevPage,
                    activePage: this.props.productData.page,
                });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps.products: ", JSON.stringify(nextProps.productData));
        if (nextProps.productData.page) {
            this.setState({
                totalDocs: nextProps.productData.totalDocs,
                totalPages: nextProps.productData.totalPages,
                limit: nextProps.productData.limit,
                nextPage: nextProps.productData.nextPage,
                prevPage: nextProps.productData.prevPage,
                activePage: nextProps.productData.page,
                products: nextProps.productData.products,
            })
        }
    };

    render() {
        if (this.state.ProductDetailsView) {
            return (
                <Styles>
                    <ProductDetailsDashBoard Product={this.state.SelectedProduct} onBackClickListner={this.onBackClickListner} />
                </Styles>
            )
        } else {
            return (
                <Styles>
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
                            <div className="product-dashboard-pagination">
                                <Pagination count={this.state.totalPages}  page={this.state.activePage} onChange={this.handleChange} size="large" shape="rounded" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                    <div className="product-dashboard-pagination"></div>
                    </Row>
                </Styles>
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        productData: state.customerProductData,
    };
};


export default connect(mapStateToProps, {getProducts})(ProductDashBoard);