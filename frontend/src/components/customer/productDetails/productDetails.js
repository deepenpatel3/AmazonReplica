import React, { Component } from 'react';
import ProductDetailsDashboard  from "../products/productDetailsDashBoard";
import {connect} from 'react-redux';
import {getProduct} from '../../../Redux/actions/customer/cartActions'
class ProductDetails extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.getProduct(this.props.match.params.id)
    }
    render(){
        return <div> 
            <ProductDetailsDashboard Product={this.props.product } /> 
        </div>
    }
}
const map = state => {
    return {
        product : state.cart.product
    }
}
export default connect(map,{getProduct})(ProductDetails);