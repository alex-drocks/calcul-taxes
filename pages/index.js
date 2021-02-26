import Head from 'next/head';
import {useEffect} from "react";
import {handleRowDeleteWithHotkey} from "../components/ResultsTable";

import TaxCalculator from "../components/TaxCalculator";
import Footer from "../components/Footer";
import ResultsTable from "../components/ResultsTable";

export default function Index() {

  //Register Hotkeys Once
  useEffect(() => {
    window.onkeydown = (e) => {
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
  });

  return (
    <div className="page-container">
      <Head><title>{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</title></Head>
      <TaxCalculator/>
      <ResultsTable/>
      <Footer/>
    </div>
  );
}
