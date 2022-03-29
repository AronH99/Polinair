import React from "react";
import { geolocated } from "react-geolocated";

class Location extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <h3>Your browser does not support Geolocation</h3>
    ) : !this.props.isGeolocationEnabled ? (
      <h3>Geolocation is not enabled</h3>
    ) : this.props.coords ? (
      <section class="Location">
        <table>
          <tbody>
            <tr>
              <td>latitude</td>
              <td>{this.props.coords.latitude}</td>
            </tr>
            <tr>
              <td>longitude</td>
              <td>{this.props.coords.longitude}</td>
            </tr>
          </tbody>
        </table>
      </section>
    ) : (
      <h3>Getting the location Data</h3>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);
