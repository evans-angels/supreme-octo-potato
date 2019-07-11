import React, { Component } from 'react';


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    if (!this.state.url) {
      alert('no url provided');
    } else {
      // this.props.grabImages(this.proxyUrl(this.state.url));
      this.props.grabImages(this.proxyUrl(this.state.url));
    }
  }

  proxyUrl(url) {
    // const a = document.createElement('a');
    // a.href = url;
    //
    // let port = '';
    // if (a.port === '0' || a.port === '') {
    //   port = a.protocol === 'https:' ? ':443' : '';
    // } else {
    //   port = `:${a.port}`;
    // }
    //
    // const { hostname, pathname, search, hash } = a;
    // return `http://cors.movableink.com/${hostname}${port}${pathname}${search}${hash}`;
    return `https://cors-anywhere.herokuapp.com/${url}`; // heroku doesn't allow http, only https
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  render() {
    return (
      <div style={{'width': '100%'}}>
        <input id="link" placeholder="Insert VOL here" onChange={this.handleChange}></input>
        <br/>
        <button id="search" onClick={this.handleClick}>Search page for MI Images</button>
      </div>
    );
  }
}

export default Input;
