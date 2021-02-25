import Head from 'next/head';
import TaxCalculator from "../components/TaxCalculator";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <div className="page-container">
      <Head><title>{process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION} | Finance D</title></Head>

      <TaxCalculator/>

      <Footer/>
    </div>
  );
}
