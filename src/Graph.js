import React from 'react';
import DataService from './services/DataService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];




class Graph extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {

        DataService.getAll()
            .then((response) => {
                this.setState({
                    items: response.data,
                    DataisLoaded: true
                });
            })
            .catch(e => {
                console.log(e);
              });
    }
    render(){
        const { DataisLoaded, items } = this.state;
        const labels = items.map(msmt => msmt.date_time);
        const data = {
            labels,
            datasets: [
              {
                label: 'Dataset 1',
                data: items.map(msmt => msmt.soil_temp),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset 2',
                data: items.map(msmt => msmt.ambient_temp),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
        if (!DataisLoaded) return (
            <div>
                Loading...
            </div>
        );
        

        return (
            <Line options={options} data={data} />
        );
    }
}

export default Graph;