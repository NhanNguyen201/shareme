import imageUrlBuilder from '@sanity/image-url'
import { createClient }  from '@sanity/client'


export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_ID,
    dataset: 'production',
    apiVersion: '2024-06-30',
    useCdn: false,
    token: process.env.REACT_APP_SANITY_TOKEN
})


const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)