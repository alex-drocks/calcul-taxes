import Head from 'next/head'
import TaxCalculator from "../components/TaxCalculator";

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME} | {process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}</title>
      </Head>

      <TaxCalculator/>
    </div>
  )
}
