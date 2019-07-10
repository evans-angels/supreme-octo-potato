import React, { Component } from 'react';
import Block from './block';

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  componentWillReceiveProps(props) {
    this.setState({images: props.images});
  }

  render() {
    const images = this.state.images;

    return (
      <div className="imageContainer">
        {images.map((src, i) =>
          <Block key={i} imageSource={src}/>) }
      </div>
    );
  }
}

export default ImageContainer;
