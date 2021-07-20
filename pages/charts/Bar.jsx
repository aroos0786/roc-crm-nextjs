import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May', 'April'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: '#ae69f5',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 0,
      barPercentage: 0.1,
      data: [65, 59, 80, 81, 56, 76]
    }
  ],
  options: {
    yAxisID:'0',
  }
}

export default class BarChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:false,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}