import NumberFormat from "react-number-format";

export default function Decimalnumber({id, label, readOnly, stateValue, onChangeHandler, onFocusHandler}) {
  return (
    <div className={`field ${id}`}>
      <label htmlFor={id}><h2>{label}</h2></label>
      <NumberFormat
        id={id}
        autoComplete={"off"}
        defaultValue={0}
        thousandSeparator=" "
        decimalSeparator="."
        decimalScale={2}
        fixedDecimalScale={true}
        allowLeadingZeros={false}
        allowedDecimalSeparators={[",", ".", " "]}
        value={stateValue}
        onValueChange={onChangeHandler}
        readOnly={readOnly}
        onFocus={onFocusHandler}
      />
    </div>
  );
}
