import {useEffect, useState} from "react";

import Decimalnumber from "./subComponents/DecimalNumber";
import TaxeInCheckbox from "./subComponents/TaxeInCheckbox";
import SelectProvince from "./subComponents/SelectProvince";
import Instructions from "./subComponents/Instructions";
import Footer from "./subComponents/Footer";

export default function TaxCalculator() {
  const [title, setTitle] = useState("");
  const [federalTaxName, setFederalTaxName] = useState("TPS");

  const [montant, setMontant] = useState(0);
  const [TPS, setTPS] = useState(0);
  const [TVQ, setTVQ] = useState(0);
  const [total, setTotal] = useState(0);

  const [province, setProvince] = useState("Québec");
  const [taux, setTaux] = useState({tps: 0, tvq: 0});

  const [taxeIn, setTaxeIn] = useState(false);

  useEffect(function setTauxDeTaxes() {
    if (province === "Québec") {
      setTaux({tps: 0.05, tvq: 0.09975});
    } else if (province === "Ontario") {
      setTaux({tps: 0.13, tvq: 0});
    } else if (province === "Alberta") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Colombie-Britannique") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Île-du-Prince-Édouard") {
      setTaux({tps: 0.15, tvq: 0});
    } else if (province === "Manitoba") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Nouveau-Brunswick") {
      setTaux({tps: 0.15, tvq: 0});
    } else if (province === "Nouvelle-Écosse") {
      setTaux({tps: 0.15, tvq: 0});
    } else if (province === "Nunavut") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Saskatchewan") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Terre-Neuve-et-Labrador") {
      setTaux({tps: 0.15, tvq: 0});
    } else if (province === "Territoires du Nord-Ouest") {
      setTaux({tps: 0.05, tvq: 0});
    } else if (province === "Yukon") {
      setTaux({tps: 0.05, tvq: 0});
    }
  }, [province]);

  useEffect(function changeTaxeInMode() {
    //prevent NaN values from breaking the calculation
    setMontant(isNaN(total) ? 0 : total);
    setTotal(isNaN(montant) ? 0 : montant);

    //auto focus the only editable input
    const input = document.getElementById(`${taxeIn ? "total" : "montant"}`);
    if (input) {
      input.focus();
      setTimeout(() => {
        selectAllText(input);
      }, 30);
    }
  }, [taxeIn]);

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
  }, [montant, total, province, taxeIn, taux]);

  useEffect(function setDynamicNames() {
    const mode = taxeIn ? " inversé" : "";
    const isTVH = [
      "Île-du-Prince-Édouard",
      "Nouveau-Brunswick",
      "Nouvelle-Écosse",
      "Ontario",
      "Terre-Neuve-et-Labrador"
    ].includes(province);
    setFederalTaxName(isTVH ? "TVH" : "TPS");
    setTitle(`Calcul de taxes ${mode} pour la ${isTVH ? "TVH" : "TPS"}${province === "Québec" ? " et la TVQ" : ""}`);
  }, [taxeIn, province]);

  return (
    <div id="calculator-component-container" className="calculator">
      <form className="card" onSubmit={handleSubmit}>
        <h1 className="no-select">{title}</h1>

        <Decimalnumber
          id="montant"
          label="Montant sans taxes:"
          readOnly={taxeIn}
          stateValue={montant}
          onChangeHandler={values => setMontant(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        <Decimalnumber
          id="tps"
          label={`${federalTaxName} (${(taux.tps * 100).toFixed(3)}%):`}
          readOnly={true}
          stateValue={TPS}
          onChangeHandler={values => setTPS(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        <Decimalnumber
          id="tvq"
          label={`TVQ (${(taux.tvq * 100).toFixed(3)}%):`}
          readOnly={true}
          stateValue={TVQ}
          onChangeHandler={values => setTVQ(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        <Decimalnumber
          id="total"
          label="Total avec taxes:"
          readOnly={!taxeIn}
          stateValue={total}
          onChangeHandler={values => setTotal(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        <TaxeInCheckbox onChangeHandler={e => setTaxeIn(e.target.checked)}/>

        <SelectProvince onChangeHandler={e => setProvince(e.target.value)}/>

        <input style={{display: "none"}} type="submit" value="Recalculer"/>
      </form>

      <Instructions taxeIn={taxeIn}/>
      <Footer province={province}/>
    </div>
  );
}

function handleSubmit(e) {
  e.preventDefault();

  const focused = document.activeElement;
  if (window && window.innerHeight < 600) {
    //Small screen: closes keyboard
    focused && focused.blur();
  } else {
    //Large screen: select input value on form submit
    focused && selectAllText(focused);
  }

  window.scrollTo(0, 0);
}

function round(num, digits = 2) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(digits);
}

function selectAllText(input) {
  input && input.value && input.setSelectionRange(0, input.value.length);
}
