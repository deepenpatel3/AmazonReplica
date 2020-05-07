import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import Select from '@material-ui/core/Select';

class AdminOrders extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
              <Navbar/>
              <div class="container">
              <h5 className="text-center" style={{fontFamily:"Officina Sans Bold" ,fontWeight: "700", margin: "0.1em"}}>Orders</h5>
                <div className="row">
                <div className="col-md-12"  >
                <div className="form-inline my-2 my-lg-1" style={{ marginLeft: "10%"}}>
                
                <form onSubmit={this.handleAdd}>
                <div className="form-group">
                <h5>Filters:</h5>
                <div className="br"></div>
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search by Seller </button>
                </div>
                </form>
               <div className="br"></div>

                <form onSubmit={this.handleRemove}>
                <div className="form-group">
                    <Select className="ui search dropdown" style={{ width: "13pc" }} value={this.state.value} onChange={this.handleChange}>
                        <option value="category1">Order Placed</option>
                        <option value="category2">Order shipped</option>
                        <option value="category3">On the way</option>
                        <option value="category4">Delivered</option>
                    </Select>
                    <div className="spacing_inv"></div>
                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search by Status</button>
                        </div>
                      
                </form>
                </div>
                </div>
                </div>
                    <hr/>
                </div>
            </div>
        )
    }
}

export default AdminOrders;
