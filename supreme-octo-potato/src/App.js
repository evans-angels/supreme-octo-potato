import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      selectedImage: null
    };
    this.grabImages = this.grabImages.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this);
  }

  setSelectedImage(image) {
    this.setState({ selectedImage: image });
  }

  grabImages(url) {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        try {

          // data = data.replace(/<script src=/g, '<noscript class="mi-script-src" data-script-url=')
          // .replace(/<script/g, '<noscript class="mi-script-inline"')
          // .replace(/<\/script/g, "</noscript")
          // .replace(/onload=/g, "data-onload=")
          // .replace(/src=/g, "data-src=")
          // .replace(/srcset=/g, "data-srcset=");

          const $doc = $(data);
          const imageTags = $doc.find('img');
          if (!imageTags.length) {
            throw new Error('no images found');
          }

          const miImageTags = imageTags.filter((i, v) => {
            const src = $(v).attr('src');
            return src.indexOf('.com/p/rp') > -1;
          });
          if (!miImageTags.length) {
            alert('no mi images found');
            throw new Error('no mi images found');
          }

          const images = $.map(miImageTags, (v, i) => {
            return $(v).attr('src');
          });

          this.setState({images});

        } catch(e) {
          console.log(e);
        }

      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='https://d2j7qxqaxrrv1i.cloudfront.net/assets/logos/m-brandmark@2x-ff5e88fbcd5884186e67f4acc5d7d9645571be5902e2f9d7825f4ee8080b7bf9.png'
           className="App-logo" alt="logo" />
        </header>
        <div className="container">
          <Input grabImages={this.grabImages}></Input>
          <ImageContainer setSelectedImage={this.setSelectedImage} images={this.state.images}/>
        </div>
      </div>
    );
  }
}

export default App;
