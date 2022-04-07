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



//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const dataset_labels = {
  "soil_temp":"Soil Temperature",
  "ambient_temp": "Ambient Temperature",
  "moisture_level": "Moisture Level",
  "light_measurement": "Light Measurement"
};


class Graph extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        DataService.get(this.props.device_id)
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
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Line Chart for ' + this.props.device_id,
            },
          },
        };
        const data_soil = {
            labels,
            datasets: [
              {
                label: 'Dataset ' + dataset_labels["soil_temp"],
                data: items.map(msmt => msmt.soil_temp),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          };
          const data_ambient = {
            labels,
            datasets: [
              {
                label: 'Dataset ' + dataset_labels["ambient_temp"],
                data: items.map(msmt => msmt.ambient_temp),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
          const data_moisture = {
            labels,
            datasets: [
              {
                label: 'Dataset ' + dataset_labels["moisture_level"],
                data: items.map(msmt => msmt.moisture_level),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          };
          const data_light = {
            labels,
            datasets: [
              {
                label: 'Dataset ' + dataset_labels["light_measurement"] + " Red",
                data: items.map(msmt => msmt.light_measurement.red),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Dataset ' + dataset_labels["light_measurement"] + " Blue",
                data: items.map(msmt => msmt.light_measurement.blue),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
              {
                label: 'Dataset ' + dataset_labels["light_measurement"] + " Green",
                data: items.map(msmt => msmt.light_measurement.green),
                borderColor: 'rgb(50, 168, 82)',
                backgroundColor: 'rgba(50, 168, 82, 0.5)',
              },
              {
                label: 'Dataset ' + dataset_labels["light_measurement"] + " White",
                data: items.map(msmt => msmt.light_measurement.white),
                borderColor: 'rgb(255, 255, 255)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
              {
                label: 'Dataset ' + dataset_labels["light_measurement"] + " Far Red",
                data: items.map(msmt => msmt.light_measurement.far_red),
                borderColor: 'rgb(69, 0, 0)',
                backgroundColor: 'rgba(69, 0, 0, 0.5)',
              },
            ],
          };

        if (!DataisLoaded) return (
            <div>
                Loading...
            </div>
        );
        

        return (
            <div>
              <div className="device-container">
                <div className="chart-container">
                  <Line options={options} data={data_soil} />
                </div>
                <div className="chart-container">
                  <Line options={options} data={data_ambient} />
                </div>
                <div className="chart-container">
                  <Line options={options} data={data_moisture} />
                </div>
                <div className="chart-container">
                  <Line options={options} data={data_light} />
                </div>
              </div>
            </div>
        );
    }
}

export default Graph;