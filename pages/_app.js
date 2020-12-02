import Head from 'next/head'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
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

        {/*Preloaded fonts*/}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/Calluna-Regular.woff2"
              crossOrigin="anonymous"/>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/open-sans-v18-latin-700.woff2"
              crossOrigin="anonymous"/>
        <link rel="preload" as="font" type="font/woff2" href="/fonts/open-sans-v18-latin-300.woff2"
              crossOrigin="anonymous"/>
        <link rel="stylesheet" href="/fonts/async-font-loader.css"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
