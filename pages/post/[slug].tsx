import React, { useState, useEffect } from 'react'
import { sanityClient, urlFor } from '../../sanityConfig.js'
import Navbar from '../../components/Navbar'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GetStaticProps } from 'next'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch('/api/postComments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        alert('Comment created')
        setSubmitted(true)
      })
      .catch(() => {
        alert('Error')
        setSubmitted(false)
      })
  }
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
      <div className="mx-auto max-w-3xl p-5">
        <hr className="mx-w-sm my-5 mx-auto border border-teal-600 " />

        {submitted ? (
          <div className="my-10 flex flex-col bg-teal-500 py-10">
            <h2 className="text-2xl font-bold">Thank you for your comment</h2>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-w-2xl my-10 mx-auto mb-10 flex flex-col p-5"
          >
            <h2 className="text-2xl font-bold">Your Feedback is valuable !</h2>
            <hr className="mt-3 py-2" />

            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <label className="mb-5 block">
              <span className="text-gray-800">Enter name:</span>
              <input
                {...(register('name'), { required: true })}
                className="form-input mt-1 block w-full rounded-full border border-transparent py-2 px-3 shadow ring-teal-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Johnny"
                type="text"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-800">Enter email:</span>
              <input
                {...(register('email'), { required: true })}
                className="form-input mt-1 block w-full rounded-full border border-transparent py-2 px-3 shadow ring-teal-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="johnny@johnny.com"
                type="email"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-800">Comment:</span>
              <textarea
                {...(register('comment'), { required: true })}
                className="form-input form-textarea mt-1 block w-full rounded-xl border border-transparent py-2 px-3 shadow ring-teal-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-600"
                placeholder="Your comment"
                rows={10}
              />
            </label>
            {/* // error field validation  */}
            <div className="flex flex-col p-5">
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
              {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment.message}</p>
              )}
            </div>
            <input
              className="mt-5 cursor-pointer rounded-full bg-teal-500 py-2 px-4 font-bold text-white hover:bg-teal-600"
              type="submit"
            />
          </form>
        )}
        <div className="my-10 flex max-w-2xl flex-col p-10">
          <h2 className="text-2xl font-bold">Comments</h2>
          <hr className="mt-3 py-2" />
          {post.comments.map((comment: any) => (
            <div key={comment._lkid}>
              <div className="flex flex-col p-5">
                <div className="flex flex-row">
                  <div className="ml-4 flex flex-col">
                    <h3 className="text-lg font-bold">{comment.author.name}</h3>
                    <p className="text-lg font-bold">{comment.comment}</p>
                  </div>
                </div>
              </div>
              <hr className="mt-3 py-2" />
            </div>
          ))}
        </div>
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
