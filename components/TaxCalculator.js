import {useEffect, useState} from "react";

import TopCornerRibbon from "./TopCornerRibbon";
import Decimalnumber from "./DecimalNumber";
import TaxeInCheckbox from "./TaxeInCheckbox";
import ProvinceSelect from "./ProvinceSelect";

import {addNewResultRowToTable} from "./ResultsTable";

export default function TaxCalculator({
  defaultMainTitle = "Calcul de taxes pour la TPS et la TVQ",
  defaultFederalTaxName = "TPS",
  defaultProvincialTaxName = "TVQ",
  defaultProvince = "Québec (TPS 5% + TVQ 9.975%)",
  defaultTaxeIn = false,
  defaultTaux = {tps: Number(0.05), tvp: Number(0.09975)}
}) {
  const [calculatorMainTitle, setCalculatorMainTitle] = useState(defaultMainTitle);
  const [federalTaxName, setFederalTaxName] = useState(defaultFederalTaxName);
  const [provincialTaxName, setProvincialTaxName] = useState(defaultProvincialTaxName);

  const [montant, setMontant] = useState(0);
  const [TPS, setTPS] = useState(0);
  const [TVP, setTVP] = useState(0);
  const [total, setTotal] = useState(0);

  const [province, setProvince] = useState(defaultProvince);
  const [taux, setTaux] = useState(defaultTaux);

  const [taxeIn, setTaxeIn] = useState(defaultTaxeIn);

  // Called only one time.
  useEffect(function init() {
    autoFocusOnlyEditableInput(defaultTaxeIn);
    setFooterGovernmentLink(defaultProvince);
  }, [defaultTaxeIn, defaultProvince]);

  // Called each time any of [montant, total, taux, taxeIn] is changed
  useEffect(
    function calculate() {
      let sansTaxe, tpsValue, tvpValue, totalAvecTaxes;
      if (taxeIn) {
        // Calcul taxes incluses dans le TOTAL
        totalAvecTaxes = isNaN(total) ? 0 : total;
        sansTaxe = totalAvecTaxes / (taux.tps + taux.tvp + 1);
        tpsValue = roundNumber(sansTaxe * taux.tps);
        tvpValue = roundNumber(sansTaxe * taux.tvp);
        // Update displayed values
        setMontant(sansTaxe);
        setTPS(tpsValue);
        setTVP(tvpValue);
      } else {
        // Calcul régulier MONTANT + taxes
        sansTaxe = isNaN(montant) ? 0 : montant;
        tpsValue = roundNumber(sansTaxe * taux.tps);
        tvpValue = roundNumber(sansTaxe * taux.tvp);
        totalAvecTaxes = sansTaxe + tpsValue + tvpValue;
        // Update displayed values
        setTPS(tpsValue);
        setTVP(tvpValue);
        setTotal(totalAvecTaxes);
      }
    },
    [montant, total, taux, taxeIn]
  );

  //React will then render the component:
  return (
    <div id="calculator-component-container" className="calculator">
      {/*Absolute Positionned Top Right Corner Ribbon*/}
      <TopCornerRibbon />

      {/*User inputs are in a form to use the default Submit feature*/}
      <form
        className="card"
        onSubmit={e => handleFormSubmit(e, montant, TPS, TVP, total, province, taux.tps, taux.tvp)}
      >
        {/*The Blue Title Heading*/}
        <h1 className="no-select">{calculatorMainTitle}</h1>

        {/*Amount before taxes*/}
        <Decimalnumber
          id="montant"
          label="Montant sans taxes:"
          readOnly={taxeIn}
          placeholder="Montant $"
          stateValue={montant}
          onChangeHandler={values => setMontant(Number(values.value))}
          onFocusHandler={e => e.target.select()}
          focusedInstructions="Entrez le montant avant taxes."
        />

        {/*Federal Tax*/}
        <Decimalnumber
          id="tps"
          label={`${federalTaxName} (${(taux.tps * 100).toFixed(3)}%):`}
          readOnly={true}
          placeholder="Taxe Fédérale $"
          stateValue={TPS}
          onChangeHandler={values => setTPS(Number(values.value))}
          onFocusHandler={e => e.target.select()}
        />

        {/*Provincial Tax*/}
        <Decimalnumber
          id="tvp"
          label={`${provincialTaxName} (${(taux.tvp * 100).toFixed(3)}%):`}
          readOnly={true}
          placeholder="Taxe Provinciale $"
          stateValue={TVP}
          onChangeHandler={values => setTVP(Number(values.value))}
          onFocusHandler={e => e.target.select()}
        />

        {/*Total including taxes*/}
        <Decimalnumber
          id="total"
          label="Total avec taxes:"
          readOnly={!taxeIn}
          placeholder="Total $"
          stateValue={total}
          onChangeHandler={values => setTotal(Number(values.value))}
          onFocusHandler={e => e.target.select()}
          focusedInstructions="Entrez le total taxes incluses."
        />

        {/*Taxe Mode*/}
        <TaxeInCheckbox
          defaultChecked={defaultTaxeIn}
          onChangeHandler={e => {
            const isTaxeIn = e.target.checked;
            setTaxeIn(isTaxeIn);

            //prevent NaN values from breaking the calculation
            setMontant(isNaN(total) ? 0 : total);
            setTotal(isNaN(montant) ? 0 : montant);

            autoFocusOnlyEditableInput(isTaxeIn);

            setDynamicNames(
              isTaxeIn,
              taux,
              province,
              setCalculatorMainTitle,
              setFederalTaxName,
              setProvincialTaxName
            );
          }}
        />

        {/*Province Selector*/}
        <ProvinceSelect
          defaultValue={province}
          onChangeHandler={e => {
            const selectElm = e.target;
            const selectedProvince = selectElm.value;
            setProvince(selectedProvince);

            const selectedElmDataset = selectElm.querySelector(
              `option[value="${selectedProvince}"]`
            ).dataset;
            const tps = selectedElmDataset.tps;
            const tvp = selectedElmDataset.tvp;
            const nouveauTaux = {tps: Number(tps), tvp: Number(tvp)};
            setTaux(nouveauTaux);

            setDynamicNames(
              taxeIn,
              nouveauTaux,
              selectedProvince,
              setCalculatorMainTitle,
              setFederalTaxName,
              setProvincialTaxName
            );

            setFooterGovernmentLink(selectedProvince);
          }}
        />

        {/*Invisible Submit Button to handle Enter keys and mobile phone confirm signal*/}
        <input
          id="submit-handler-input"
          style={{visibility: "hidden", position: "absolute", left: "-3000px"}}
          type="submit"
          value="Recalculer"
        />
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
    focused && focused.select();
  }

  window.scrollTo(0, 0);

  //Populate results table row
  addNewResultRowToTable(montant, tps, tvp, total, province, tauxFed, tauxQc);
}

function setDynamicNames(
  isTaxeIn,
  tauxTaxes,
  provinceValue,
  setCalculatorMainTitle,
  setFederalTaxName,
  setProvincialTaxName
) {
  const mode = isTaxeIn ? " inversé" : "";
  const isTVH = tauxTaxes.tps >= 0.13;
  const isQuebec = provinceValue === "Québec (TPS 5% + TVQ 9.975%)";

  //Update the Calculator main Heading Title and the Tax Names
  setCalculatorMainTitle(
    `Calcul de taxes ${mode} pour la ${isTVH ? "TVH" : "TPS"}${
      isQuebec ? " et la TVQ" : tauxTaxes.tvp > 0 ? " et la TVP" : ""
    }`
  );
  setFederalTaxName(isTVH ? "TVH" : "TPS");
  setProvincialTaxName(isQuebec ? "TVQ" : "TVP");
}

function setFooterGovernmentLink(provinceValue) {
  const govLink = document.getElementById("gouvernment-link");
  const govNameElm = govLink.querySelector("span");
  if (provinceValue === "Québec (TPS 5% + TVQ 9.975%)") {
    govLink.href =
      "https://www.revenuquebec.ca/fr/entreprises/taxes/tpstvh-et-tvq/perception-de-la-tps-et-de-la-tvq/calcul-des-taxes/";
    govNameElm.textContent = "Revenu Québec";
  } else {
    govLink.href =
      "https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises/facturer-percevoir-quel-taux/calculatrice.html";
    govNameElm.textContent = "Canada.ca";
  }
}

function showTheHandIconUnderEditableInput(isTaxeIn) {
  const montantInstructionEl = document.querySelector(".field.montant");
  const totalInstructionEl = document.querySelector(".field.total");
  if (isTaxeIn) {
    montantInstructionEl.classList.remove("isActiveCalculationMode");
    totalInstructionEl.classList.add("isActiveCalculationMode");
  } else {
    montantInstructionEl.classList.add("isActiveCalculationMode");
    totalInstructionEl.classList.remove("isActiveCalculationMode");
  }
}

function autoFocusOnlyEditableInput(isTaxeIn) {
  const editableUserInput = document.getElementById(`${isTaxeIn ? "total" : "montant"}`);
  if (editableUserInput) {
    editableUserInput.focus();
    setTimeout(() => {
      editableUserInput.select();
    }, 30);
  }
  showTheHandIconUnderEditableInput(isTaxeIn);
}

function roundNumber(num) {
  return Math.round((Number(num) + Number.EPSILON) * 100) / 100;
}

export {roundNumber};
