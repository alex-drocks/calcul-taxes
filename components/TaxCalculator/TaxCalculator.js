import styles from "./TaxCalculator.module.css";
import NumberFormat from "react-number-format";
import {useEffect, useState} from "react";
//https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/

export default function TaxCalculator() {
  const [montant, setMontant] = useState(0);
  const [TPS, setTPS] = useState(0);
  const [TVQ, setTVQ] = useState(0);
  const [total, setTotal] = useState(0);

  const [province, setProvince] = useState("Québec");
  useEffect(function setTauxDeTaxes() {
    console.log({province})

    if (province === "Québec") {
      setTauxTPS(0.05)
      setTauxTVQ(0.09975)
    } else if (province === "Ontario") {
      setTauxTPS(0.13)
      setTauxTVQ(0)
    } else if (province === "Alberta") {
      setTauxTPS(0.05)
      setTauxTVQ(0)
    } else if (province === "Colombie-Britannique") {
      setTauxTPS(0.12)
      setTauxTVQ(0)
    } else if (province === "Île-du-Prince-Édouard") {
      setTauxTPS(0.15)
      setTauxTVQ(0)
    } else if (province === "Manitoba") {
      setTauxTPS(0.13)
      setTauxTVQ(0)
    } else if (province === "Nouveau-Brunswick") {
      setTauxTPS(0.15)
      setTauxTVQ(0)
    }
  }, [province])
  const [tauxTPS, setTauxTPS] = useState(0.05);
  const [tauxTVQ, setTauxTVQ] = useState(0.09975);

  const [taxeIn, setTaxeIn] = useState(false);

  useEffect(() => {
    const tps = montant * tauxTPS;
    const tvq = montant * tauxTVQ;
    setTPS(tps);
    setTVQ(tvq);
    setTotal(round(montant + tps + tvq));
    console.log({montant, taxeIn, tps, tvq});
  }, [montant])

  return (
    <div className={styles.calculator}>

      <div className={styles.card}>
        <h1>Calcul de TPS et TVQ</h1>

        <div className={`${styles.field} montant`}>
          <label htmlFor="montant"><h2>Montant:</h2></label>
          <NumberFormat
            id="montant"
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            suffix=" $"
            allowedDecimalSeparators={[",", ".", " "]}
            value={montant}
            onValueChange={(values) => {
              setMontant(Number(values.value)) //unformatted number
            }}
          />
        </div>

        <div className={`${styles.field} tps`}>
          <label htmlFor="tps"><h2>TPS (5%):</h2></label>
          <NumberFormat
            disabled
            id="tps"
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            suffix=" $"
            allowedDecimalSeparators={[",", ".", " "]}
            value={TPS}
            onValueChange={(values) => {
              setTPS(Number(values.value)) //unformatted number
            }}
          />
        </div>
        <div className={`${styles.field} tvq`}>
          <label htmlFor="tvq"><h2>TVQ (9.975%):</h2></label>
          <NumberFormat
            disabled
            id="tvq"
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            suffix=" $"
            allowedDecimalSeparators={[",", ".", " "]}
            value={TVQ}
            onValueChange={(values) => {
              setTVQ(Number(values.value)) //unformatted number
            }}
          />
        </div>
        <div className={`${styles.field} total`}>
          <label htmlFor="total"><h2>Total:</h2></label>
          <NumberFormat
            disabled
            id="total"
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            suffix=" $"
            allowedDecimalSeparators={[",", ".", " "]}
            value={total}
            onValueChange={(values) => {
              setTotal(Number(values.value)) //unformatted number
            }}
          />
        </div>

        <div className={styles.spacer}/>

        <div className={`${styles.field} province`}>
          <label htmlFor="province"><h2>Province:</h2></label>
          <select name="province" id="province" defaultValue="Québec"
                  onChange={e => setProvince(e.target.value)}>
            <option value="Québec">Québec</option>
            <option value="Ontario">Ontario</option>
            <option value="Alberta">Alberta</option>
            <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
          </select>
        </div>

        <div className={`${styles.field} taxeIn`}>
          <label htmlFor="taxeIn"><h2>Taxes incluses:</h2></label>
          <input type="checkbox" value="taxeIn" id="taxeIn"
                 onChange={e => setTaxeIn(e.target.checked)}/>
        </div>
      </div>

      <p>
        Entrez le montant à calculer pour obtenir la valeur des taxes.
      </p>
      <a className="text-link"
         href="https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/">
        Calcul des taxes selon Revenu Québec
      </a>
    </div>
  )
}

function round(num) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2)
}