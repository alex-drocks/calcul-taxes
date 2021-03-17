export default function TopCornerRibbon() {
  return (
    <div className={"ribbon no-select"}>
      <span>{`TAUX ${new Date().getFullYear()}`}</span>
    </div>
  );
}