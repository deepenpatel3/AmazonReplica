import React, { Component } from 'react';
import Axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';

class ProductGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [{}],
            products:[],
            soldproducts:[]
        }
    }

    componentDidMount(){
        var data={
            id:localStorage.getItem("id")
        }
        Axios.defaults.withCredentials = true;
        Axios
        .post("http://localhost:3001/",data)
        .then(response=>{
            console.log("Status code:",response.status);
            if(response.status === 200){
                console.log(response.data);
            this.setState({
                rows:response.data,
            })
            console.log(this.state.rows)
            var products=[], soldproducts=[];
            this.state.rows.map(member=>products.push(member._id))
            this.state.rows.map(member=>soldproducts.push(member.soldproducts_count))
            console.log(soldproducts);
            this.setState({
                products:products,
                soldproducts:soldproducts
            })
          }
        })
        .catch()
    }
    
    render() {
        const data = {
            labels: this.state.products,
            datasets: [
              {
                label: 'Top 5 most sold products',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.soldproducts
              }
            ]
          }
        console.log(this.state.soldproducts)
        return (
            <div style={{ background: "#fafafa" }}>
                   <Line ref="chart" data={data} />
            </div>
        )
    }
}

export default ProductGraph;