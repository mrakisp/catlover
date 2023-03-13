import React from "react";

//styles
import styles from "./PageTitle.module.css";

interface PageTitleProps {
  title: string;
}
export function Title({ title }: PageTitleProps) {
  return <div className={styles.title}>{title}</div>;
}
