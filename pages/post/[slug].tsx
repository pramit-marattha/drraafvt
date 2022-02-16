import React, { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../../sanityConfig.js'
import Navbar from '../../components/Navbar'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  return (
    <main>
      <Navbar />
      <div className="group mx-auto max-w-7xl">
        <img
          className="h-80 w-full object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />
      </div>

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-2xl">{post.title}</h1>
        <h2 className="text-md mb-2 font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-5">
          <img
            className="h-10 w-10 rounded-xl object-cover transition-transform duration-200 ease-in-out hover:scale-105"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extra-light text-sm">
            Article by <span className="text-teal-500">{post.author.name}</span>{' '}
            - Updated at{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold" {...props} />
              ),
              h3: (props: any) => (
                <h3 className="text-lg font-bold" {...props} />
              ),
              h4: (props: any) => (
                <h4 className="text-md font-bold" {...props} />
              ),
              h5: (props: any) => (
                <h5 className="text-sm font-bold" {...props} />
              ),
              h6: (props: any) => (
                <h6 className="text-xs font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="text-lg font-bold">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a className="text-teal-500 hover:underline" href={href}>
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
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
