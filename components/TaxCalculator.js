import {useEffect, useState} from "react";

import TopCornerRibbon from "./TopCornerRibbon";
import Decimalnumber from "./DecimalNumber";
import TaxeInCheckbox from "./TaxeInCheckbox";
import ProvinceSelect from "./ProvinceSelect";

import {addNewResultRowToTable} from "./ResultsTable";

export default function TaxCalculator() {
  const [calculatorMainTitle, setCalculatorMainTitle] = useState("Calcul de taxes  pour la TPS et la TVQ");
  const [federalTaxName, setFederalTaxName] = useState("TPS");
  const [provincialTaxName, setProvincialTaxName] = useState("TVQ");

  const [montant, setMontant] = useState(0);
  const [TPS, setTPS] = useState(0);
  const [TVP, setTVP] = useState(0);
  const [total, setTotal] = useState(0);

  const [province, setProvince] = useState("Québec (TPS 5% + TVQ 9.975%)");
  const [taux, setTaux] = useState({tps: 0.05, tvp: 0.0975});

  const [taxeIn, setTaxeIn] = useState(false);

  //use effets are called in this exact order by React
  useEffect(function calculate() {
    let sansTaxe, tps, tvp;
    if (taxeIn) {
      sansTaxe = isNaN(total) ? 0 : (total / (taux.tps + taux.tvp + 1));
      tps = sansTaxe * taux.tps;
      tvp = sansTaxe * taux.tvp;
      setTPS(tps);
      setTVP(tvp);
      setMontant(roundNumber(total - (tps + tvp)));
    } else {
      sansTaxe = isNaN(montant) ? 0 : montant;
      tps = sansTaxe * taux.tps;
      tvp = sansTaxe * taux.tvp;
      setTPS(tps);
      setTVP(tvp);
      setTotal(roundNumber(montant + tps + tvp));
    }
  }, [montant, total, taux, taxeIn]);

  //React will then render the component:
  return (
    <div id="calculator-component-container" className="calculator">
      {/*Absolute Positionned Top Right Corner Ribbon*/}
      <TopCornerRibbon/>

      {/*User inputs are in a form to use the default Submit feature*/}
      <form className="card" onSubmit={e => handleFormSubmit(e,
        montant,
        TPS,
        TVP,
        total,
        province,
        taux.tps,
        taux.tvp,
      )
      }>

        {/*The Blue Title Heading*/}
        <h1 className="no-select">{calculatorMainTitle}</h1>

        {/*Amount before taxes*/}
        <Decimalnumber
          id="montant"
          label="Montant sans taxes:"
          readOnly={taxeIn}
          stateValue={montant}
          onChangeHandler={values => setMontant(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
          focusedInstructions="Entrez le MONTANT (avant taxes)."
        />

        {/*Federal Tax*/}
        <Decimalnumber
          id="tps"
          label={`${federalTaxName} (${(taux.tps * 100).toFixed(3)}%):`}
          readOnly={true}
          stateValue={TPS}
          onChangeHandler={values => setTPS(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        {/*Provincial Tax*/}
        <Decimalnumber
          id="tvp"
          label={`${provincialTaxName} (${(taux.tvp * 100).toFixed(3)}%):`}
          readOnly={true}
          stateValue={TVP}
          onChangeHandler={values => setTVP(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
        />

        {/*Total including taxes*/}
        <Decimalnumber
          id="total"
          label="Total avec taxes:"
          readOnly={!taxeIn}
          stateValue={total}
          onChangeHandler={values => setTotal(Number(values.value))}
          onFocusHandler={e => selectAllText(e.target)}
          focusedInstructions="Entrez le TOTAL (taxes incluses)."
        />

        {/*Taxe Mode*/}
        <TaxeInCheckbox onChangeHandler={e => {
          const isTaxeIn = e.target.checked;
          setTaxeIn(isTaxeIn);

          //prevent NaN values from breaking the calculation
          setMontant(isNaN(total) ? 0 : total);
          setTotal(isNaN(montant) ? 0 : montant);

          //auto focus the only editable input
          const editableUserInput = document.getElementById(`${isTaxeIn ? "total" : "montant"}`);
          if (editableUserInput) {
            editableUserInput.focus();
            setTimeout(() => {
              selectAllText(editableUserInput);
            }, 30);
          }

          //Show the hand icon with the instruction text under the editable user input
          const montantInstructionEl = document.querySelector(".field.montant");
          const totalInstructionEl = document.querySelector(".field.total");
          if (isTaxeIn) {
            montantInstructionEl.classList.remove("isActiveCalculationMode");
            totalInstructionEl.classList.add("isActiveCalculationMode");
          } else {
            montantInstructionEl.classList.add("isActiveCalculationMode");
            totalInstructionEl.classList.remove("isActiveCalculationMode");
          }

          setDynamicNames(isTaxeIn, taux, province, setCalculatorMainTitle, setFederalTaxName, setProvincialTaxName);
        }}/>

        {/*Province Selector*/}
        <ProvinceSelect
          defaultValue={province}
          onChangeHandler={e => {
            const selectElm = e.target;
            const selectedProvince = selectElm.value;
            setProvince(selectedProvince);

            const selectedElmDataset = selectElm.querySelector(`option[value="${selectedProvince}"]`).dataset;
            const tps = selectedElmDataset.tps;
            const tvp = selectedElmDataset.tvp;
            const nouveauTaux = {tps, tvp};
            setTaux(nouveauTaux);

            setDynamicNames(taxeIn, nouveauTaux, selectedProvince, setCalculatorMainTitle, setFederalTaxName, setProvincialTaxName);

            setGovernmentLink(selectedProvince);
          }}/>

        {/*Invisible Submit Button to handle Enter keys and mobile phone confirm signal*/}
        <input id="submit-handler-input" style={{display: "none"}} type="submit" value="Recalculer"/>

      </form>

    </div>
  );
}


function handleFormSubmit(e, montant, tps, tvp, total, province, tauxFed, tauxQc) {
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

  //Populate results table row
  addNewResultRowToTable(montant, tps, tvp, total, province, tauxFed, tauxQc);
}


function setDynamicNames(isTaxeIn, tauxTaxes, provinceValue, setCalculatorMainTitle, setFederalTaxName, setProvincialTaxName) {

  const mode = isTaxeIn ? " inversé" : "";
  const isTVH = tauxTaxes.tps >= 0.13;
  const isQuebec = provinceValue === "Québec (TPS 5% + TVQ 9.975%)";

  //Update the Calculator main Heading Title and the Tax Names
  setCalculatorMainTitle(`Calcul de taxes ${mode} pour la ${isTVH ? "TVH" : "TPS"}${isQuebec ? " et la TVQ" : tauxTaxes.tvp > 0 ? " et la TVP" : ""}`);
  setFederalTaxName(isTVH ? "TVH" : "TPS");
  setProvincialTaxName(isQuebec ? "TVQ" : "TVP");
}


function setGovernmentLink(province) {
  const govLink = document.getElementById("gouvernment-link");
  const govNameElm = govLink.querySelector("span");
  if (province === "Québec") {
    govLink.href = "https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/";
    govNameElm.textContent = "Revenu Québec";
  } else {
    govLink.href = "https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises/facturer-percevoir-quel-taux/calculatrice.html";
    govNameElm.textContent = "Canada.ca";
  }
}


function selectAllText(input) {
  try {
    input && input.value && input.setSelectionRange(0, input.value.length);
  } catch (e) {

  }
}


function roundNumber(num, digits = 2) {
  return (Math.round((Number(num) + Number.EPSILON) * 100) / 100).toFixed(digits);
}

export {roundNumber};
