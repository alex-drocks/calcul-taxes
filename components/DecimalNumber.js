import NumberFormat from "react-number-format";

export default function Decimalnumber({
                                        id,
                                        label,
                                        readOnly,
                                        stateValue,
                                        onChangeHandler,
                                        onFocusHandler,
                                        focusedInstructions
                                      }) {

  return (
    <div className={`field ${id} ${id === "montant" ? "isActiveCalculationMode" : ""}`}>
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
      />
      {focusedInstructions && (
        <>
          <div className="calculator-instructions no-select">
            <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M4.021 10.688C5.229 10.86 6.531 12 7 12.469V1.955C7 .875 7.92 0 9 0s2 .875 2 1.955v6.058c0 .784.814.885.919.103.216-1.604 2.519-1.817 2.693.399.043.546.726.655.866.027.326-1.444 2.501-1.458 2.758.758.066.579.796.696.848.034.051-.67.281-.934.607-.934C20.789 8.4 22 10.419 22 12.81c0 4.295-3 4.306-3 11.19H9c-.332-3.942-3.462-7.431-6.271-10.241C2.241 13.271 2 12.707 2 12.195c0-.93.759-1.688 2.021-1.507z"/>
            </svg>
            <p>
              {focusedInstructions}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
