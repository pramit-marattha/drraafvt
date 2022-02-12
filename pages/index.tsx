import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Drraafvt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
    </div>
  )
}
