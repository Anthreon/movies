import { FC } from "react";
import Styles from "./ApiError.module.css";

const ApiError: FC = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.textWrapper}>
        <h1>Hopefully you can read this</h1>
        <h2>Something went terribly terribly wrong</h2>
        <h3>Brace yourself till we get error fixed.</h3>
        <h4>You may also refresh the page or try again later</h4>
      </div>
    </div>
  );
};
export default ApiError;
