import React from "react";
import { CustomButton } from "@components/common/button";

//styles
import styles from "./CatCard.module.css";

export interface CatCardProps {
  handleButtonClick?: (id: string) => void;
  image: string;
  id: string;
}
export function CatCard({ image, id, handleButtonClick }: CatCardProps) {
  return (
    <div className={styles.cardWrapper}>
      <img alt="" src={image} />

      {handleButtonClick && (
        <CustomButton
          title="Remove From Favourites"
          handleButtonClick={() => handleButtonClick(id)}
        />
      )}
    </div>
  );
}
