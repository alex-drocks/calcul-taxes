import Head from 'next/head';
import '../styles/globals.css';
import '../styles/taxCalculator.css';
import "../styles/calculatorFooter.css";

export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_WEBSITE_URL}/>
        {/*Description*/}
        <meta name="description" content={process.env.NEXT_PUBLIC_WEBSITE_LONG_DESCRIPTION}/>

        {/*OpenGraph Meta*/}
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_WEBSITE_NAME}/>
        <meta property="og:locale" content={process.env.NEXT_PUBLIC_LOCALE_LANG}/>
        <meta property="og:title"
              content={process.env.NEXT_PUBLIC_WEBSITE_NAME + " | " + process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_WEBSITE_URL}/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content={process.env.NEXT_PUBLIC_WEBSITE_LONG_DESCRIPTION}/>
        <meta property="og:image"
              content={process.env.NEXT_PUBLIC_WEBSITE_URL + process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE}/>
        <meta property="og:image:width" content={process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE_WIDTH}/>
        <meta property="og:image:height" content={process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE_HEIGHT}/>

        {/*  Twitter Meta*/}
        <meta name="twitter:title"
              content={process.env.NEXT_PUBLIC_WEBSITE_NAME + " | " + process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION}/>
        />
        <meta name="twitter:image"
              content={process.env.NEXT_PUBLIC_WEBSITE_URL + process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE}/>
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_WEBSITE_URL}/>
        <meta name="twitter:description" content={process.env.NEXT_PUBLIC_WEBSITE_LONG_DESCRIPTION}/>
        <meta name="twitter:card" content="summary"/>

        <link rel="apple-touch-icon" sizes="180x180"
              href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/icons/apple-" +
              "touch-icon.png"}/>
        <link rel="mask-icon" href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/icons/safari-pinned-tab.svg"}
              color="#21beeb"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}