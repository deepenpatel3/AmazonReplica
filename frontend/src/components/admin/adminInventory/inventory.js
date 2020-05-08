import React, { Component } from 'react';
import Navbar from '../navbar/navbar';
import { Dropdown } from 'react-bootstrap';
import './inventory.css';
import Select from '@material-ui/core/Select';

class AdminInventory extends Component{
    constructor(props){
        super(props);
        this.state={
            
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleRemove= this.handleRemove.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
    }

    // componentDidMount(){
    //   
    // }

    handleChange(e){
        this.setState(
            {
                value: e.target.value
            }
        );
    }

     handleRemove(e){
     alert('You are going to remove '+this.state.value);
     e.preventDefault();
    }
   
     handleAdd(e){
       
        e.preventDefault();
     }

    render(){

        return(
            <div>
                <Navbar/>
                <div class="container">
                <div className="row">
                <div className="col-md-12"  >
                <div className="form-inline my-2 my-lg-1" style={{ marginLeft: "17%"}}>
                
                <form onSubmit={this.handleAdd}>
                <div className="form-group">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onSubmit={this.handleAdd}>Add Category</button>
                </div>
                </form>
               <div className="br"></div>

                <form onSubmit={this.handleRemove}>
                <div className="form-group">
                    <Select className="ui search dropdown" style={{ width: "13pc" }} value={this.state.value} onChange={this.handleChange}>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </Select>
                    <div className="spacing_inv"></div>
                        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onSubmit={this.handleRemove}>Remove Category</button>
                        </div>
                      
                </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default AdminInventory;