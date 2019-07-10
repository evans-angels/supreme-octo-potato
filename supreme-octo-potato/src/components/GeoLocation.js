import React, { Component } from "react";
import domesticCities from "../utils/domesticCities.json";

class GeoLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      locations: []
    };
    this.handleInput = this.handleInput.bind(this);
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  handleInput = e => {
    this.props.handleLocationParams(e.target.value);
  };
  createCityOptions = (cityObj, idx) => {
    const { city, lat, lng } = cityObj;
    const value = `mi_lat=${lat}&mi_lon=${lng}`;
    return (
      <li key={"city" + idx}>
        <div className="label">{city}</div>
        <input
          key={"city_value" + idx}
          type="checkbox"
          placeholder={city}
          value={value}
          onChange={this.handleInput}
          name="citySelection"
        />{" "}
      </li>
    );
  };
  render() {
    const cityOptions = domesticCities.map(this.createCityOptions);
    return (
      <>
        <button className="geolocation" onClick={this.toggleHidden.bind(this)}>
          Include Geolocation
        </button>
        {!this.state.isHidden && (
          <ul multiple className="cityList">
            {cityOptions}
          </ul>
        )}
      </>
    );
  }
}

export default GeoLocation;
