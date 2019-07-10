import React, { Component } from "react";
import Button from "../components/Button.js";

export default function OutputControl(props) {
  const { tooManyVariants, generatePDF, viewInBroswer, showUrls} = props;

  return (
    <div className="outputControl">
      <Button tooManyVariants={tooManyVariants} runApp={generatePDF} label="Generate PDF" method="generatePDF" />
      <Button tooManyVariants={tooManyVariants} runApp={viewInBroswer} label="View In Browser" method="viewInBrowser" />
      <Button tooManyVariants={tooManyVariants} runApp={showUrls} label="Show Urls" method="showUrls" />
    </div>
  );
}
