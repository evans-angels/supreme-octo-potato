import React, { Component } from 'react'
import Geolocation from './GeoLocation'
class QueuedParamList extends Component {
  createTasks = item => {
    console.log(item)
    return (
      <li key={item.key} >
        <span className="link tool" role="img" style={{'float': 'left'}}>&#x1D53E;</span>{item.text}<span onClick={() => this.props.deleteParam(item.key)} className="edit tool">&#10005;</span><span onClick={() => this.props.editParam(item.key)} className="remove tool">&#9998;</span>
      </li>
    )
  }
  render() {
    const paramEntries = this.props.params
    const listItems = paramEntries.map(this.createTasks)

    return (
      <div className="currentParamList">
      <div className="label">Current Query Params</div>
      {/* <Geolocation handleLocationParams={this.handleLocationParams} currentLocationParams={this.currentLocationParams} /> */}
      <ul className="queuedParamList">{listItems}</ul>
      </div>
      )
  }
}

export default QueuedParamList