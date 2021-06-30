import React, { useState } from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import styles from "./commentInput.module.css";

function CommentInput({ placeholder, buttonText, onSubmit, loading }) {
  const [comment, setComment] = useState("");
  const handleOnClick = async () => {
    await onSubmit(comment);
    setComment("");
  };

  return (
    <div className={styles.commentInput}>
      <TemplateInput
        placeholder={placeholder}
        name="commentInput"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></TemplateInput>
      <span className={styles.spacing}></span>
      <Button loading={loading} onClick={handleOnClick}>
        {buttonText}
      </Button>
    </div>
  );
}

export default CommentInput;
