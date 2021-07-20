import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default class DoughnutChart extends React.Component {
 
  
  state = {
    labels: [],
    entries: [],
    datasets: [

    ]
  }


 
  

  componentWillReceiveProps(nextProps) {
    let name = [];
    let total = [];
    for(var i=0; i < nextProps.data.length ; i++){
      name.push(nextProps.data[i].lead_source)
      total.push(nextProps.data[i].total_leads_currenct_month)
    }   
    
    console.log('wroking uodagte---------------',  this.props.data)
    console.log('nextProps uodagte---------------',  nextProps.data)
    this.setState({
      entries: nextProps.data,
      datasets: [{
        
          label: 'Rainfall',
          backgroundColor: [
            '#ae69f5',
            '#008ffb',
            '#28a745',
            '#ffc107',
            '#ff0000',
            '#faaf00',
            '#00faf0'
          ],
          // hoverBackgroundColor: [
          // '#501800',
          // '#4B5000'
          // ],
          data: total
        
      }],
      labels: name,
    
    })
    // this.setState({
    //    lebels: name,
    //    datasets: [ {
    //     label: 'Rainfall',
    //     backgroundColor: [
    //       '#ae69f5',
    //       '#28a745',
    //       '#ffc107'
    //     ],
    //     // hoverBackgroundColor: [
    //     // '#501800',
    //     // '#4B5000'
    //     // ],
    //     data: total
    //   }]
    // })
  }
 
  render() {
    return (
      <>
        <div>
        <Doughnut
          data={this.state}
          options={{
            title:{
              display:false,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      <div className="caption-wrapper">
        {/* <ul className="ins-caption mb-0">
          {this.state.datasets.map(
            (data,i)=>{
              return(
                <>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[0]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[0]}</span> </li></div></div>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[1]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[1]}</span> </li></div></div>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[2]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[2]}</span> </li></div></div>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[0]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[0]}</span> </li></div></div>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[1]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[1]}</span> </li></div></div>
                  <div className="ins-cover"><div className="ins-pointer" style={{backgroundColor: `${data.backgroundColor[2]}`}}></div><div><li key={i} className="ins-list-style-none"> <span>{this.state.labels[2]}</span> </li></div></div>
                </>
              );
            })}
        </ul> */}
      </div>
      </>
    );
  }
}