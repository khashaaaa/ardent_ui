import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ardent</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/favicon/site.webmanifest"/>
        <meta name="apple-mobile-web-app-title" content="Snippit"/>
        <meta name="application-name" content="<APP NAME>"/>
        <meta name="msapplication-TileColor" content="#ffc40d"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
    </div>
  )
}
