import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import PostList from '../components/PostList'
import { sanityClient } from '../sanityConfig.js'
import { Post } from '../typing'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Drraafvt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <PostList posts={posts} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
    *[_type == "post"]{
      _id,
      title,
      slug,
      publishedAt,
      author ->{
      name,
      image
    },
    description,
    mainImage,
    slug
    }
    `
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
