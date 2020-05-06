import React, { Component } from 'react';
import './dashboard.css';
import CustomerGraph from './customerGraph'
import OrderGraph from './orderGraph'
import ProductGraph from './productGraph'
import ProductRatingGraph from './productRatingGraph';
import ProductviewGraph from './productViewGraph';
import SellerGraph from './sellerGraph';

class AnalyticsDashboard extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div>
            <h1 style={{fontWeight: "700", margin: "0.5em"}}>Analytics Dashboard</h1>
            <div className='rowC' style={{ display: "flex", flexDirection: "row" }}>
                
                <div className="container">
                    <div className="row mt-4">
                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <CustomerGraph />
                            </div>
                        </div>

                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <OrderGraph />
                            </div>
                        </div>

                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <ProductGraph />
                            </div>
                        </div>

                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <ProductRatingGraph />
                            </div>
                        </div>

                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <ProductviewGraph />
                            </div>
                        </div>

                        <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "18em", "width": "30em" }}>

                            <div className="card-body" >
                                <SellerGraph />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default AnalyticsDashboard;