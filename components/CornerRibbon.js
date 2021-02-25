import styles from "../styles/CornerRibbon.module.css";

export default function CornerRibbon() {
  return (
    <div className={`${styles.ribbon} no-select`}>
      <span>{`Taux ${new Date().getFullYear()}`}</span>
    </div>
  );
}