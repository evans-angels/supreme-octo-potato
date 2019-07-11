import React, { Component } from "react";

import Thumbnail from "../components/Thumbnail.js";
import MyDocument from "../components/MyDocument.js";
import OutputParamsList from "../components/OutputParamsList.js";
import { PDFViewer } from "@react-pdf/renderer"; //PDFDownloadLink

const PDFViewerStyle = {
  width: "800px",
  height: "800px"
};

class OutputContainer extends Component {
  render() {
    const { showPDF, showInBrowser, proxyUrls, fullQueryStrings, fullUrls, showUrls, validatedSourceUrl } = this.props;

    return (
      <div className="outputContainer">
        {showPDF && showInBrowser && (
          <div className="innerContainer">
            <div className="left" style={{ float: "left", width: "50%" }}>
              <PDFViewer style={PDFViewerStyle}>
                <MyDocument proxyUrls={proxyUrls} fullQueryStrings={fullQueryStrings} />
              </PDFViewer>
            </div>
            <div className="right" style={{ float: "right", width: "50%" }}>
              <Thumbnail fullUrls={fullUrls} fullQueryStrings={fullQueryStrings} />
            </div>
          </div>
        )}
        {showPDF && !showInBrowser && (
          <PDFViewer style={PDFViewerStyle}>
            <MyDocument proxyUrls={proxyUrls} fullQueryStrings={fullQueryStrings} />
          </PDFViewer>
        )}

        {!showPDF && showInBrowser && <Thumbnail fullUrls={fullUrls} fullQueryStrings={fullQueryStrings} validatedSourceUrl={validatedSourceUrl}/>}

        {showUrls && fullQueryStrings.length > 0 && <OutputParamsList variations={fullQueryStrings} validatedSourceUrl={validatedSourceUrl} />}
      </div>
    );
  }
}

export default OutputContainer;
