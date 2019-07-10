import React, { Component } from 'react';
import Input from './components/input';
import ImageContainer from './components/imagesContainer';
import Header from "./components/Header.js";
import { calculateVariantCount, getAllVariations } from "./utils/helpers.js";
// import OutputContainer from "./containers/OutputContainer.js";
// import OutputControl from "./containers/OutputControl.js";
// import QueuedParamList from "./components/QueuedParamList.js";
import ImageSource from "./components/ImageSource.js";
// import Geolocation from "./components/GeoLocation.js";
// import ParamPicker from "./components/ParamPicker.js";
// import ParamInput from "./components/ParamInput.js";
// import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      selectedImage: null,
      totalContentCount: 0,
      rulesToRun: {
        hasValidatedSourceURL: false, ///need to wire up
        validatedSourceUrl: "",
        csvUploadedOrSkipped: false
      },
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

  updateStateParams(params, editParam, geolocationParams) {
    // console.log("STATE UPDATE");
    // console.log(params);
    const currentParam = editParam.length ? editParam[0] : { text: "", key: "" };
    const fullQueryStrings = getAllVariations(params, geolocationParams);
    const fullUrls = fullQueryStrings.map(q => `${this.state.rulesToRun.validatedSourceUrl}${q}`);
    const currentLocationParams = this.state.currentLocationParams;
    if (this.state.options.usingProxies) {
      const promiseProxies = this.getProxyUrls(fullUrls);

      Promise.all(promiseProxies).then(proxyUrls => {
        // console.log('inside the promise')
        // console.log(params)
        this.setState({
          params: params,
          totalContentCount: calculateVariantCount(params),
          fullQueryStrings: fullQueryStrings,
          fullUrls: fullUrls,
          currentParam: currentParam,
          proxyUrls: proxyUrls,
          currentLocationParams: currentLocationParams
        });
      });
    } else {
      this.setState({
        params: params,
        totalContentCount: calculateVariantCount(params),
        fullQueryStrings: fullQueryStrings,
        fullUrls: fullUrls,
        currentParam: currentParam,
        proxyUrls: fullUrls,
        currentLocationParams: currentLocationParams
      });
    }
  }

  handleInputSourceChange = e => {
    const imgSource = e.target.value;
    const csvUploadedOrSkipped = this.state.rulesToRun.csvUploadedOrSkipped;
    // validate to make sure its an image
    if ((imgSource + "").indexOf(".png") > -1) {
      // const newState = Object.m
      this.setState({
        rulesToRun: {
          hasValidatedSourceURL: true,
          validatedSourceUrl: imgSource,
          csvUploadedOrSkipped
        }
      });
      return;
    }
    // this.setState({ rulesToRun: { validatedSourceUrl: imgSource } });
  };

  render() {
    const count = this.state.totalContentCount;
    const tooManyVariants = count > 100;
    const selectedImage = this.state.selectedImage;
    const {
      rulesToRun: { hasValidatedSourceURL, validatedSourceUrl, csvUploadedOrSkipped }
    } = this.state;
    return (
      <div className="App">
        <Header count={count} tooManyVariants={tooManyVariants} />
        <div className="container">
        {!selectedImage ? (
          <>
          <Input grabImages={this.grabImages}></Input>
          <ImageContainer setSelectedImage={this.setSelectedImage} images={this.state.images}/>
          )
              </>
            ) :
            <ImageSource validatedSourceUrl={selectedImage} onInputSourceChange={this.handleInputSourceChange} />
            }

        </div>
      </div>
    );
  }
}

export default App;
