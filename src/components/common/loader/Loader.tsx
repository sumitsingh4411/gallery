import React from "react";
import styles from "./Loader.module.scss";

function Loader({ loaderRef }: { loaderRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={loaderRef} className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Loader;
