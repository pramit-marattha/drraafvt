import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { sanityClient, urlFor } from '../sanityConfig.js'
import { Post } from '../typing'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  console.log(posts)
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

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    slug,
    author ->{
    name,
    image
  },
  description,
  mainImage
  }
  `
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
