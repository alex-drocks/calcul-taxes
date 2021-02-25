import Head from 'next/head';
import TaxCalculator from "../components/TaxCalculator";
import Footer from "../components/Footer";
import ResultsGrid from "../components/ResultsGrid";

export default function Index() {
  return (
    <div className="page-container">
      <Head><title>{process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION} | Finance D</title></Head>

      <TaxCalculator/>

      <ResultsGrid/>

      <Footer/>
    </div>
  );
}
