import React, { useRef, useState, useEffect } from "react";
import Chip from "@sub/chip";
import Loader from "@sub/loader";
import styles from "./index.module.css";

function useOutsideAlerter(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function TagInput({
  placeholder,
  tags,
  onTagRemove,
  onInput,
  onInputSubmit,
  onInputClear,
  suggestions,
  showSuggestions,
  suggestionsLoading,
}) {
  // TODO: hide input when blured
  // const _suggestions = [
  //   {
  //     text,
  //     image,
  //     type,
  //   },
  // ];
  const wrapperRef = useRef(null);
  const inputRef = useRef();

  const [_showSuggestions, setShowSuggestions] = useState(false);
  useOutsideAlerter(wrapperRef, setShowSuggestions);

  return (
    <div className={styles.tagInput} ref={wrapperRef}>
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
              roundedImage={true}
            />
          ))}
        <input
          ref={inputRef}
          type="text"
          placeholder={tags && tags?.length > 0 ? null : placeholder}
          className={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && e.target.value.trim().length === 0) {
              tags && onTagRemove(tags.length - 1); // remove last tag
            }
            if (onInputSubmit && e.key === "Enter") {
              e.preventDefault();
              if (e.target.value.trim() === 0) return;
              onInputSubmit(e.target.value);
              e.target.value = "";
            }
          }}
          onKeyUp={(e) => {
            if (e.key !== "Enter") {
              if (e.target.value.trim().length === 0) {
                onInputClear && onInputClear();
              } else {
                onInput && onInput(e.target.value);
              }
            }
          }}
          onFocus={() => {
            if (showSuggestions && !_showSuggestions) {
              setShowSuggestions(true);
            }
          }}
        />
      </div>
      {suggestions?.length > 0 &&
        _showSuggestions &&
        inputRef?.current?.value.trim().length > 0 && (
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
                  onClick={() => {
                    onInputSubmit(suggestion);
                    inputRef.current.value = "";
                  }}
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
