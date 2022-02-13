import React from 'react'
import { sanityClient, urlFor } from '../../sanityConfig.js'
import Navbar from '../../components/Navbar'
import { Post } from '../../typing'

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  console.log(post)
  return (
    <main>
      <Navbar />
      <div className="group mx-auto max-w-7xl">
        <img
          className="h-80 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
      </div>
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
        }
        }`
  const posts = await sanityClient.fetch(query)
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author ->{
    name,
    image
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
    description,
    mainImage,
slug,
body
    }`
  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post) {
    throw new Error(`Post ${params?.slug} not found`)
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
