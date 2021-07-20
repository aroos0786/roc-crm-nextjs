import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';

const state = {
  labels: ['Expences', 'Income'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000'
      ],
      data: [80, 59]
    }
  ]
}

export default class CC extends React.Component {
  render() {
    return (
      <div>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />

        <Doughnut
          data={state}
          options={{
            title:{
              display:true,
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