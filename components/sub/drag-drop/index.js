import React from "react";

function DragDrop({
  children,
  className,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop, // required
}) {
  const preventDefaults = (e) => e.preventDefault();

  return (
    <div
      className={className}
      onDragEnter={onDragEnter || preventDefaults}
      onDragOver={onDragOver || preventDefaults}
      handleDragLeave={onDragLeave || preventDefaults}
      onDrop={onDrop}
    >
      {children || <span>{"Drag & Drop item/s here"}</span>}
    </div>
  );
}

export default DragDrop;
