import Head from "next/head";
import {useEffect} from "react";
import {handleRowDeleteWithHotkey} from "../components/ResultsTable";

import TaxCalculator from "../components/TaxCalculator";
import ResultsTable from "../components/ResultsTable";
import Footer from "../components/Footer";

export default function CalculTaxesInverseTpsTvqQuebec() {
  //Register Window Keydown Hotkeys Once
  useEffect(() => {
    window.onkeydown = e => {
      if (e.code === "NumpadAdd") {
        // [ + ]
        e.preventDefault();
        document.getElementById("submit-handler-input").click();
      } else if ((e.shiftKey || e.ctrlKey) && (e.code === "Minus" || e.code === "NumpadSubtract")) {
        // [ Ctrl + Minus ], [ Shift + Minus ]
        e.preventDefault();
        handleRowDeleteWithHotkey();
      }
    };
  }, []);

  return (
    <div className="page-container">
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/calcul-taxes-tps-tvq-quebec.html`}
        />
        <title>Calcul taxes TPS TVQ 2021 Québec et Canada | Finance D</title>
      </Head>
      <TaxCalculator
        defaultMainTitle="Calcul de taxes pour la TPS et la TVQ"
        defaultFederalTaxName="TPS"
        defaultProvincialTaxName="TVQ"
        defaultProvince="Québec (TPS 5% + TVQ 9.975%)"
        defaultTaxeIn={false}
      />
      <ResultsTable />
      <Footer />
    </div>
  );
}
