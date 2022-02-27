<p align="center">
<img src="https://user-images.githubusercontent.com/37651620/155889327-4dca8867-9e6f-4a39-98d9-4efc8a89df5b.png"/>
</p>

<p align="center">
<h3><a href="https://drraafvt.vercel.app/">https://drraafvt.vercel.app/</a></h3>
</p>

## To run this project:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## To run the backend

```bash
cd drraafvtbackend
sanity start
```

### Create `.env.local` file and paste the following inside it:

```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=<Insert-your-project-ID>
SANITY_API_TOKEN=<Insert-your-Sanity-API-Token>
```

## More about `Next.js`

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
