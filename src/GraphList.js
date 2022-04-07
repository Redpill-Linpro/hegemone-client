import React from 'react';
import DataService from './services/DataService';
import Graph from './Graph.js';

const DEVICE_ID = "device_id";

function getDevices(items){
    var lookup = {};
    var result = [];

    for (var item, i = 0; item = items[i++];) {
        var name = item[DEVICE_ID];

        if (!(name in lookup)) {
        lookup[name] = 1;
        result.push(name);
        }
    }
    return result;
}

class GraphList extends React.Component {
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

        var devices = getDevices(items);

        console.log(devices);

        if (!DataisLoaded) return (
            <div>
                Loading...
            </div>
        );
        

        return (
            <>
            {devices.map((name) => (
                <Graph device_id={name} key={name}/>
            ))}
            </>
        );
    }
}


export default GraphList;