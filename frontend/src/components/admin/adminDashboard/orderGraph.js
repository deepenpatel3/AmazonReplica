import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class OrderGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //rows: [{}],
            days:[],
            orders:[]
        }
    }

    componentDidMount(){
        /*
        var data={
            id:localStorage.getItem("id")
        }*/
            axios.defaults.withCredentials = true;
           
        }
    
    render() {
        const data = {
            labels: this.state.days,
            datasets: [
              {
                label: 'Number of orders per day',
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
                data: this.state.orders
              }
            ]
          }
console.log(this.state.orders)
        return (
            <div style={{ background: "#fafafa" }}>
                   <Bar ref="chart" data={data} />
            </div>
        )
    }
}

export default OrderGraph;