import {useEffect, useState} from "react";

import TopCornerRibbon from "./TopCornerRibbon";
import Decimalnumber from "./DecimalNumber";
import TaxeInCheckbox from "./TaxeInCheckbox";
import ProvinceSelect from "./ProvinceSelect";

import {addNewResultRowToTable} from "./ResultsTable";

export default function TaxCalculator() {
  const [calculatorMainTitle, setCalculatorMainTitle] = useState("");
  const [federalTaxName, setFederalTaxName] = useState("TPS");

  const [montant, setMontant] = useState(0);
  const [TPS, setTPS] = useState(0);
  const [TVQ, setTVQ] = useState(0);
  const [total, setTotal] = useState(0);

  const [province, setProvince] = useState("Québec");
  const [taux, setTaux] = useState({tps: 0, tvq: 0});

  const [taxeIn, setTaxeIn] = useState(false);

  //use effets are called in this exact order by React
  useEffect(function onChangeProvince() {
    //Update the tax rates
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

    //The link that points to the Government website with more information about taxes
    setGovernmentLink(province);

    setDynamicNames(taxeIn, province);

  }, [province]);

  useEffect(function onChangeTaxeInMode() {
    //prevent NaN values from breaking the calculation
    setMontant(isNaN(total) ? 0 : total);
    setTotal(isNaN(montant) ? 0 : montant);

    //auto focus the only editable input
    const editableUserInput = document.getElementById(`${taxeIn ? "total" : "montant"}`);
    if (editableUserInput) {
      editableUserInput.focus();
      setTimeout(() => {
        selectAllText(editableUserInput);
      }, 30);
    }

    //Show the hand icon with the instruction text under the editable user input
    const montantInstructionEl = document.querySelector(".field.montant");
    const totalInstructionEl = document.querySelector(".field.total");
    if (taxeIn) {
      montantInstructionEl.classList.remove("isActiveCalculationMode");
      totalInstructionEl.classList.add("isActiveCalculationMode");
    } else {
      montantInstructionEl.classList.add("isActiveCalculationMode");
      totalInstructionEl.classList.remove("isActiveCalculationMode");
    }

    setDynamicNames(taxeIn, province);

  }, [taxeIn]);

  useEffect(function calculate() {
    let sansTaxe, tps, tvq;
    if (taxeIn) {
      sansTaxe = isNaN(total) ? 0 : (total / (taux.tps + taux.tvq + 1));
      tps = sansTaxe * taux.tps;
      tvq = sansTaxe * taux.tvq;
      setTPS(tps);
      setTVQ(tvq);
      setMontant(roundNumber(total - (tps + tvq)));
    } else {
      sansTaxe = isNaN(montant) ? 0 : montant;
      tps = sansTaxe * taux.tps;
      tvq = sansTaxe * taux.tvq;
      setTPS(tps);
      setTVQ(tvq);
      setTotal(roundNumber(montant + tps + tvq));
    }
  }, [montant, total, taux, taxeIn]);

  // useEffect(function setDynamicNames(taxeIn, province) {
  //
  //   const mode = taxeIn ? " inversé" : "";
  //   const isTVH = [
  //     "Île-du-Prince-Édouard",
  //     "Nouveau-Brunswick",
  //     "Nouvelle-Écosse",
  //     "Ontario",
  //     "Terre-Neuve-et-Labrador"
  //   ].includes(province);
  //
  //   //Update the Calculator main Heading Title and the Tax Names
  //   setCalculatorMainTitle(`Calcul de taxes ${mode} pour la ${isTVH ? "TVH" : "TPS"}${province === "Québec" ? " et la TVQ" : ""}`);
  //   setFederalTaxName(isTVH ? "TVH" : "TPS");
  //
  // }, [taxeIn, province]);

  function setDynamicNames(taxeIn, province) {

    const mode = taxeIn ? " inversé" : "";
    const isTVH = [
      "Île-du-Prince-Édouard",
      "Nouveau-Brunswick",
      "Nouvelle-Écosse",
      "Ontario",
      "Terre-Neuve-et-Labrador"
    ].includes(province);

    //Update the Calculator main Heading Title and the Tax Names
    setCalculatorMainTitle(`Calcul de taxes ${mode} pour la ${isTVH ? "TVH" : "TPS"}${province === "Québec" ? " et la TVQ" : ""}`);
    setFederalTaxName(isTVH ? "TVH" : "TPS");
  }

  //React will then render the component:
  return (
    <div id="calculator-component-container" className="calculator">
      {/*Absolute Positionned Top Right Corner Ribbon*/}
      <TopCornerRibbon/>

      {/*User inputs are in a form to use the default Submit feature*/}
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
          id="tvq"
          label={`TVQ (${(taux.tvq * 100).toFixed(3)}%):`}
          readOnly={true}
          stateValue={TVQ}
          onChangeHandler={values => setTVQ(Number(values.value))}
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
        <TaxeInCheckbox onChangeHandler={e => setTaxeIn(e.target.checked)}/>

        {/*Province Selector*/}
        <ProvinceSelect onChangeHandler={e => setProvince(e.target.value)}/>

        {/*Invisible Submit Button to handle Enter keys and mobile phone confirm signal*/}
        <input id="submit-handler-input" style={{display: "none"}} type="submit" value="Recalculer"/>

      </form>

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

  //Populate results table row
  addNewResultRowToTable(montant, tps, tvq, total, province, tauxFed, tauxQc);
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
