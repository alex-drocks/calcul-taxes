import Head from 'next/head'
import styles from '../styles/About.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>À propos | {process.env.NEXT_PUBLIC_WEBSITE_NAME} | {process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}</title>
      </Head>

      <main className={`container`}>
        <h1>
          <Link href="/">
            <a className={"text-link"}>Page principale</a>
          </Link>
        </h1>


        <div className={styles.about}>
          <h3>À propos</h3>
          <p>
            Nous sommes les meilleurs, point final.
          </p>
        </div>

      </main>
    </div>
  )
}
