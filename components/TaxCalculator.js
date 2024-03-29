import {useEffect, useState} from "react";

import TopCornerRibbon from "./TopCornerRibbon";
import DecimalNumber from "./DecimalNumber";
import TaxeInCheckbox from "./TaxeInCheckbox";
import ProvinceSelect from "./ProvinceSelect";

import {autoFocusOnlyEditableInput, roundNumber} from "../utils/sharedFunctions";
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
  useEffect(
    function init() {
      autoFocusOnlyEditableInput(defaultTaxeIn);
      setContextualFooterGovernmentLink(defaultProvince);
    },
    [defaultTaxeIn, defaultProvince]
  );

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

        const roundingDifference = roundNumber(totalAvecTaxes - (sansTaxe + tpsValue + tvpValue));

        // Update displayed values
        setMontant(sansTaxe + roundingDifference);
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
        onSubmit={e =>
          handleFormSubmit(e, montant, TPS, TVP, total, province, taux.tps, taux.tvp, taxeIn)
        }
      >
        {/*The Blue Title Heading*/}
        <h1 className="no-select">{calculatorMainTitle}</h1>

        {/*Amount before taxes*/}
        <DecimalNumber
          id="montant"
          label="Montant sans taxes"
          readOnly={taxeIn}
          placeholder="Montant $"
          stateValue={montant}
          onChangeHandler={values => setMontant(Number(values.value))}
          onFocusHandler={e => e.target.select()}
          showInstructionsWhenFocused="Entrez le montant hors-taxes pour calculer les taxes."
        />

        {/*Federal Tax*/}
        <DecimalNumber
          id="tps"
          label={`${federalTaxName} (${(taux.tps * 100).toFixed(3)}%)`}
          readOnly={true}
          placeholder="Taxe Fédérale $"
          stateValue={TPS}
          onChangeHandler={values => setTPS(Number(values.value))}
          onFocusHandler={e => e.target.select()}
        />

        {/*Provincial Tax*/}
        <DecimalNumber
          id="tvp"
          label={`${provincialTaxName} (${(taux.tvp * 100).toFixed(3)}%)`}
          readOnly={true}
          placeholder="Taxe Provinciale $"
          stateValue={TVP}
          onChangeHandler={values => setTVP(Number(values.value))}
          onFocusHandler={e => e.target.select()}
        />

        {/*Total including taxes*/}
        <DecimalNumber
          id="total"
          label="Total avec taxes"
          readOnly={!taxeIn}
          placeholder="Total $"
          stateValue={total}
          onChangeHandler={values => setTotal(Number(values.value))}
          onFocusHandler={e => e.target.select()}
          showInstructionsWhenFocused="Entrez le total taxes incluses pour calculer les taxes."
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

            setContextualDynamicNames(
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

            setContextualDynamicNames(
              taxeIn,
              nouveauTaux,
              selectedProvince,
              setCalculatorMainTitle,
              setFederalTaxName,
              setProvincialTaxName
            );

            setContextualFooterGovernmentLink(selectedProvince);
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

function handleFormSubmit(e, montant, tps, tvp, total, province, tauxFed, tauxQc, taxeIn) {
  e.preventDefault();

  const focused = document.activeElement;
  if (window && window.innerHeight < 600) {
    //Small screen: closes keyboard
    focused?.blur();
  } else {
    autoFocusOnlyEditableInput(taxeIn);
  }
  window.scrollTo(0, 0);

  //Populate results table row
  addNewResultRowToTable(montant, tps, tvp, total, province, tauxFed, tauxQc);
}

function setContextualDynamicNames(
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

function setContextualFooterGovernmentLink(provinceValue) {
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
