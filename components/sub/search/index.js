import React from "react";
import styles from "./index.module.css";
import Search from "@svg/search";

function CommonSearch({
  placeholder,
  value,
  onChange,
  onEnter,
  onSearchButtonClick,
}) {
  return (
    <div className={styles.commonSearch}>
      <span onClick={onSearchButtonClick}>
        <Search />
      </span>

      <input
        type="text"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => onEnter && e.key === "Enter" && onEnter()}
      />
    </div>
  );
}

export default CommonSearch;
