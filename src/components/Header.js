import React, { Component } from "react";

export default function Header({ tooManyVariants, count }) {
  const showTotals = count > 0;
  return (
    <div className="page_title">
      <div className="the_logo" style={{'float': 'left'}}></div>

      {showTotals && 
        <div className="totalContentCount" style={{'float': 'right'}}>{ count }</div>
      }
    </div>
  )
}
