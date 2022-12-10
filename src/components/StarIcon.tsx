import { FC } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import Styles from "./StarIcon.module.css";

interface StarIconProps {
  selected: boolean;
}

const StarIcon: FC<StarIconProps> = ({ selected }) => {
  return (
    <div className={Styles.starWrapper}>
      {selected ? (
        <StarRateIcon fontSize="large"></StarRateIcon>
      ) : (
        <StarBorderIcon fontSize="large"></StarBorderIcon>
      )}
    </div>
  );
};

export default StarIcon;
