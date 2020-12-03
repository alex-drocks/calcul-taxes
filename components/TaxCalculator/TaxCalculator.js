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
  const [taux, setTaux] = useState({tps: 0, tvq: 0})

  const [taxeIn, setTaxeIn] = useState(false);

  useEffect(function setTauxDeTaxes() {
    if (province === "Québec") {
      setTaux({tps: 0.05, tvq: 0.09975})
    } else if (province === "Ontario") {
      setTaux({tps: 0.13, tvq: 0})
    } else if (province === "Alberta") {
      setTaux({tps: 0.05, tvq: 0})
    } else if (province === "Colombie-Britannique") {
      setTaux({tps: 0.12, tvq: 0})
    } else if (province === "Île-du-Prince-Édouard") {
      setTaux({tps: 0.15, tvq: 0})
    } else if (province === "Manitoba") {
      setTaux({tps: 0.13, tvq: 0})
    } else if (province === "Nouveau-Brunswick") {
      setTaux({tps: 0.15, tvq: 0})
    } else if (province === "Nouvelle-Écosse") {
      setTaux({tps: 0.15, tvq: 0})
    } else if (province === "Nunavut") {
      setTaux({tps: 0.05, tvq: 0})
    } else if (province === "Saskatchewan") {
      setTaux({tps: 0.11, tvq: 0})
    } else if (province === "Terre-Neuve-et-Labrador") {
      setTaux({tps: 0.15, tvq: 0})
    } else if (province === "Territoires du Nord-Ouest") {
      setTaux({tps: 0.05, tvq: 0})
    } else if (province === "Yukon") {
      setTaux({tps: 0.05, tvq: 0})
    }
  }, [province])

  useEffect(function calcul() {
    const tps = montant * taux.tps;
    const tvq = montant * taux.tvq;
    setTPS(tps);
    setTVQ(tvq);
    setTotal(round(montant + tps + tvq));
    console.log("calcul=", {montant, taxeIn, tps, tvq, total});
  }, [montant, province, taxeIn, taux.tps, taux.tvq])

  return (
    <div className={styles.calculator}>

      <div className={styles.card}>
        <h1>Calcul de {province === "Québec" ? "TPS" : "TVH"} et TVQ</h1>

        <div className={`${styles.field} montant`}>
          <label htmlFor="montant"><h2>{taxeIn ? "Total" : "Montant net"}:</h2></label>
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
          <label htmlFor="tps">
            <h2>{province === "Québec" ? "TPS" : "TVH"} ({(taux.tps * 100).toFixed(3)}%):</h2>
          </label>
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
          <label htmlFor="tvq"><h2>TVQ ({(taux.tvq * 100).toFixed(3)}%):</h2></label>
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
          <label htmlFor="total"><h2>{taxeIn ? "Montant net" : "Total"}:</h2></label>
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
            <option value="Alberta">Alberta</option>
            <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
            <option value="Manitoba">Manitoba</option>
            <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
            <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Ontario">Ontario</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
            <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
            <option value="Yukon">Yukon</option>
          </select>
        </div>

        <div className={`${styles.field} taxeIn`}>
          <label htmlFor="taxeIn"><h2>Taxes incluses:</h2></label>
          <input type="checkbox" value="taxeIn" id="taxeIn"
                 onChange={e => setTaxeIn(e.target.checked)}/>
        </div>
      </div>

      {
        taxeIn ? (
          <p> Entrez le total (incluant les taxes) afin d'obtenir les résultats du calcul des taxes ainsi que le montant
            net.</p>
        ) : (
          <p>Entrez le montant sans taxe afin d'obtenir les résultats du calcul des taxes ainsi que le total.</p>
        )
      }
      {province === "Québec" ?
        (
          <a className="text-link"
             href="https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/">
            Calcul des taxes selon Revenu Québec
          </a>)
        :
        (<a className="text-link"
            href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises/facturer-percevoir-quel-taux/calculatrice.html">
          Calcul des taxes selon Canada.ca
        </a>)
      }

    </div>
  )
}

function round(num, digits) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(digits || 2)
}