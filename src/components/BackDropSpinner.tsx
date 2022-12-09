import { CircularProgress } from "@mui/material";
import { FC } from "react";
import Styles from "./BackDropSpinner.module.css";

type BackdropProps = {
  children: React.ReactNode;
};

const BackDropSpinner: FC = () => {
  return (
    <div className={Styles.backdrop}>
      <div className={Styles.progressSpinnerContainer}>
        <CircularProgress className={Styles.progressSpinner} color="primary" />
      </div>
      <div className={Styles.textContainer}>
        <h1>Your Results are being fetched...</h1>
      </div>
    </div>
  );
};

export default BackDropSpinner;
