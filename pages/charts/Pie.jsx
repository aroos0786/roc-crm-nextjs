import React from 'react';
import {Pie} from 'react-chartjs-2';

const state = {
 
}

export default class PieChart extends React.Component {
  
  state={
    labels: [],
    datasets: []
  }
  
  componentWillReceiveProps(nextProps){
   
   let title=[];
   let total =[]
   for(let i=0; i < nextProps.data.length; i++){
      title.push(nextProps.data[i].status)
      total.push(nextProps.data[i].total_results)
   }
   
   console.log('test', title)
   
   this.setState({
    labels:title,
     datasets:[ {
      label: 'Rainfall',
      backgroundColor: [
        '#007bff',
        
        '#dc3545',
        '#28a745',
      ],
      hoverBackgroundColor: [
        '#007bff',
        
        '#dc3545',
        '#28a745',
      ],
      data: total
    }]
   })
  }
  
  render() {
    return (
      <div>
        <Pie
          data={this.state}
          options={{
            title:{
              display:false,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:false,
              position:'bottom'
            }
          }}
        />
      </div>
    );
  }
}
