import React from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import styles from "./commentInput.module.css";

function CommentInput({ placeholder, buttonText }) {
  return (
    <div className={styles.commentInput}>
      <TemplateInput placeholder={placeholder}></TemplateInput>
      <span className={styles.spacing}></span>
      <Button>{buttonText}</Button>
    </div>
  );
}

export default CommentInput;
