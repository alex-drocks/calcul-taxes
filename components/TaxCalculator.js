import {useEffect, useState} from "react";

import Decimalnumber from "./subComponents/DecimalNumber";
import TaxeInCheckbox from "./subComponents/TaxeInCheckbox";
import SelectProvince from "./subComponents/SelectProvince";
import ResultsGrid from "./ResultsGrid";
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
      <form className="card" onSubmit={e => handleFormSubmit(e,
        montant,
        TPS,
        TVQ,
        total,
        province,
        taux.tps,
        taux.tvq,
      )
      }>
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

      <ResultsGrid/>

      <Footer province={province}/>
    </div>
  );
}

function handleFormSubmit(e, montant, tps, tvq, total, province, tauxFed, tauxQc) {
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

  //Populate results grid row
  addNewResultRowToGrid(montant, tps, tvq, total, province, tauxFed, tauxQc);
}

function addNewResultRowToGrid(montant, tps, tvq, total, province, tauxFed, tauxQc) {
  //The Excel-like grid at the bottom of page
  const gridRows = document.querySelector(".results-grid--rows");

  const newRowElm = document.createElement("div");
  newRowElm.className = "results-grid--row";
  newRowElm.id = gridRows.childElementCount.toString();
  newRowElm.innerHTML = `
    <span class="montant">${round(Number(montant))}</span>
    <span class="tps">${round(Number(tps))}</span>
    <span class="tvq">${round(Number(tvq))}</span>
    <span class="total">${round(Number(total))}</span>
    <span class="province">${province}</span>
    <span class="tauxFed">${formatAsPercentage(tauxFed)}</span>
    <span class="tauxQc">${formatAsPercentage(tauxQc)}</span>
    <span class="deleteBtn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6v18h18V6H3zm5 14c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1V10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2H2V2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2H22z"/></svg>
    </span>
  `;

  //place it at the top
  gridRows.prepend(newRowElm);
}

function formatAsPercentage(decimal) {
  return (decimal * 100)
    .toFixed(3)
    .replace(/(\.0+|0\.)$/, '');
}

function round(num, digits = 2) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(digits);
}

function selectAllText(input) {
  try {
    input && input.value && input.setSelectionRange(0, input.value.length);
  } catch (e) {

  }
}
