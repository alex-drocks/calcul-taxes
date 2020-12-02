import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import {useState} from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ModernImage from "../components/ModernImage/ModernImage";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="page-container">
      <Head>
        <title>{process.env.NEXT_PUBLIC_WEBSITE_NAME} | {process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}</title>
      </Head>

      <main className={`container`}>
        <h1>
          <Link href="/about">
            <a className={"text-link"}>À propos</a>
          </Link>
        </h1>

        <div className={styles.reactCounter}>
          <button onClick={() => setCount(count + 1)}>Add</button>
          <button onClick={() => setCount(count - 1)}>Remove</button>
          <p>
            count = {count}
          </p>
        </div>

        <ContactForm apiURL="https://site.com/api/submit-contact-form.php"/>

        <ModernImage
          lazyload={true}
          srcWebp={"/images/image.webp"}
          srcFallback={"/images/image.png"}
          altText={"Sample image"}
          width={256}
          height={256}
        />
      </main>
    </div>
  )
}
