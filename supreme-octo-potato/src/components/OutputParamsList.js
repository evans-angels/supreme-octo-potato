import React from "react";
import { colorCodeParams } from "../utils/helpers";

const createLists = (item, idx) => {
  const paramLength = item.colorCodeParams.length;

  return (
    <li key={"variation" + idx}>
      {item.validatedSourceUrl}
      {"?"}
      {item.colorCodeParams.map((param, idx) => {
        return (
          <div key={"variation-child" + idx}>
            <span className="urlParamName">{param[0].trim()}</span>
            <span>{"="}</span>
            <span className="urlParamValue">{param[1].trim()}</span>
            {paramLength - 2 >= idx ? "&" : ""}
          </div>
        );
      })}
    </li>
  );
};

export default function OutputParamsList({ variations, validatedSourceUrl }) {
  const parsedParams = variations.map(item => {
    return { colorCodeParams: colorCodeParams(item), validatedSourceUrl: validatedSourceUrl };
  });
  const listItems = parsedParams.map(createLists);
  return <ul className="theList">{listItems}</ul>;
}
