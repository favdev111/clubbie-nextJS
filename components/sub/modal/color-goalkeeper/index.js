import React from "react";
import Button from "@sub/button";
import styles from "./colorModalGk.module.css";

const ColorGoalKModal = ({
  state,
  closeGoalKModalHandler,
  colorSelectHandler,
  addColorGoalkeepHandler,
}) => {
  const colorMap = [
    {
      id: 1,
      value: "#fff",
    },
    {
      id: 2,
      value: "#000",
    },
    {
      id: 3,
      value: "#ff000b",
    },
    {
      id: 4,
      value: "#e78019",
    },
    {
      id: 5,
      value: "#e7ba19",
    },
    {
      id: 6,
      value: "#00a056",
    },
    {
      id: 7,
      value: "#5fc4ee",
    },
    {
      id: 8,
      value: "#5019e7",
    },
    {
      id: 9,
      value: "#8900ff",
    },
    {
      id: 10,
      value: "#e719c7",
    },
    {
      id: 11,
      value: "#19e729",
    },
    {
      id: 12,
      value: "#19e7e7",
    },
    {
      id: 13,
      value: "#1949e7",
    },
    {
      id: 14,
      value: "#a019e7",
    },
    {
      id: 15,
      value: "#e2bba1",
    },
    {
      id: 16,
      value: "#4363a5",
    },
    {
      id: 17,
      value: "#222835",
    },
    {
      id: 18,
      value: "#fce800",
    },
    {
      id: 19,
      value: "#19e7b0",
    },
    {
      id: 20,
      value: "#8019e7",
    },
    {
      id: 21,
      value: "#bfe719",
    },
  ];

  return (
    <div
      className={state ? `${styles.modal} ${styles.activeModal}` : styles.modal}
    >
      <div className={styles.modalContent}>
        <div
          onClick={closeGoalKModalHandler}
          className={styles.modalContentIconClose}
        >
          <img
            className={styles.modalContentIconCloseImg}
            src="/assets/icon_close.svg"
            alt="icon-close"
          />
        </div>
        <h1 className={styles.modalContentTitle}>Choose Color</h1>
        <div className={styles.modalContentColormap}>
          {colorMap.map((color, idx) => {
            return (
              <div
                key={idx}
                className={styles.modalContentColormapCol}
                style={{ background: `${color.value}` }}
                onClick={colorSelectHandler}
              />
            );
          })}
        </div>
        <div className={styles.modalContentBtn}>
          <Button clickHandler={addColorGoalkeepHandler}>Done</Button>
        </div>
      </div>
    </div>
  );
};
export default ColorGoalKModal;
