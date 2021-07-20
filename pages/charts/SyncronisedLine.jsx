import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import {
  getHttp2,
  postHttp,
  removeHttp,
  putHttp,
} from "../../actions/config";
import { SERVER_URI } from "../../components/utils/config";

// const data = [
//     {
//         name: 'FEB "00',
//         total: 10,
//         pv: 24,
//         amt: 24,
//       },
//     {
//     name: 'APR "00',
//     uv: 14,
//     pv: 24,
//     amt: 24,
//   },
//   {
//     name: 'JUN "00',
//     uv: 40,
//     pv: 13,
//     amt: 22,
//   },
//   {
//     name: 'AUG "00',
//     uv: 20,
//     pv: 98,
//     amt: 22,
//   },
//   { 
//     name: 'OCT "00',
//     uv: 18,
//     pv: 39,
//     amt: 20,
//   },
//   {
//     name: 'DEC "00',
//     uv: 28,
//     pv: 48,
//     amt: 21,
//   },
//   {
//     name: 'FEB "00',
//     uv: 33,
//     pv: 38,
//     amt: 2500,
//   },
//   {
//     name: 'APR "00',
//     uv: 12,
//     pv: 43,
//     amt: 2100,
//   },
// ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/synchronized-line-charts-zc3nl';

  state = {
    data: []
  }

  getCallFun = async ()  => {
    let data = await getHttp2(`${SERVER_URI}api/admin/total-leads?getGraphData=1`)
    // console.log('data ok', data.data.data)
    this.setState({
      data: data.data.data
    })
  }
  componentDidMount() {
    this.getCallFun()
  }

  

  render() {
    return (
      <div style={{ width: '100%' }}>
        {/* <h4>A demo of synchronized AreaCharts</h4> */}

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={this.state.data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_results" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        {/* <p>Maybe some other content</p>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            <Brush />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer> */}
      </div>
    );
  }
}
