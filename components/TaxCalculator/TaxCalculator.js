import styles from "./TaxCalculator.module.css";
import {useState} from "react";

export default function TaxCalculator() {
  const [montant, setMontant] = useState(0);

  return (
    <div className={styles.calculator}>

      <div className={styles.card}>
        <h1>Calcul de TPS et TVQ</h1>

        <div className={`${styles.field} montant`}>
          <label htmlFor="montant"><h2>Montant:</h2></label>
          <input type="text" id="montant"/>
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