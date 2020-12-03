import styles from "./TaxCalculator.module.css";
import NumberFormat from 'react-number-format';
import DecimalInput from "../DecimalInput/DecimalInput";

export default function TaxCalculator() {
  let caretPos = 0;

  function calcul(e) {
    caretPos = e.target.selectionStart;
    const rawInput = e.target.value;
    let val = rawInput;
    val = val.replace(/([^0-9.]+)/, "");
    val = val.replace(/^(0|\.)/, "");
    const match = /(\d{0,11})[^.]*((?:\.\d{0,2})?)/g.exec(val);
    const value = match[1] + match[2];
    e.target.value = value;
    console.log(rawInput)

    if (val.length > 0) {
      const rounded = Number(value).toFixed(2);
      e.target.value = rounded
      if (val === "00") {
        // console.log(val)
        e.target.setSelectionRange(0, value.length);
      } else {
        e.target.setSelectionRange(caretPos, caretPos);
      }
    }
  }

  return (
    <div className={styles.calculator}>

      <div className={styles.card}>
        <h1>Calcul de TPS et TVQ</h1>

        <div className={`${styles.field} montant`}>
          <label htmlFor="montant"><h2>Montant:</h2></label>
          <DecimalInput id="montant" />
        </div>

        <div className={`${styles.field} tps`}>
          <label htmlFor="tps"><h2>TPS (5%):</h2></label>
          <input type="text" id="tps" disabled/>
        </div>
        <div className={`${styles.field} tvq`}>
          <label htmlFor="tvq"><h2>TVQ (9.975%):</h2></label>
          <input type="text" id="tvq" disabled/>
        </div>
        <div className={`${styles.field} total`}>
          <label htmlFor="total"><h2>Total:</h2></label>
          <input type="text" id="total" disabled/>
        </div>

        <div className={styles.spacer}/>

        <div className={`${styles.field} province`}>
          <label htmlFor="province"><h2>Province:</h2></label>
          <select name="province" id="province" defaultValue="Québec">
            <option value="Québec">Québec</option>
            <option value="Ontario">Ontario</option>
          </select>
        </div>

        <div className={`${styles.field} taxeIn`}>
          <label htmlFor="taxeIn"><h2>Taxes incluses:</h2></label>
          <input type="checkbox" value="taxeIn" id="taxeIn"/>
        </div>
      </div>

      <p>
        Entrez le montant à calculer pour obtenir la valeur des taxes.
      </p>
    </div>
  )
}