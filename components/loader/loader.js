//styles
import styles from "./loader.module.scss";

//react
import React, { useState, useEffect } from "react";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <img src="/spinner.svg"></img>
        <h2>Cooking the model...</h2>
      </div>
    </div>
  );
}
