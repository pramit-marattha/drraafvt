// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

type Data = {
  name: string
}
// sanity config
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

// sanity client
const client = sanityClient(config)

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, comment, email } = JSON.parse(req.body)
  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'refrence',
        _ref: _id,
      },
      name,
      comment,
      email,
    })
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
}
