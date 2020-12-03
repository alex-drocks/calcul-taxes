import NumberFormat from "react-number-format";

export default function DecimalInput({id}) {
  return (
    <NumberFormat
      id={id}
      defaultValue={0}
      thousandSeparator=" "
      decimalSeparator="."
      decimalScale={2}
      fixedDecimalScale={true}
      allowLeadingZeros={false}
      suffix=" $"
      allowedDecimalSeparators={[",", ".", " "]}
    />
  )
}
