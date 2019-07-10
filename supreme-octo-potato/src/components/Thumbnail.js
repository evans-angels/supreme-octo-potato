import React, { Component } from "react";
import {colorCodeParams} from '../utils/helpers';
class Thumbnail extends Component {
  
  createThumbnails = (item,idx) => {
    const paramLength = item.colorCodeParams.length;
    return (
      <div className="imageBorder" key={'imgBorder' + idx}>
        <img alt="" src={item.imageSrc} key={'img' + idx} />
        <div className="imageInfo" key={'imgInfo' + idx}>
        <span>{item.validatedSourceUrl}{'?'}</span>
            {item.colorCodeParams.map((param, idx) => {
              return (
                <span key={"variation-child" + idx}>
              <span className="urlParamName">{param[0].trim()}</span>
              <span>{"="}</span>
              <span className="urlParamValue">{param[1].trim()}</span>
              {paramLength - 2 >= idx ? "&" : ""}
              </span>)
            })}
        </div>
      </div>
    );
  };
  render() {
    console.log(this.props)
    const fullUrls = this.props.fullUrls;
    const variations = this.props.fullQueryStrings;
    const validatedSourceUrl = this.props.validatedSourceUrl;
    const parsedParams = variations.map((item, idx) => {
      return {
        imageSrc: fullUrls[idx],
        validatedSourceUrl: validatedSourceUrl,
        colorCodeParams: colorCodeParams(item)
      }
    })
    console.log(parsedParams)

    const thumbnails = parsedParams.map(this.createThumbnails);

    return <div className="thumbnailContainer">{thumbnails}</div>;
  }
}

export default Thumbnail;
