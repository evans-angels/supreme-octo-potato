import React, { Component } from "react";
import Input from "./components/input";
import CD from "cropduster";
import ImageContainer from "./components/imagesContainer";
import Header from "./components/Header.js";
import { calculateVariantCount, getAllVariations } from "./utils/helpers.js";
import OutputContainer from "./containers/OutputContainer.js";
import OutputControl from "./containers/OutputControl.js";
import QueuedParamList from "./components/QueuedParamList.js";
import ImageSource from "./components/ImageSource.js";
import Geolocation from "./components/GeoLocation.js";
import ParamPicker from "./components/ParamPicker.js";
import ParamInput from "./components/ParamInput.js";
import logo from "./logo.svg";
import "./App.css";
import $ from "jquery";

class App extends Component {
  inputElement = React.createRef();
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
      options: {
        hasGeolocation: false,
        hasParams: false,
        usingProxies: false
      },
      actions: {
        showInBrowser: false,
        showPDF: false,
        showUrls: false
      },
      activeParams: [],
      params: [],
      fullQueryStrings: [],
      fullUrls: [],
      proxyUrls: [],
      currentParam: {
        text: "",
        key: ""
      },
      currentLocationParams: []
    };
    this.grabImages = this.grabImages.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this);
  }

  setSelectedImage(image) {
    this.setState({ selectedImage: image, rulesToRun: {validatedSourceUrl: image.split('?')[0] }});
  }

  grabImages(url) {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        try {

          const $doc = $(data);
          const imageTags = $doc.find("img");
          if (!imageTags.length) {
            throw new Error("no images found");
          }

          const miImageTags = imageTags.filter((i, v) => {
            const src = $(v).attr("src");
            return src.indexOf(".com/p/rp") > -1;
          });
          if (!miImageTags.length) {
            alert("no mi images found");
            throw new Error("no mi images found");
          }

          const images = $.map(miImageTags, (v, i) => {
            return $(v).attr("src");
          });

          this.setState({ images });
        } catch (e) {
          console.log(e);
        }
      });
  }

  viewInBroswer = e => {
    this.setState({ actions: { showInBrowser: !this.state.actions.showInBrowser } });
  };

  generatePDF = e => {
    this.setState({ actions: { showPDF: !this.state.showPDF } });
  };

  showUrls = e => {
    this.setState({ actions: { showUrls: !this.state.showUrls } });
  };

  toggleProxies = e => {
    this.setState({ options: { usingProxies: !this.state.usingProxies } });
  };

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

  resetState(editParam) {
    const currentParam = editParam.length ? editParam[0] : { text: "", key: "" }; //BUGGGG
    this.setState({
      params: [],
      totalContentCount: 0,
      fullQueryStrings: [],
      fullUrls: [],
      currentParam: currentParam,
      proxyUrls: []
    });
  }

  getProxyUrls(fullUrls) {
    return fullUrls.map(async url => await CD.proxyUrl(url));
  }

  updateStateParams(params, editParam, geolocationParams) {
    console.log('update state params');
    console.log(params)
    const currentParam = editParam.length ? editParam[0] : { text: "", key: "" };
    const fullQueryStrings = getAllVariations(params, geolocationParams);
    const fullUrls = fullQueryStrings.map(q => `${this.state.rulesToRun.validatedSourceUrl}${q}`);
    const currentLocationParams = this.state.currentLocationParams;
    if (this.state.options.usingProxies) {
      const promiseProxies = this.getProxyUrls(fullUrls);

      Promise.all(promiseProxies).then(proxyUrls => {
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

  addParam = e => {
    e.preventDefault();
    const addParam = this.state.currentParam;
    const currentParams = this.state.params;
    const keys = currentParams.map(v => { return v.text.split('=')[0] });
    const geolocationParams = this.state.currentLocationParams;
    if (addParam.text !== "" && keys.indexOf(addParam.text.split('=')[0]) === -1) {
      const params = [...this.state.params, addParam];
      return this.updateStateParams(params, [], geolocationParams);
    }
  };

  editParam = key => {
    const editParam = this.state.params.filter(param => param.key === key);
    const filteredParams = this.state.params.filter(param => param.key !== key);
    const geolocationParams = this.state.currentLocationParams;
    if (filteredParams.length) {
      return this.updateStateParams(filteredParams, editParam, geolocationParams);
    } else {
      return this.resetState([], editParam, geolocationParams);
    }
  };

  deleteParam = key => {
    const filteredParams = this.state.params.filter(param => param.key !== key);
    const geolocationParams = this.state.currentLocationParams;
    if (filteredParams.length) {
      return this.updateStateParams(filteredParams, [], geolocationParams);
    } else {
      return this.resetState(filteredParams, [], geolocationParams);
    }
  };

  handleInput = e => {
    const paramName = e.target.value;
    const currentParam = { text: paramName, key: Date.now() };
    this.setState({
      currentParam
    });
  };

  skipCsvUpload = e => {
    const csvUploadedOrSkipped = !this.state.rulesToRun.csvUploadedOrSkipped;
    const { hasValidatedSourceURL, validatedSourceUrl } = this.state.rulesToRun;

    this.setState({
      rulesToRun: {
        hasValidatedSourceURL: hasValidatedSourceURL,
        validatedSourceUrl: validatedSourceUrl,
        csvUploadedOrSkipped: csvUploadedOrSkipped
      }
    });
  };

  handleLocationParams = e => {
    // console.log("city selected");
    // console.log(e);
    const inputLocation = e;
    // console.log(this.state)
    const duplicateCheck = this.state.currentLocationParams.filter(location => location === inputLocation);
    const geolocationParams = duplicateCheck.length
      ? this.state.currentLocationParams.filter(location => location !== inputLocation)
      : [...this.state.currentLocationParams, inputLocation];
    const params = this.state.params || [];
    return this.updateStateParams(params, [], geolocationParams);
  };
  initializeParams(value) {
    const geolocationParams = this.state.currentLocationParams;
    const currentParams = this.state.params;
    const keys = currentParams.map(v => { return v.text });
    if (value.text !== "" && keys.indexOf(value.text) === -1) {
      const params = [...this.state.params, value];
      return this.updateStateParams(params, [], geolocationParams);
    }
  }

  handleCSVUpload = data => {
    console.log('handle csv upload')
    const mergeParamArray = data[0];
    const paramValues = data.slice(1, data.length);

    const paramBreakOut = mergeParamArray.map((param, idx) => {
      let allValues = [];
      if (param) {
        paramValues.forEach(value => {
          if (value && value[idx]) {
            let paramValue = value[idx];
            if (value[idx] === "TRUE") {
              paramValue = "true";
            } else if (value[idx] === "FALSE") {
              paramValue = "false";
            }
            allValues.push(paramValue);
          }
        });
      }

      return `${param}=${allValues.join("|")}`;
    });
    // console.log('look here')
    // console.log(paramBreakOut)
    paramBreakOut.forEach(uploadParam => {
      const currentParam = { text: uploadParam, key: Date.now() };
      // console.log("indvidual param");
      // console.log(currentParam);
      this.setState({
        currentParam
      });
      const geolocationParams = this.state.geolocationParams;
      const addParam = this.state.currentParam;
      const params = [...this.state.params, addParam];
      console.log('params')
      console.log(params);
      return this.updateStateParams(params, [], geolocationParams);
    });

    const csvUploadedOrSkipped = !this.state.rulesToRun.csvUploadedOrSkipped;
    const validatedSourceUrl = this.state.rulesToRun.validatedSourceUrl;
    const hasValidatedSourceURL = this.state.rulesToRun.hasValidatedSourceURL;
    this.setState({
      rulesToRun: {
        hasValidatedSourceURL: hasValidatedSourceURL,
        validatedSourceUrl: validatedSourceUrl,
        csvUploadedOrSkipped: csvUploadedOrSkipped
      }
    });
  };

  render() {
    const count = this.state.totalContentCount;
    const tooManyVariants = count > 100;
    const selectedImage = this.state.selectedImage || '';
    const params = this.state.params;
    const initialImageParams = selectedImage.split('?')[1] || '';
    if (initialImageParams.length) {
      const individualParams = initialImageParams.split('&');
      individualParams.forEach(v => this.initializeParams({ text: v, key: Date.now() }));
    }
    const {
      rulesToRun: { hasValidatedSourceURL, validatedSourceUrl, csvUploadedOrSkipped }
    } = this.state;
    const renderOutputControls = hasValidatedSourceURL && !!params.length;
    const renderParamListAndControls = hasValidatedSourceURL && csvUploadedOrSkipped;
    const renderParamPicker = !renderParamListAndControls && hasValidatedSourceURL;
    return (
      <div className="App">
        <Header count={count} tooManyVariants={tooManyVariants} />
        <div className="container">
          {!selectedImage ? (
            <>
              <Input grabImages={this.grabImages} />
              <ImageContainer setSelectedImage={this.setSelectedImage} images={this.state.images} />
            </>
          ) : (
            <ImageSource validatedSourceUrl={validatedSourceUrl} onInputSourceChange={this.handleInputSourceChange} />
          )}

          {renderParamPicker && (
            <>
              <QueuedParamList
                params={params}
                deleteParam={this.deleteParam}
                editParam={this.editParam}
                handleLocationParams={this.handleLocationParams}
                currentLocationParams={this.currentLocationParams}
              />
              <ParamPicker
                csvUploadedOrSkipped={csvUploadedOrSkipped}
                handleCSVUpload={this.handleCSVUpload}
                skipCsvUpload={this.skipCsvUpload}
              />
            </>
          )}

          {renderParamListAndControls && (
            <>
              <QueuedParamList params={params} deleteParam={this.deleteParam} editParam={this.editParam} />
              <Geolocation handleLocationParams={this.handleLocationParams} currentLocationParams={this.currentLocationParams} />
              <ParamInput
                addParam={this.addParam}
                inputElement={this.inputElement}
                handleInput={this.handleInput}
                currentParam={this.state.currentParam}
              />
            </>
          )}
          {renderOutputControls && (
            <OutputControl
              hasValidatedSourceURL={hasValidatedSourceURL}
              tooManyVariants={tooManyVariants}
              generatePDF={this.generatePDF}
              viewInBroswer={this.viewInBroswer}
              showUrls={this.showUrls}
            />
          )}
          <OutputContainer
            validatedSourceUrl={validatedSourceUrl}
            showPDF={this.state.actions.showPDF}
            showInBrowser={this.state.actions.showInBrowser}
            proxyUrls={this.state.proxyUrls}
            fullQueryStrings={this.state.fullQueryStrings}
            showUrls={this.state.actions.showUrls}
            fullUrls={this.state.fullUrls}
          />
        </div>
      </div>
    );
  }
}

export default App;
