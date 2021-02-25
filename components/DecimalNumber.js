import NumberFormat from "react-number-format";
import {handleRowDeleteFromHotkey} from "./ResultsGrid";

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
        onDragStart={e => {
          // Prevent dragging the input text because it can be annoying
          e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }}
        onKeyDown={e => {
          if (e.code === "NumpadAdd") {
            // [ + ]
            e.preventDefault();
            document.getElementById("submit-handler-input").click();
          } else if ((e.shiftKey || e.ctrlKey) && (e.code === "Minus" || e.code === "NumpadSubtract")) {
            // [ Ctrl + Minus ], [ Shift + Minus ]
            e.preventDefault();
            handleRowDeleteFromHotkey();
          }
        }}
      />
    </div>
  );
}
