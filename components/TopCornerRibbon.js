export default function TopCornerRibbon() {
  return (
    <div className={"ribbon no-select"}>
      <span>{`Taux ${new Date().getFullYear()}`}</span>
    </div>
  );
}