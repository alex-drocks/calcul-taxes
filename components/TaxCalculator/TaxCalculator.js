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
    let sansTaxe, tps, tvq;
    if (taxeIn) {
      sansTaxe = isNaN(total) ? 0 : (total / (taux.tps + taux.tvq + 1));
      tps = sansTaxe * taux.tps;
      tvq = sansTaxe * taux.tvq;
      setTPS(tps);
      setTVQ(tvq);
      setMontant(round(total - (tps + tvq)));
    } else {
      sansTaxe = isNaN(montant) ? 0 : montant;
      tps = sansTaxe * taux.tps;
      tvq = sansTaxe * taux.tvq;
      setTPS(tps);
      setTVQ(tvq);
      setTotal(round(montant + tps + tvq));
    }
  }, [montant, total, province, taxeIn, taux])

  useEffect(function changeTaxeInMode() {
    //prevent NaN values from breaking the calculation
    setMontant(isNaN(total) ? 0 : total);
    setTotal(isNaN(montant) ? 0 : montant);

    //auto focus the only available input
    const input = document.getElementById(`${taxeIn ? "total" : "montant"}`);
    if (input) {
      input.focus();
      setTimeout(() => {
        selectAllText(input);
      }, 30)
    }
  }, [taxeIn])

  return (
    <div id="calculator-component-container" className={styles.calculator}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <input style={{display: "none"}} type="submit" value="Recalculer"/>

        <h1 className="no-select">Calcul de {province === "Québec" ? "TPS" : "TVH"} et TVQ</h1>

        {/*montant*/}
        <div className={`${styles.field} montant`}>
          <label htmlFor="montant"><h2>Montant sans taxes:</h2></label>
          <NumberFormat
            id="montant"
            autoComplete={"off"}
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            allowedDecimalSeparators={[",", ".", " "]}
            value={montant}
            onValueChange={(values) => {
              setMontant(Number(values.value)) //unformatted number
            }}
            readOnly={taxeIn}
            onFocus={e => selectAllText(e.target)}
          />
        </div>

        {/*tps*/}
        <div className={`${styles.field} tps`}>
          <label htmlFor="tps">
            <h2>{province === "Québec" ? "TPS" : "TVH"} ({(taux.tps * 100).toFixed(3)}%):</h2>
          </label>
          <NumberFormat
            id="tps"
            autoComplete={"off"}
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            allowedDecimalSeparators={[",", ".", " "]}
            value={TPS}
            onValueChange={(values) => {
              setTPS(Number(values.value)) //unformatted number
            }}
            readOnly
            onFocus={e => selectAllText(e.target)}
          />
        </div>

        {/*tvq*/}
        <div className={`${styles.field} tvq`}>
          <label htmlFor="tvq"><h2>TVQ ({(taux.tvq * 100).toFixed(3)}%):</h2></label>
          <NumberFormat
            id="tvq"
            autoComplete={"off"}
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            allowedDecimalSeparators={[",", ".", " "]}
            value={TVQ}
            onValueChange={(values) => {
              setTVQ(Number(values.value)) //unformatted number
            }}
            readOnly
            onFocus={e => selectAllText(e.target)}
          />
        </div>

        {/*total*/}
        <div className={`${styles.field} total`}>
          <label htmlFor="total"><h2>Total avec taxes:</h2></label>
          <NumberFormat
            id="total"
            autoComplete={"off"}
            defaultValue={0}
            thousandSeparator=" "
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale={true}
            allowLeadingZeros={false}
            allowedDecimalSeparators={[",", ".", " "]}
            value={total}
            onValueChange={(values) => {
              setTotal(Number(values.value)) //unformatted number
            }}
            readOnly={!taxeIn}
            onFocus={e => selectAllText(e.target)}
          />
        </div>

        {/*taxe incluses*/}
        <div className={`${styles.field} ${styles.taxeIn}`}>
          <label htmlFor="taxeIn"><h2>Calcul de taxes inversé:</h2></label>
          <input type="checkbox" value="taxeIn" id="taxeIn"
                 onChange={e => setTaxeIn(e.target.checked)}/>
        </div>

        {/*province*/}
        <div className={styles.field}>
          <label htmlFor="province"><h2>Province/territoire du Canada:</h2></label>
          <select name="province" id="province" defaultValue="Québec"
                  onChange={e => setProvince(e.target.value)}>
            <option value="Alberta">Alberta</option>
            <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
            <option value="Manitoba">Manitoba</option>
            <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
            <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Ontario">Ontario</option>
            <option value="Québec">Québec</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
            <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
            <option value="Yukon">Yukon</option>
          </select>
        </div>
      </form>

      {/*instructions*/}
      <div className={styles.instructions}>
        {
          taxeIn ? (
            <p>
              Puisque le mode de calcul inversé est actif,
              entrez le total incluant les taxes pour calculer les taxes incluses
              dans ce montant et pour obtenir le montant net avant taxes.
            </p>
          ) : (
            <p>
              Entrez le montant sans taxes pour obtenir le calcul des taxes selon le taux en vigueur
              et pour obtenir le total incluant les taxes.
            </p>
          )
        }
      </div>

      {/*footer*/}
      <div className={styles.footer}>
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
        <a href={"https://finance-d.com"} className={styles.brand}>
          <img className={styles.logo} src="/icons/icon-48x48.png" alt="Logo"/>
          <span className="no-wrap">Finance D</span>
        </a>
      </div>

    </div>
  )
}

function handleSubmit(e) {
  e.preventDefault();

  if (window && window.innerHeight < 600) {
    const focused = document.activeElement;
    focused && focused.blur();
  }

  window.scrollTo(0, 0);
}

function round(num, digits = 2) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(digits)
}

function selectAllText(input) {
  input && input.value && input.setSelectionRange(0, input.value.length)
}