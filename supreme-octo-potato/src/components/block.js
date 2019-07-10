import React, { Component } from 'react';

class Block extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  parseImage(string) {
    let base = string.split('?')[0];
    const paramString = string.split('?')[1];
    const id = this.getId(base);
    base = base.replace(id, '<span class="embedId">' + id + '</span>');
    const params = paramString.split('&');
    const coloredParams = params.map(p => {
      return this.parsedParam(p);
    }).join('&');
    return base + '?' + coloredParams;
  }

  handleClick() {
    const image = this.props.imageSource;
    this.props.handleClick(image);
  }

  getId(base) {
    const idRegex = new RegExp(/\/p\/rp\/(\w+)\.png/);
    const id = base.match(idRegex)[1];
    return id;
  }

  render() {
    const parsedImage = this.parseImage(this.props.imageSource);

    return (
      <div className="block" onClick={this.handleClick}>
        <div className="imageSource" dangerouslySetInnerHTML={{__html: parsedImage}}></div>
        <img src={this.props.imageSource} alt=""></img>
      </div>
    );
  }

  parsedParam(text) {
    const param = text.split('=')[0];
    const value = text.split('=')[1];
    return `</br><span class="param">${param}</span>=<span class="value">${value}</span>`;
  }

}

export default Block;
