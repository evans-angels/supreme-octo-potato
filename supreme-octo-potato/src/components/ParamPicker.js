import React, { Component } from "react";
import CSVReader from "react-csv-reader";

export default function ParamPicker({ csvUploadedOrSkipped, skipCsvUpload, addParam, inputElement, handleInput, currentParam, handleCSVUpload, handleInputType }) {
  console.log("csv " + csvUploadedOrSkipped);
  return (
    <div className="input-type-container">
      <div className="label">Select Param Input Type</div>
      <div className="input-type-button-container">
        <button className="button" value="csv-input">
          Upload CSV   <CSVReader cssClass="react-csv-input" onFileLoaded={handleCSVUpload} />
        </button>
        <div style={{'lineHeight': '50px'}}>OR</div>
        <button className="button" value="manual-input" onClick={skipCsvUpload}>
          Skip CSV Upload
        </button>
      </div>
    </div>
  );
}