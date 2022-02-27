import { sanityClient, urlFor } from '../sanityConfig.js'
import { Post } from '../typing'
import Link from 'next/link'

interface Props {
  posts: Post[]
}
//  object-cover transition-transform duration-200 ease-in-out group-hover:scale-105

const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="p-5">
            <div className=" w-full lg:flex lg:max-w-full">
              <img
                className="lg:h-120 group-hover:scale-65 h-60 w-full  flex-none  overflow-hidden rounded-t object-cover text-center transition-transform duration-200 ease-in-out lg:w-auto lg:rounded-t-none lg:rounded-l"
                title="Banner"
                src={urlFor(post.mainImage).url()!}
              />
              <div className="flex flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 lg:rounded-b-none lg:rounded-r lg:border-gray-400">
                <div className="mb-8">
                  <p className="flex items-center text-sm text-gray-600">
                    <svg
                      width="28px"
                      height="28px"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0001 20C13.0001 13.9249 17.925 9 24.0001 9C30.0753 9 35.0001 13.9249 35.0001 20C35.0001 26.0751 30.0753 31 24.0001 31C17.925 31 13.0001 26.0751 13.0001 20Z"
                        fill="#FFA500"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M31.0001 34.391C36.328 31.7942 39.999 26.3258 39.999 20C39.999 11.1634 32.8356 4 23.999 4C15.1625 4 7.99902 11.1634 7.99902 20C7.99902 26.3267 11.6711 31.7957 17.0001 34.3921V43.0001C17.0001 43.3689 17.2031 43.7078 17.5283 43.8818C17.8534 44.0558 18.248 44.0367 18.5548 43.8322L24.0001 40.202L29.4454 43.8322C29.7523 44.0367 30.1468 44.0558 30.472 43.8818C30.7971 43.7078 31.0001 43.3689 31.0001 43.0001V34.391ZM23.999 34C31.731 34 37.999 27.732 37.999 20C37.999 12.268 31.731 6 23.999 6C16.267 6 9.99902 12.268 9.99902 20C9.99902 27.732 16.267 34 23.999 34Z"
                        fill="#CD853F"
                      />
                    </svg>
                    Exclusive Article !
                  </p>
                  <div className="mb-2 text-xl font-bold text-gray-900">
                    Best Mountain Trails 2020
                  </div>
                  <div className="w-full text-base  text-gray-700 lg:h-max lg:w-full">
                    {post.description}
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    className="mr-4 h-10 w-10 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt="Author image"
                  />
                  <div className="text-sm">
                    <p className="leading-none text-gray-900">
                      {' '}
                      by {post.author.name}
                    </p>
                    <p className="text-gray-600">Aug 18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            //   <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
            //   {posts.map((post) => (
            //     <Link key={post._id} href={`/post/${post.slug.current}`}>
            //       <div className="group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-300/100 shadow-md hover:shadow-xl">
            //         <img
            //           className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            //           src={urlFor(post.mainImage).url()!}
            //         />
            //         <div className="flex justify-between p-5">
            //           <div>
            //             <p className="text-lg font-bold">{post.title}</p>
            //             <p className="text-xs">
            //               {post.description} by {post.author.name}
            //             </p>
            //           </div>
            //           <img
            //             className="h-12 w-12 rounded-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
            //             src={urlFor(post.author.image).url()!}
            //             alt=""
            //           />
            //         </div>
            //       </div>
            //     </Link>
            //   ))}
            // </div>
          }
        </Link>
      ))}
    </>
  )
}

export default PostList
