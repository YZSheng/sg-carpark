import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: null
    };
    this.loadData = this.loadData.bind(this);
  }
  loadData() {
    // Discuss in class with Max the problem with this code
    // E.g. no null check, mixing http logic with view, magical "this" binding
    // Maybe even introduce lifecycle events here, e.g. componentDidMount
    axios
      .get("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then(response => {
        const availability = response.data.items[0].carpark_data;
        console.log(availability);
        this.setState({ availability });
      });
  }
  render() {
    // Explain the `map` call below, make sure students understand the power of JSX
    // Explain why there needs to be a `key` prop in `map`
    return (
      <div className="App">
        <h1>Singapore HDB Carpark Availability</h1>
        <button onClick={this.loadData}>Click me to load data</button>
        {this.state.availability ? (
          <table>
            <thead>
              <tr>
                <th>Carpark Number</th>
                <th>Total Lots</th>
                <th>Lot Type</th>
                <th>Lots Available</th>
              </tr>
            </thead>
            <tbody>
              {this.state.availability.map(availability => (
                <tr key={`${availability.carpark_number}-${availability.carpark_info[0].lot_type}`}>
                  <td>{availability.carpark_number}</td>
                  <td>{availability.carpark_info[0].total_lots}</td>
                  <td>{availability.carpark_info[0].lot_type}</td>
                  <td>{availability.carpark_info[0].lots_available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    );
  }
}

export default App;
