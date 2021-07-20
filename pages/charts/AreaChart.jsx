import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {useDispatch} from 'react-redux';
import {getHttp} from '../../actions/config';
import { SERVER_URI } from "../../components/utils/config";
import axios from 'axios'
import cookie from 'js-cookie';

// const data = [
//   {
//     name: 'Page A',
//     uv: 0,
   
//   },
//   {
//     name: 'Page B',
//     uv: 3,
   
//   },
//   {
//     name: 'Page C',
//     uv: 1,
   
//   },
  
// ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/tiny-area-chart-uw0k8';
  //  const dispatch = useDispatch()
    state={
      data:[
        {
          name: 'abc',
          uv: 0,
         
        },
        {
          name: 'abc',
          uv: 1,
         
        },
      ]
    }


    componentWillReceiveProps(nextProps){
     
    
     

      //  const config = {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*',
      //     // 'Content-Type':'multipart/form-data',
      //     'X-Requested-With':'XMLHttpRequest',
      //     'Authorization': 'Bearer ' + cookie.get('token'),
      //   }
        
      // };
      
      // axios.get(`${SERVER_URI}api/admin/total-leads?countPerMonth=${nextProps.data}`, config) 
      // // getHttp(
      // //     `${SERVER_URI}api/admin/total-leads?countPerMonth=${nextProps.data}`
      // //   )
      
      //   .then((response) => {
      //       console.log('asdasdf', response.data.data)
      //         let newArr = []
      // //         newArr.push(this.state.data[0]) 
      //       for(let i=0; i< nextProps.data.length ; i++){
      //         let obj={
      //           name:nextProps.data[i].month,
      //           vu:nextProps.data[i].total_results,
      //         }    
      //         newArr.push(obj)
      //       }

            
      // this.setState({
      //   data:[...this.state.data, ...newArr]
      // })

      //       this.setState({
      //         data: newArr
      //       })
      //       // //   setData(response.data.data);
      //   //   dispatch({
      //   //       type: GET_STAT,
      //   //       payload: response.data.data
      //   //   })
      //   })
      //   .catch(function (error) {
      //     console.log('error')
      //   });

      //   console.log('data----', nextProps.data)
         console.log('state data----', nextProps.data)
    }

    

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={60}
          data={this.state.data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <Area dataKey="uv" stroke="#ae69f5" fill="#e7d1fc" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
