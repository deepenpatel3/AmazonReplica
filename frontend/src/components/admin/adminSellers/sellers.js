import React, { Component } from 'react';
import Navbar from '../navbar/navbar';

class AdminSellers extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <Navbar/>
                <form class="form-inline my-2 my-lg-1" style={{ marginLeft: "35%"}}>
                <div className="form-group">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search Sellers</button>
                </div>
                </form>
            </div>
        )
    }
}

export default AdminSellers;