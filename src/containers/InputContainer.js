import React, { Component } from "react";

import ImageSource from "../components/ImageSource.js";
import ParamInput from "../components/ParamInput.js";
import QueuedParamList from "../components/QueuedParamList.js";
import Button from "../components/Button.js";
import ParamPicker from "../components/ParamPicker.js"
// import { calculateVariantCount, getAllVariations } from "./utils/helpers.js";



export default function InputContainer(props) {
  const {
    addParam,
    inputElement,
    handleInput,
    currentParam,
    params,
    deleteParam,
    editParam,
    hasValidatedSourceURL,
    csvEnteredParam
  } = props;

  console.log("all props");
  console.log(props);

  // hasChosenParamInputType

  //change LeftContainer to ImageSourceInput
  return (
  
      <div className="inputContainer">
        
         
  

   
          {hasValidatedSourceURL && (
            <>
              {csvEnteredParam ? (
                <>
             </>
              ) : (
                <>
                  <div className="label">New Param Input</div>
                  <ParamInput addParam={addParam} inputElement={inputElement} handleInput={handleInput} currentParam={currentParam} />
                </>
              )}
              <QueuedParamList params={params} deleteParam={deleteParam} editParam={editParam} />
            </>
          )}
       
      </div>
    
  );
}
