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
import { getProducts, addProduct } from '../../../Redux/actions/seller/productAction';
import Paper from '@material-ui/core/Paper';
import MaterialUiButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';




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
    .add-product-button-bar {
        margin: 1px;
        width: 100%;
        margin: 1px;
      },
    .add-product-button {
        display: flex;
        justifyContent: 'end',
        margin: 2px;
    }
    .chip-paper {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    }
    .category-chip {
       margin: 1px;
       height: 15px;
       padding: 1px;
    }
    .product-dashboard{
        width: 100%;
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
            modalShow: false,
            imageModalShow: false,
            ProductImages: [],
            cetagoriesSet: ["Shoes", "Toys", "Outdoors", "Clothing", "Beauty", "Electronics", "Computers", "Home"],
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleImageShow = this.handleImageShow.bind(this);
        this.handleImageClose = this.handleImageClose.bind(this);
    }


    handleChange = (e, value) => {
        e.preventDefault();
        this.props.getProducts(this.props.productData, value, this.state.limit);
    };

    handleDelete = (id) => () => {
        var arr = this.state.cetagoriesSet;
        arr.splice(id, 1);
        this.setState({
            cetagoriesSet: arr,
        });
    };
    handleImageShow = (e) => {
        this.setState({
            imageModalShow: true,
        })
    }
    handleImageClose = (e) => {
        this.setState({
            imageModalShow: false,
        })
    }
    handleClose = (e) => {
        // e.preventDefault();
        this.setState({
            modalShow: false,
        })
    };

    handleShow = (e) => {
        e.preventDefault();
        console.log("Inside handleShow");
        this.setState({
            modalShow: true,
        })
    };

    onProductCardListner = (id) => {
        console.log("Product id: ", id);
        this.setState({
            SelectedProduct: this.state.products[id],
            ProductDetailsView: true,
        });
    };

    onFileUploadChangeHandler = event => {
        this.setState({
            ProductImages: event.target.files,
        })

    }

    onAddProductClick = (e) => {
        e.preventDefault();
        const product = {
            Name: this.state.Name,
            Price: this.state.Price,
            Description: this.state.Description,
            SellerId: localStorage.getItem("id"),
            SellerName: localStorage.getItem("name"),
        }
        this.handleClose();
        this.props.addProduct(product, this.state.ProductImages);
    }

    onBackClickListner = () => {
        this.setState({
            SelectedProduct: null,
            ProductDetailsView: false,
        });
    }

    onValueChangeHandler = (e) => this.setState({ [e.target.name]: e.target.value })
    componentDidMount() {
        var sellerId = localStorage.getItem("id");
        this.props.getProducts(this.props.productData, "5ea75b988d81e96fa24e18ec", 1, this.state.limit);
        if (!this.props.productData) {
            this.setState({
                products: this.props.productData.products
            })
            if (this.props.productData) {
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
                    <Modal show={this.state.modalShow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Product Name</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="Name" placeholder="Product name" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Product Price</Form.Label>
                                        <Form.Control onChange={this.onValueChangeHandler} name="Price" type="Number" placeholder="Product price" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Categories</Form.Label>
                                        <GridList cellHeight={40} spacing={1} cols={Math.min(this.state.cetagoriesSet.length, 4)} >
                                            {this.state.cetagoriesSet.map((data, id) => {
                                                return (
                                                    <GridListTile className="category-chip">
                                                        <Chip
                                                            label={data}
                                                            onDelete={this.handleDelete(id)}
                                                        />
                                                    </GridListTile>
                                                )
                                            })}
                                        </GridList>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="employer">
                                        <Form.Label className="signup-form-lable">Upload Product Images</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="employer">
                                        <input type="file" multiple name="file" onChange={this.onFileUploadChangeHandler} />
                                        <div className="images-upload-button">
                                            {/* <MaterialUiButton
                                                variant="contained"
                                                color="default"
                                                size="small"
                                                startIcon={<CloudUploadIcon />}
                                            >
                                                Upload
                                            </MaterialUiButton> */}
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="end_date">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control as="textarea" name="Description" onChange={this.onValueChangeHandler} placeholder="Write description here..." rows="3" />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.onAddProductClick}>
                                Add Product
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="product-filter-bar"></div>
                        <Row>
                            <Col sm={2} md={2}>
                                <div className="product-sidebar">
                                    Hey
                            </div>
                            </Col>
                            <Col >
                                <Row>
                                    <Paper className="add-product-button-bar">
                                        <MaterialUiButton
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className="add-product-button"
                                            startIcon={<AddIcon />}
                                            onClick={this.handleShow}
                                        >
                                            Add Product
                                    </MaterialUiButton>
                                    </Paper>
                                </Row>
                                <Row className="product-dashboard">
                                    {this.state.products &&
                                        <GridList cellHeight={50} >
                                            {this.state.products.map((product, id) => (
                                                <ProductTile Product={product} id={id} onProductCardListner={this.onProductCardListner} />
                                            ))}
                                        </GridList>
                                    }
                                </Row>
                                <Row className="product-dashboard-pagination">
                                    <Pagination count={this.state.totalPages} page={this.state.activePage} onChange={this.handleChange} size="large" shape="rounded" />
                                </Row>
                            </Col>
                        </Row>
                </Styles >
            );
        }
    }
}


const mapStateToProps = state => {
    return {
        productData: state.sellerProductData,
    };
};


export default connect(mapStateToProps, { getProducts, addProduct })(ProductDashBoard);