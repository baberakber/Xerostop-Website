import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Google Analytics 4, loaded after the page is idle. Renders nothing unless NEXT_PUBLIC_GA_ID is set. */
export function Analytics() {
  if (!GA_ID || !/^G-[A-Z0-9]+$/.test(GA_ID)) return null;

  return (
    <>
      <Script id="ga-consent" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
    </>
  );
}
