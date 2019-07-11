import React from "react";

export default function ImageSource({ validatedSourceUrl, onInputSourceChange }) {
  validatedSourceUrl = validatedSourceUrl || "http://www.movable-ink-7158.com/p/rp/e0663997758f6397.png";

  return (
    <div className="image-source-container">
      <div className="label">Image Source</div>
      <form>
        <input defaultValue={validatedSourceUrl} onBlur={onInputSourceChange} placeholder="Image Source Url" />
      </form>
    </div>
  );
}
