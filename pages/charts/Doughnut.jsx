import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {
  getHttp2,
  postHttp,
  removeHttp,
  putHttp,
} from "../../actions/config";
import { SERVER_URI } from "../../components/utils/config";

// const state = {
//   labels: [],
//   entries: [],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: [
//         '#ae69f5',
//         '#008ffb',
//         '#28a745',
//         '#ffc107',
//         '#ff0000',
//         '#faebb2'
//       ],
//       // hoverBackgroundColor: [
//       // '#501800',
//       // '#4B5000'
//       // ],
//       data: [91, 34, 31, 7, 8],
//       entries: []
//     }
//   ]
// }


export default class DoughnutChart extends React.Component {
 
   state = {
    labels: [],
    entries: [],
    datasets: [

    ]
  }

  // get leads
  getCallFun = async ()  => {
    let data = await getHttp2(`${SERVER_URI}api/admin/total-leads?getLeadSource=1`)
    console.log('data ok', data.data.data)
    let lebels_arr = [];
    let result_arr=[];
  for(var i= 0; i< data.data.data.length; i++){
    lebels_arr.push(data.data.data[i].lead_source);
    result_arr.push(data.data.data[i].total_results);

  }
    this.setState({
      
      entries:data.data.data,
      datasets: [{
        
          label: 'Rainfall',
          backgroundColor: [
            // {
            //   switch(param) {
            //     case 'foo':
            //       return 'bar';
            //     default:
            //       return 'foo';
            //   }
            // }
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
          data: result_arr
        
      }],
      labels: lebels_arr,
    
    })
  }
  componentDidMount () {
    this.getCallFun() 
  }



  render() {
    console.log("this state labels:::",this.state.labels)

    if(this.state.entries.length > 0)
    {
      console.log("this state entries",this.state.entries)
    }


    return (
      <>
        <div>
        <Doughnut
          data={this.state}
          options={{
            title:{
              display: false,
              text:'',        
              fontSize:20
            },
            legend:{
              display: false,
              position:'bottom',
              fullSize: true,
              align: "center"
            }
          }}
        />
      </div>
      <div>
        <ul className="caption">
          {this.state.entries.map(
            (data,i)=>{
              return(
                <>
                {console.log("data in doughnet chart",data)}
                  <div className="cover">
                  {data.lead_source === "Facebook" ? 
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[0]}`}} ></div>
                                          : data.lead_source === "Instagram" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[1]}`}} ></div>
                                          : data.lead_source === "Whatsapp" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[2]}`}} ></div>
                                          : data.lead_source === "Pinterest" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[3]}`}} ></div>
                                          : data.lead_source === "Linkedin" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[4]}`}} ></div>
                                          : data.lead_source === "Chat" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[5]}`}} ></div>
                                          : data.lead_source === "Other" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[6]}`}} ></div>
                                          : data.lead_source === "Cold Call" ?
                                          <div className="pointer" style={{backgroundColor: `${this.state.datasets[0].backgroundColor[6]}`}} ></div>
                                          : null}
                    <div><li key={i} className="list-style-none"> <span>{data.lead_source}</span> <span>{data.total_results}</span></li></div></div>
                  
                </>
              );
            })}
        </ul>
      </div>
      </>
    );
  }
}

// style={{backgroundColor: `${data.backgroundColor[0]}`}}
// 'Facebook', 'Instagram', 'Whatsapp', 'Linkedin', 'Pinterest'