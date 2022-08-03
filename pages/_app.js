import {useEffect} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import * as gtag from "../utils/gtag.js";
import Script from "next/script";

import "../styles/global.css";
import "../styles/CornerRibbonComponent.css";
import "../styles/TaxCalculatorComponent.css";
import "../styles/ResultsTableComponent.css";
import "../styles/FooterComponent.css";

export default function MyApp({Component, pageProps}) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*Description*/}
        <meta name="description" content={process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION} />
        {/*OpenGraph Meta*/}
        <meta property="og:site_name" content={process.env.NEXT_PUBLIC_WEBSITE_TITLE} />
        <meta property="og:locale" content={process.env.NEXT_PUBLIC_LOCALE_LANG} />
        <meta
          property="og:title"
          content={
            process.env.NEXT_PUBLIC_WEBSITE_TITLE +
            " | " +
            process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION
          }
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_WEBSITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEBSITE_URL + process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE}
        />
        <meta
          property="og:image:width"
          content={process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE_WIDTH}
        />
        <meta
          property="og:image:height"
          content={process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE_HEIGHT}
        />
        {/*  Twitter Meta*/}
        <meta
          name="twitter:title"
          content={
            process.env.NEXT_PUBLIC_WEBSITE_TITLE +
            " | " +
            process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION
          }
        />
        <meta
          name="twitter:image"
          content={process.env.NEXT_PUBLIC_WEBSITE_URL + process.env.NEXT_PUBLIC_WEBSITE_META_IMAGE}
        />
        <meta name="twitter:url" content={process.env.NEXT_PUBLIC_WEBSITE_URL} />
        <meta name="twitter:description" content={process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION} />
        <meta name="twitter:card" content="summary" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/icons/apple-" + "touch-icon.png"}
        />
        <link
          rel="mask-icon"
          href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/icons/safari-pinned-tab.svg"}
          color="#21beeb"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
