import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,  Legend, ResponsiveContainer } from 'recharts';



export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';

    state={
      data : []
    } 

  componentWillReceiveProps(nextProps){
   let data =[]
    for(var i=0; i < nextProps.data.length ; i++){
      const obj={
        name: nextProps.data[i].year_month,
        Pending: nextProps.data[i].pending_results,
        Open: nextProps.data[i].open_results,
        Success: nextProps.data[i].success_results,
      }
      data.push(obj)
    }  
    
    this.setState({
      data:data
    })
   
  }


  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={100}
          data={this.state.data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Open" stackId="a" fill="#007bff" />
          <Bar dataKey="Pending" stackId="a" fill="#dc3545" />
          <Bar dataKey="Success" stackId="a" fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}


   