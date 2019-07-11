import React, { Component } from 'react';
import Block from './block';

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { images: [] };
  }

  componentWillReceiveProps(props) {
    this.setState({images: props.images});
  }

  handleClick(image) {
    this.props.setSelectedImage(image);
  }

  render() {
    const images = this.state.images;

    return (
      <div className="imageContainer">
        {images.map((src, i) =>
          <Block key={i} imageSource={src} handleClick={this.handleClick}/>) }
      </div>
    );
  }
}

export default ImageContainer;
