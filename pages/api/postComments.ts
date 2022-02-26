import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

// sanity config
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

// sanity client
const client = sanityClient(config)

export default async function postComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, name, comment, email } = JSON.parse(req.body)

    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
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
