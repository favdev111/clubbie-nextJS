import React, { useRef } from "react";
import Chip from "@sub/chip";
import Loader from "@sub/loader";
import styles from "./index.module.css";

function TagInput({
  placeholder,
  tags,
  onTagRemove,
  onInput,
  onInputSubmit,
  suggestions,
  showSuggestions,
  suggestionsLoading,
}) {
  // const _suggestions = [
  //   {
  //     text,
  //     image,
  //     type,
  //   },
  // ];
  const inputRef = useRef();
  return (
    <div className={styles.tagInput}>
      <div
        className={styles.tagBox}
        id="tagBox"
        onClick={(e) => {
          if (e.target.id === "tagBox") {
            inputRef?.current?.focus();
          }
        }}
      >
        {tags &&
          tags?.map((tag, index) => (
            <Chip
              text={tag?.text}
              image={tag?.image}
              onCloseClick={() => onTagRemove(index)}
              className={styles.chip}
              size="small"
            />
          ))}
        <input
          ref={inputRef}
          type="text"
          placeholder={tags && tags?.length > 0 ? null : placeholder}
          className={styles.input}
          onKeyDown={(e) => {
            if (onInputSubmit && e.key === "Enter") {
              e.preventDefault();
              if (e.target.value.trim() === 0) return;
              onInputSubmit(e.target.value);
              e.target.value = "";
            } else {
              onInput && onInput(e.target.value);
            }
          }}
        />
      </div>
      {suggestions && showSuggestions && (
        <div className={styles.tagSuggestions}>
          {suggestionsLoading && (
            <div className={styles.tagSuggestionsLoading}>
              <Loader />
            </div>
          )}
          {!suggestionsLoading &&
            suggestions?.map((suggestion) => (
              <div
                className={styles.tagSuggestedItem}
                onClick={() => onInputSubmit(suggestion?.text)}
              >
                <div>
                  {suggestion?.image && (
                    <img
                      className={styles.tagSuggestedItemImage}
                      src={suggestion?.image}
                    />
                  )}
                  <span className={styles.tagSuggestedItemName}>
                    {suggestion?.text}
                  </span>
                </div>
                <div className={styles.tagSuggestedItemResource}>
                  {suggestion?.type}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
